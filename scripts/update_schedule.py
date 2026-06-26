#!/usr/bin/env python3
"""Refresh the SAP maintenance watch static data and ICS feed."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import textwrap
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
DATA_JS = ROOT / "data.js"
ICS_FILE = ROOT / "SAP-S4HANA-Cloud-Maintenance-Watch.ics"
METADATA_FILE = ROOT / "data" / "source-metadata.json"

SOURCE_URL = "https://www.sap.com/docs/download/2021/09/58ffa59e-f97d-0010-bca6-c68f7e60039b.pdf"
SOURCE_LABEL = "SAP S/4HANA Cloud Public Edition, 3-System Landscape - Upgrade & Maintenance Schedule"
TIMEZONE = "Australia/Sydney"
CALENDAR_FILE = "SAP-S4HANA-Cloud-Maintenance-Watch.ics"
CALENDAR_NAME = "SAP S/4HANA Cloud Maintenance Watch"

SYDNEY = ZoneInfo(TIMEZONE)


SEED_EVENTS = [
    {
        "id": "2026-W26",
        "week": "2026-W26",
        "title": "W26 hotfix / patching",
        "category": "maintenance",
        "start": "2026-06-28T01:00:00+10:00",
        "end": "2026-06-28T05:00:00+10:00",
        "systems": "Current 2602 cycle",
        "description": "Hotfix / patching watch window in current 2602 cycle.",
    },
    {
        "id": "2026-W27",
        "week": "2026-W27",
        "title": "W27 HANA prep",
        "category": "prep",
        "start": "2026-07-05T01:00:00+10:00",
        "end": "2026-07-05T05:00:00+10:00",
        "systems": "HANA database / technical preparation",
        "description": "HANA database / technical preparation watch window shown before 2608.",
    },
    {
        "id": "2026-W29",
        "week": "2026-W29",
        "title": "2608 Test upgrade",
        "category": "upgrade",
        "start": "2026-07-18T22:00:00+10:00",
        "end": "2026-07-19T02:00:00+10:00",
        "systems": "Test systems",
        "description": "2608 major upgrade for Test systems.",
    },
    {
        "id": "2026-W31",
        "week": "2026-W31",
        "title": "2608 Starter / other upgrade",
        "category": "upgrade",
        "start": "2026-08-01T22:00:00+10:00",
        "end": "2026-08-02T22:00:00+10:00",
        "systems": "Starter and other systems",
        "description": "2608 major upgrade for Starter and other systems.",
    },
    {
        "id": "2026-W33-DEV",
        "week": "2026-W33",
        "title": "2608 Development upgrade",
        "category": "upgrade",
        "start": "2026-08-15T14:00:00+10:00",
        "end": "2026-08-15T18:00:00+10:00",
        "systems": "Development systems",
        "description": "2608 major upgrade for Development systems.",
    },
    {
        "id": "2026-W33-PROD",
        "week": "2026-W33",
        "title": "2608 Production upgrade",
        "category": "upgrade",
        "start": "2026-08-15T22:00:00+10:00",
        "end": "2026-08-16T02:00:00+10:00",
        "systems": "Production systems",
        "description": "2608 major upgrade for Production systems.",
    },
    {
        "id": "2026-W34",
        "week": "2026-W34",
        "title": "Backup upgrade weekend",
        "category": "upgrade",
        "start": "2026-08-22T00:00:00+10:00",
        "end": "2026-08-24T00:00:00+10:00",
        "systems": "Systems not upgraded earlier",
        "description": "Backup upgrade weekend if SAP needs it for systems not upgraded earlier.",
        "allDay": True,
    },
    {
        "id": "2026-W35",
        "week": "2026-W35",
        "title": "Post-upgrade hotfix",
        "category": "maintenance",
        "start": "2026-08-30T01:00:00+10:00",
        "end": "2026-08-30T05:00:00+10:00",
        "systems": "Post-upgrade estate",
        "description": "Post-upgrade hotfix / patching watch window.",
    },
    {
        "id": "2026-W37",
        "week": "2026-W37",
        "title": "Standard maintenance / hotfix",
        "category": "maintenance",
        "start": "2026-09-13T01:00:00+10:00",
        "end": "2026-09-13T05:00:00+10:00",
        "systems": "After 2608 pattern change",
        "description": "Standard maintenance / hotfix watch window after the 2608 pattern change.",
    },
    {
        "id": "2026-W39",
        "week": "2026-W39",
        "title": "Online software change",
        "category": "change",
        "start": "2026-09-27T01:00:00+10:00",
        "end": "2026-09-27T05:00:00+10:00",
        "systems": "Continuous delivery",
        "description": "Online software change / continuous delivery watch window.",
    },
    {
        "id": "2026-W41",
        "week": "2026-W41",
        "title": "Standard maintenance / hotfix",
        "category": "maintenance",
        "start": "2026-10-11T02:00:00+11:00",
        "end": "2026-10-11T06:00:00+11:00",
        "systems": "Monthly maintenance",
        "description": "Standard maintenance / hotfix watch window.",
    },
    {
        "id": "2026-W42",
        "week": "2026-W42",
        "title": "Online software change",
        "category": "change",
        "start": "2026-10-18T02:00:00+11:00",
        "end": "2026-10-18T06:00:00+11:00",
        "systems": "Continuous delivery",
        "description": "Online software change / continuous delivery watch window.",
    },
    {
        "id": "2026-W45",
        "week": "2026-W45",
        "title": "Standard maintenance / hotfix",
        "category": "maintenance",
        "start": "2026-11-08T02:00:00+11:00",
        "end": "2026-11-08T06:00:00+11:00",
        "systems": "Monthly maintenance",
        "description": "Standard maintenance / hotfix watch window.",
    },
    {
        "id": "2026-W46",
        "week": "2026-W46",
        "title": "Online software change",
        "category": "change",
        "start": "2026-11-15T02:00:00+11:00",
        "end": "2026-11-15T06:00:00+11:00",
        "systems": "Continuous delivery",
        "description": "Online software change / continuous delivery watch window.",
    },
    {
        "id": "2026-W49",
        "week": "2026-W49",
        "title": "Standard maintenance / hotfix",
        "category": "maintenance",
        "start": "2026-12-06T02:00:00+11:00",
        "end": "2026-12-06T06:00:00+11:00",
        "systems": "Monthly maintenance",
        "description": "Standard maintenance / hotfix watch window.",
    },
    {
        "id": "2026-W50",
        "week": "2026-W50",
        "title": "Online software change",
        "category": "change",
        "start": "2026-12-13T02:00:00+11:00",
        "end": "2026-12-13T06:00:00+11:00",
        "systems": "Continuous delivery",
        "description": "Online software change / continuous delivery watch window.",
    },
]


@dataclass(frozen=True)
class ReleaseDates:
    release: str
    help_portal: str
    test: str
    starter: str
    development_production: str


def download_pdf() -> bytes:
    curl = subprocess.run(
        [
            "curl",
            "-L",
            "--fail",
            "--silent",
            "--show-error",
            SOURCE_URL,
        ],
        check=False,
        capture_output=True,
    )
    if curl.returncode == 0 and curl.stdout:
        return curl.stdout

    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "sap-maintenance-watch/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def extract_pdf_text(pdf_bytes: bytes) -> str:
    tmp_pdf = ROOT / "tmp" / "sap-schedule-latest.pdf"
    tmp_pdf.parent.mkdir(exist_ok=True)
    tmp_pdf.write_bytes(pdf_bytes)
    reader = PdfReader(str(tmp_pdf))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def parse_release_dates(text: str) -> list[ReleaseDates]:
    release_row = re.search(r"Upgrade schedule per release and system type:\s*\n\s*(\d{4})\s+(\d{4})", text)
    if not release_row:
        return []
    unique_releases = [release_row.group(1), release_row.group(2)]

    patterns = {
        "help_portal": r"Availability of User Assistance content on SAP Help Portal\s+([A-Z][a-z]{2}\.\s+\d{1,2})\s+([A-Z][a-z]{2}\.\s+\d{1,2})",
        "test": r"T \(Test\) systems\s+([A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})\s+([A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})",
        "starter": r"S \(Starter\).*?\s+([A-Z][a-z]{2}\.\s+\d{1,2}\s*/\s*[A-Z][a-z]{2}\.\s+\d{1,2}|[A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})\s+([A-Z][a-z]{2}\.\s+\d{1,2}\s*/\s*[A-Z][a-z]{2}\.\s+\d{1,2}|[A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})",
        "development_production": r"D \(Development\) and P \(Production\) systems\s+([A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})\s+([A-Z][a-z]{2}\.\s+\d{1,2}/\d{1,2})",
    }
    matches = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, text, flags=re.DOTALL)
        if not match:
            return []
        matches[key] = [normalize_date_token(match.group(1)), normalize_date_token(match.group(2))]

    return [
        ReleaseDates(
            release=release,
            help_portal=matches["help_portal"][index],
            test=matches["test"][index],
            starter=matches["starter"][index],
            development_production=matches["development_production"][index],
        )
        for index, release in enumerate(unique_releases)
    ]


def normalize_date_token(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace(" .", ".")).strip()


def month_number(month: str) -> int:
    return datetime.strptime(month, "%b.").month


def first_date_from_token(token: str, year: int) -> datetime:
    token = normalize_date_token(token)
    match = re.match(r"([A-Z][a-z]{2}\.)\s+(\d{1,2})", token)
    if not match:
        raise ValueError(f"Cannot parse SAP date token: {token}")
    month, day = match.groups()
    return datetime(year, month_number(month), int(day), tzinfo=SYDNEY)


def update_upgrade_events(events: list[dict], release_dates: list[ReleaseDates]) -> None:
    if not release_dates:
        print("Could not parse SAP release date table; keeping existing schedule.", file=sys.stderr)
        return

    latest_release = release_dates[-1]
    release_year = 2000 + int(latest_release.release[:2])
    release = latest_release.release

    test_date = first_date_from_token(latest_release.test, release_year)
    starter_date = first_date_from_token(latest_release.starter, release_year)
    dp_date = first_date_from_token(latest_release.development_production, release_year)
    backup_date = dp_date + timedelta(days=7)

    replacements = {
        "2026-W29": (release, "Test upgrade", test_date, 22, 4, "Test systems"),
        "2026-W31": (release, "Starter / other upgrade", starter_date, 22, 24, "Starter and other systems"),
        "2026-W33-DEV": (release, "Development upgrade", dp_date, 14, 4, "Development systems"),
        "2026-W33-PROD": (release, "Production upgrade", dp_date, 22, 4, "Production systems"),
    }

    for event in events:
        replacement = replacements.get(event["id"])
        if not replacement:
            continue
        rel, label, base_date, start_hour, duration_hours, systems = replacement
        start = base_date.replace(hour=start_hour, minute=0, second=0, microsecond=0)
        end = start.replace(hour=(start.hour + duration_hours) % 24)
        if duration_hours >= 24 or end <= start:
            end = start + timedelta(hours=duration_hours)
        event["title"] = f"{rel} {label}"
        event["start"] = start.isoformat()
        event["end"] = end.isoformat()
        event["systems"] = systems
        event["description"] = f"{rel} major upgrade for {systems[0].lower() + systems[1:]}."
        event["week"] = iso_week_label(start)

    backup = next((event for event in events if event["id"] == "2026-W34"), None)
    if backup:
        start = backup_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end = start + timedelta(days=2)
        backup["week"] = iso_week_label(start)
        backup["start"] = start.isoformat()
        backup["end"] = end.isoformat()
        backup["description"] = "Backup upgrade weekend if SAP needs it for systems not upgraded earlier."


def iso_week_label(dt: datetime) -> str:
    year, week, _ = dt.isocalendar()
    return f"{year}-W{week:02d}"


def display_time(event: dict) -> str:
    start = datetime.fromisoformat(event["start"])
    end = datetime.fromisoformat(event["end"])
    if event.get("allDay"):
        return f"Weekend of {start:%Y-%m-%d}/{(end.day - 1):02d}"
    tz = "AEDT" if start.utcoffset().total_seconds() == 11 * 3600 else "AEST"
    if start.date() == end.date():
        return f"{start:%a %Y-%m-%d}, {start:%H:%M}-{end:%H:%M} {tz}"
    return f"{start:%a %Y-%m-%d %H:%M}-{end:%a %Y-%m-%d %H:%M} {tz}"


def enrich_events(events: list[dict]) -> list[dict]:
    enriched = []
    for event in events:
        item = dict(event)
        item["displayTime"] = display_time(item)
        item["outlook"] = (
            "Created as an all-day free calendar item with a 1-day reminder."
            if item.get("allDay")
            else "Created as a free calendar item with a 12-hour reminder."
        )
        enriched.append(item)
    enriched.sort(key=lambda item: item["start"])
    return enriched


def write_data_js(events: list[dict], source_checked: str) -> None:
    payload = {
        "sourceChecked": source_checked,
        "timezone": TIMEZONE,
        "sourceLabel": SOURCE_LABEL,
        "calendarImportFile": CALENDAR_FILE,
        "sourceUrl": SOURCE_URL,
        "events": events,
    }
    js = "window.sapWatchData = "
    js += json.dumps(payload, indent=2, ensure_ascii=False)
    DATA_JS.write_text(js + ";\n", encoding="utf-8")


def fold_ics_line(line: str) -> str:
    encoded = line.encode("utf-8")
    if len(encoded) <= 75:
        return line
    chunks = []
    current = ""
    for char in line:
        if len((current + char).encode("utf-8")) > 75:
            chunks.append(current)
            current = " " + char
        else:
            current += char
    chunks.append(current)
    return "\r\n".join(chunks)


def escape_ics(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\n", "\\n")
    )


def utc_stamp(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def date_value(dt: datetime) -> str:
    return dt.strftime("%Y%m%d")


def write_ics(events: list[dict], source_checked: str) -> None:
    dtstamp = datetime.fromisoformat(source_checked + "T00:00:00+10:00").astimezone(timezone.utc)
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Codex//SAP S4HANA Cloud Maintenance Watch//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        f"X-WR-CALNAME:{CALENDAR_NAME}",
        f"X-WR-TIMEZONE:{TIMEZONE}",
        f"X-PUBLISHED-TTL:PT24H",
    ]
    for event in events:
        start = datetime.fromisoformat(event["start"])
        end = datetime.fromisoformat(event["end"])
        uid = f"sap-s4hana-watch-{event['id'].lower()}@github-pages"
        description = textwrap.dedent(
            f"""\
            {event['description']}

            Timezone shown to user: {TIMEZONE}.
            Calendar status: Free.
            Source: {SOURCE_LABEL}.
            Source URL: {SOURCE_URL}
            Codex SAP maintenance watch id: {event['id']}"""
        ).strip()
        lines.extend(["BEGIN:VEVENT", f"UID:{uid}", f"DTSTAMP:{utc_stamp(dtstamp)}"])
        lines.append(f"SUMMARY:{escape_ics('SAP S/4HANA Cloud watch: ' + event['title'])}")
        if event.get("allDay"):
            lines.append(f"DTSTART;VALUE=DATE:{date_value(start)}")
            lines.append(f"DTEND;VALUE=DATE:{date_value(end)}")
        else:
            lines.append(f"DTSTART:{utc_stamp(start)}")
            lines.append(f"DTEND:{utc_stamp(end)}")
        lines.extend(
            [
                "TRANSP:TRANSPARENT",
                "LOCATION:SAP S/4HANA Cloud Public Edition online schedule",
                f"DESCRIPTION:{escape_ics(description)}",
                "BEGIN:VALARM",
                "TRIGGER:-P1D" if event.get("allDay") else "TRIGGER:-PT12H",
                "ACTION:DISPLAY",
                "DESCRIPTION:SAP S/4HANA Cloud watch window reminder",
                "END:VALARM",
                "END:VEVENT",
            ]
        )
    lines.append("END:VCALENDAR")
    ICS_FILE.write_text("\r\n".join(fold_ics_line(line) for line in lines) + "\r\n", encoding="utf-8")


def schedule_signature(events: list[dict]) -> str:
    comparable = [
        {
            key: event.get(key)
            for key in ("id", "week", "title", "category", "start", "end", "systems", "description", "allDay")
        }
        for event in events
    ]
    return hashlib.sha256(json.dumps(comparable, sort_keys=True).encode("utf-8")).hexdigest()


def main() -> int:
    pdf_bytes = download_pdf()
    pdf_sha = hashlib.sha256(pdf_bytes).hexdigest()
    text = extract_pdf_text(pdf_bytes)
    release_dates = parse_release_dates(text)
    events = [dict(event) for event in SEED_EVENTS]
    update_upgrade_events(events, release_dates)
    events = enrich_events(events)
    signature = schedule_signature(events)

    previous = {}
    if METADATA_FILE.exists():
        previous = json.loads(METADATA_FILE.read_text(encoding="utf-8"))
    if previous.get("scheduleSha256") == signature:
        print("No SAP schedule data changes detected.")
        return 0

    source_checked = datetime.now(SYDNEY).date().isoformat()
    write_data_js(events, source_checked)
    write_ics(events, source_checked)
    METADATA_FILE.write_text(
        json.dumps(
            {
                "sourceUrl": SOURCE_URL,
                "sourceSha256": pdf_sha,
                "scheduleSha256": signature,
                "sourceChecked": source_checked,
                "releaseDates": [release.__dict__ for release in release_dates],
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print("SAP schedule data changed; regenerated data.js and ICS feed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
