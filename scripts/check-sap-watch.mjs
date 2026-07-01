#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const ROOT = new URL("../", import.meta.url);
const STATE_FILE = new URL("source-state.json", ROOT);
const DATA_FILE = new URL("data.js", ROOT);
const REPORT_FILE = new URL("tmp/sap-watch-refresh-report.json", ROOT);
const TIMEZONE = "Australia/Sydney";

const recordNoChangeChecks = process.env.RECORD_NO_CHANGE_CHECKS === "true";
const hasSapSecrets = Boolean(process.env.SAP_SUSER_ID && process.env.SAP_SUSER_PASSWORD);
const execFileAsync = promisify(execFile);

const trackedSources = [
  {
    id: "sap-help-extensibility-explorer",
    title: "SAP Extensibility Explorer crawler",
    url: "https://help.sap.com/crawler/PRODUCTION/SAP_EXTENSIBILITY_EXPLORER/SHIP/en-US",
    extractor: extractCleanTextFingerprint,
  },
  {
    id: "sap-community-erp-rss-relevant-items",
    title: "SAP ERP Blog Posts by SAP RSS relevant items",
    url: "https://community.sap.com/khhcw49343/rss/board?board.id=erp-blog-sap",
    extractor: extractRelevantRssFingerprint,
  },
  {
    id: "sap-help-2602-hfc12-search",
    title: "SAP Help 2602.4 / HFC12 search",
    url: "https://help.sap.com/http.svc/elasticsearch?q=SAP%20S%2F4HANA%20Cloud%20Public%20Edition%202602.4%20HFC12&area=content&advancedSearch=0&excludeNotSearchable=1&language=en-US&state=PRODUCTION&transtype=standard,html,pdf,others&to=100",
    extractor: extractSapHelpSearchFingerprint,
  },
  {
    id: "sap-community-2608-upgrade-guidance",
    title: "2608 upgrade guidance article",
    url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/get-ready-for-the-2608-upgrade-of-the-sap-cloud-erp-public-edition/ba-p/14421165",
    extractor: extract2608GuidanceFingerprint,
  },
  {
    id: "sap-for-me-note-3646210-login-gate",
    title: "SAP for Me note 3646210 login gate",
    url: "https://me.sap.com/notes/3646210",
    extractor: extractLoginGateFingerprint,
  },
];

const state = JSON.parse(stripBom(await readFile(STATE_FILE, "utf8")));
const now = new Date();
const nowSydney = toZonedIso(now, TIMEZONE);
const todaySydney = nowSydney.slice(0, 10);

const previousAutomation = state.automation || {};
const previousSources = new Map((previousAutomation.trackedSources || []).map((source) => [source.id, source]));
const changes = [];
const records = [];

for (const source of trackedSources) {
  const result = await checkSource(source);
  const previous = previousSources.get(source.id);
  const fingerprintChanged = previous?.fingerprintSha256 && previous.fingerprintSha256 !== result.fingerprintSha256;
  const initialized = !previous?.fingerprintSha256;

  if (fingerprintChanged) {
    changes.push({
      id: source.id,
      title: source.title,
      previousFingerprintSha256: previous.fingerprintSha256,
      currentFingerprintSha256: result.fingerprintSha256,
      observedAt: nowSydney,
    });
  }

  records.push({
    id: source.id,
    title: source.title,
    url: source.url,
    status: result.status,
    httpStatus: result.httpStatus,
    finalUrl: result.finalUrl,
    fingerprintSha256: result.fingerprintSha256,
    fingerprintMethod: result.fingerprintMethod,
    initialized,
    changed: Boolean(fingerprintChanged),
    observedAt: nowSydney,
    lastChangedAt: fingerprintChanged ? nowSydney : previous?.lastChangedAt || null,
  });
}

const previousSapForMe = previousAutomation.sapForMe || {};
const sapForMe = {
  configured: hasSapSecrets,
  credentialLocation: "GitHub Actions repository secrets",
  secretsExpected: ["SAP_SUSER_ID", "SAP_SUSER_PASSWORD"],
  loginAttempted: false,
  lastCheckStatus: hasSapSecrets
    ? "SAP S-user secrets are configured. Scheduled checks avoid browser password login because SAP for Me can require MFA or trusted-browser approval."
    : "SAP S-user secrets are not configured. Public-source checks still run.",
  observedAt: nowSydney,
};

if (previousAutomation.sapForMe && Boolean(previousSapForMe.configured) !== sapForMe.configured) {
  changes.push({
    id: "sap-for-me-secret-configuration",
    title: "SAP for Me secret configuration changed",
    previousConfigured: Boolean(previousSapForMe.configured),
    currentConfigured: sapForMe.configured,
    observedAt: nowSydney,
  });
}

const materialChanges = changes.filter((change) => change.id !== "sap-for-me-secret-configuration");
const shouldWriteState = changes.length > 0 || !previousAutomation.trackedSources || recordNoChangeChecks;

if (shouldWriteState) {
  state.lastCheckedAt = nowSydney;
  state.automation = {
    id: "sap-s-4hana-cloud-maintenance-watch",
    runner: "github-actions",
    lastRunAt: nowSydney,
    lastRunRecordedBecause: changes.length > 0
      ? "tracked-source-change"
      : recordNoChangeChecks
        ? "manual-record-no-change"
        : "baseline-initialized",
    lastMaterialChangeAt: materialChanges.length ? nowSydney : previousAutomation.lastMaterialChangeAt || null,
    trackedSources: records,
    sapForMe,
    changes,
  };

  if (materialChanges.length > 0 || recordNoChangeChecks) {
    await updateDataSourceChecked(todaySydney);
  }

  await writeJson(STATE_FILE, state);
}

const report = {
  monitorId: state.monitorId || "sap-s-4hana-cloud-maintenance-watch",
  checkedAt: nowSydney,
  wroteState: shouldWriteState,
  recordNoChangeChecks,
  sapForMeConfigured: hasSapSecrets,
  changes,
  trackedSources: records.map((record) => ({
    id: record.id,
    status: record.status,
    httpStatus: record.httpStatus,
    changed: record.changed,
    initialized: record.initialized,
    fingerprintSha256: record.fingerprintSha256,
  })),
};

await mkdir(new URL("tmp/", ROOT), { recursive: true });
await writeJson(REPORT_FILE, report);

console.log(JSON.stringify(report, null, 2));

async function checkSource(source) {
  try {
    const response = await fetchWithTimeout(source.url);
    if (!response.text) {
      const payload = `${response.status}|${response.finalUrl || source.url}`;
      return {
        status: response.ok ? "reachable-no-body" : "http-error",
        httpStatus: response.status,
        finalUrl: response.finalUrl,
        fingerprintSha256: sha256(payload),
        fingerprintMethod: "HTTP status and final URL",
      };
    }

    const extracted = source.extractor(response.text, response);
    return {
      status: response.ok ? "reachable" : "http-error-with-body",
      httpStatus: response.status,
      finalUrl: response.finalUrl,
      ...extracted,
    };
  } catch (error) {
    return {
      status: `error: ${error.name || "Error"}`,
      httpStatus: null,
      finalUrl: source.url,
      fingerprintSha256: sha256(`${source.url}|${error.name}|${error.message}`),
      fingerprintMethod: "Error class and message",
    };
  }
}

async function fetchWithTimeout(url, timeoutMs = 45000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8",
          "user-agent": "sap-maintenance-watch/1.0 (+https://sap-cloud-lab.github.io/sap-maintenance-watch/)",
        },
      });
      const text = await response.text();
      return {
        ok: response.ok,
        status: response.status,
        finalUrl: response.url,
        text,
      };
    } catch (error) {
      return await fetchWithCurl(url, timeoutMs, error);
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithCurl(url, timeoutMs, originalError) {
  const marker = "\n__SAP_WATCH_CURL_META__";
  const windowsTlsOptions = process.platform === "win32" ? ["--ssl-no-revoke"] : [];
  const { stdout } = await execFileAsync(
    "curl",
    [
      "-L",
      "--silent",
      "--show-error",
      "--max-time",
      String(Math.ceil(timeoutMs / 1000)),
      ...windowsTlsOptions,
      "-A",
      "sap-maintenance-watch/1.0 (+https://sap-cloud-lab.github.io/sap-maintenance-watch/)",
      "-w",
      `${marker}%{http_code}|%{url_effective}`,
      url,
    ],
    {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    },
  );

  const markerIndex = stdout.lastIndexOf(marker);
  if (markerIndex === -1) {
    throw originalError;
  }

  const text = stdout.slice(0, markerIndex);
  const [statusText, finalUrl] = stdout.slice(markerIndex + marker.length).split("|");
  const status = Number(statusText);

  return {
    ok: status >= 200 && status < 300,
    status,
    finalUrl: finalUrl || url,
    text,
  };
}

function extractCleanTextFingerprint(text) {
  const clean = cleanText(text);
  return {
    fingerprintSha256: sha256(clean),
    fingerprintMethod: "Cleaned visible text",
  };
}

function extract2608GuidanceFingerprint(text) {
  const clean = cleanText(text).toLowerCase();
  const signals = [
    ["hfc02", /hfc02/i],
    ["hfc03", /hfc03/i],
    ["hfc03-plus", /hfc03\+|hfc03 plus/i],
    ["test-tenant", /t-tenant|test tenant|test systems/i],
    ["development-production", /d\/p tenants|development.*production|production.*development/i],
    ["standard-maintenance", /standard maintenance/i],
    ["online-software-change", /online software change/i],
    ["optional-maintenance", /optional maintenance/i],
    ["july-18-19-2026", /july\s+18.*19|18.*19\s+july|jul\.\s+18\/19/i],
    ["august-01-02-2026", /august\s+1.*2|1.*2\s+august|aug\.\s+1\/2/i],
    ["august-15-16-2026", /august\s+15.*16|15.*16\s+august|aug\.\s+15\/16/i],
  ].map(([label, pattern]) => [label, pattern.test(clean)]);

  return {
    fingerprintSha256: sha256(JSON.stringify(signals)),
    fingerprintMethod: "Presence of stable 2608 upgrade-window signals",
  };
}

function extractLoginGateFingerprint(text, response) {
  const clean = cleanText(text).slice(0, 20000);
  const loginSignal = /sign in|log in|sap universal id|password|identity provider/i.test(clean);
  const payload = JSON.stringify({
    finalUrl: response.finalUrl,
    httpStatus: response.status,
    loginSignal,
    bodySha256: sha256(clean),
  });

  return {
    fingerprintSha256: sha256(payload),
    fingerprintMethod: "SAP for Me login-gate status, final URL, and body hash",
  };
}

function extractRelevantRssFingerprint(xml) {
  const itemMatches = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)];
  const relevantTerms = [
    "sap s/4hana cloud",
    "s/4hana cloud public edition",
    "sap cloud erp",
    "maintenance",
    "hotfix",
    "hfc",
    "upgrade",
    "2608",
    "2602",
    "rasd",
    "release assessment",
    "extensibility",
    "cloud alm",
    "what's new",
    "whats new",
  ];

  const items = itemMatches
    .map((match) => {
      const item = match[0];
      return {
        title: decodeXml(readXmlTag(item, "title")),
        link: decodeXml(readXmlTag(item, "link")),
        pubDate: decodeXml(readXmlTag(item, "pubDate")),
        description: cleanText(decodeXml(readXmlTag(item, "description"))),
      };
    })
    .filter((item) => {
      const haystack = `${item.title} ${item.description}`.toLowerCase();
      return relevantTerms.some((term) => haystack.includes(term));
    })
    .map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      descriptionSha256: sha256(item.description),
    }))
    .sort((a, b) => `${a.link}${a.title}`.localeCompare(`${b.link}${b.title}`));

  return {
    fingerprintSha256: sha256(JSON.stringify(items)),
    fingerprintMethod: "Relevant RSS items: title, link, pubDate, and description hash",
  };
}

function extractSapHelpSearchFingerprint(text) {
  try {
    const parsed = JSON.parse(text);
    const rows = normalizeSapHelpRows(parsed);
    return {
      fingerprintSha256: sha256(JSON.stringify(rows)),
      fingerprintMethod: "Canonical SAP Help search rows",
    };
  } catch {
    return extractCleanTextFingerprint(text);
  }
}

function normalizeSapHelpRows(value) {
  const rows = [];
  const stack = [value];

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== "object") continue;
    if (Array.isArray(current)) {
      stack.push(...current);
      continue;
    }

    const title = pickString(current, ["title", "loiotitle", "documentTitle", "name"]);
    const url = pickString(current, ["url", "href", "displayUrl"]);
    const date = pickString(current, ["date", "changedAt", "lastModified", "lastModifiedOn"]);
    const version = pickString(current, ["version", "versionId"]);
    const loio = pickString(current, ["loio", "loioId", "id"]);

    if (title || url || loio) {
      rows.push({ loio, date, version, title, url });
    }

    for (const nested of Object.values(current)) {
      if (nested && typeof nested === "object") stack.push(nested);
    }
  }

  return rows
    .filter((row) => row.title || row.url)
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

function pickString(object, keys) {
  for (const key of keys) {
    const value = object[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function readXmlTag(item, tagName) {
  const match = item.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim() : "";
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function cleanText(value) {
  return String(value)
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sha256(value) {
  return createHash("sha256").update(String(value), "utf8").digest("hex").toUpperCase();
}

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

async function writeJson(url, value) {
  await writeFile(url, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function updateDataSourceChecked(date) {
  const text = await readFile(DATA_FILE, "utf8");
  const updated = text.replace(/sourceChecked:\s*"[^"]+"/, `sourceChecked: "${date}"`);
  if (updated !== text) {
    await writeFile(DATA_FILE, updated, "utf8");
  }
}

function toZonedIso(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "shortOffset",
  }).formatToParts(date);

  const part = (type) => parts.find((item) => item.type === type)?.value;
  const timeZoneName = part("timeZoneName") || "GMT+00:00";
  const offsetMatch = timeZoneName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  const offset = offsetMatch
    ? `${offsetMatch[1]}${offsetMatch[2].padStart(2, "0")}:${offsetMatch[3] || "00"}`
    : "+00:00";

  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}:${part("second")}${offset}`;
}
