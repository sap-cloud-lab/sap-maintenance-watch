(function () {
  const data = window.sapWatchData;
  const events = data.events.map((event) => ({
    ...event,
    startDate: new Date(event.start),
    endDate: new Date(event.end)
  }));

  const categoryLabels = {
    upgrade: "Upgrade",
    maintenance: "Maintenance",
    change: "Online change",
    prep: "Technical prep"
  };

  const scheduleList = document.querySelector("#scheduleList");
  const detailContent = document.querySelector("#detailContent");
  const searchInput = document.querySelector("#searchInput");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const sourceChecked = document.querySelector("#sourceChecked");
  const nextWindow = document.querySelector("#nextWindow");

  let selectedId = null;
  let activeFilter = "all";

  function formatMonth(date) {
    return new Intl.DateTimeFormat("en-AU", {
      month: "short",
      day: "numeric"
    }).format(date);
  }

  function getNextEvent() {
    const now = new Date();
    return events.find((event) => event.endDate >= now) || events[events.length - 1];
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getHotfixSearchText(event) {
    if (!event.hotfixCollection) return "";
    const fixes = event.hotfixCollection.corrections
      .map((fix) => `${fix.component} ${fix.summary}`)
      .join(" ");
    return `${event.hotfixCollection.code} ${event.hotfixCollection.sapNote} ${event.hotfixCollection.attachment} ${fixes}`;
  }

  function getDetailWatchSearchText(event) {
    if (!event.detailWatch) return "";
    return [
      event.detailWatch.status,
      event.detailWatch.label,
      event.detailWatch.summary,
      event.detailWatch.expectedSource,
      event.detailWatch.expectedFrom,
      event.detailWatch.nextAction
    ].filter(Boolean).join(" ");
  }

  function getSignalSearchText(event) {
    return [event.customerActions, event.productUpdates]
      .flatMap((group) => group || [])
      .flatMap((signal) => [
        signal.label,
        signal.status,
        signal.source,
        signal.summary,
        ...(signal.items || [])
      ])
      .filter(Boolean)
      .join(" ");
  }

  function setCounts() {
    document.querySelector("#upgradeCount").textContent = events.filter((event) => event.category === "upgrade").length;
    document.querySelector("#maintenanceCount").textContent = events.filter((event) => event.category === "maintenance").length;
    document.querySelector("#changeCount").textContent = events.filter((event) => event.category === "change").length;
    document.querySelector("#prepCount").textContent = events.filter((event) => event.category === "prep").length;
    sourceChecked.textContent = data.sourceChecked;

    const next = getNextEvent();
    nextWindow.textContent = `${next.week} · ${next.title}`;
    selectedId = selectedId || next.id;
  }

  function getFilteredEvents() {
    const search = searchInput.value.trim().toLowerCase();
    return events.filter((event) => {
      const matchesFilter = activeFilter === "all" || event.category === activeFilter;
      const haystack = `${event.week} ${event.title} ${event.displayTime} ${event.description} ${event.systems} ${getHotfixSearchText(event)} ${getDetailWatchSearchText(event)} ${getSignalSearchText(event)}`.toLowerCase();
      return matchesFilter && (!search || haystack.includes(search));
    });
  }

  function renderSignalCards(signals, typeLabel, className) {
    if (!signals || !signals.length) return "";
    return signals.map((signal) => `
      <section class="signal-card ${className}" aria-label="${escapeHTML(typeLabel)}">
        <div class="signal-heading">
          <span>${escapeHTML(typeLabel)}</span>
          ${signal.status ? `<strong>${escapeHTML(signal.status)}</strong>` : ""}
        </div>
        <h4>${escapeHTML(signal.label)}</h4>
        <p>${escapeHTML(signal.summary)}</p>
        ${signal.items && signal.items.length ? `
          <ul class="signal-list">
            ${signal.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
          </ul>
        ` : ""}
        ${signal.source ? `<div class="signal-source">${escapeHTML(signal.source)}</div>` : ""}
      </section>
    `).join("");
  }

  function renderSchedule() {
    const filtered = getFilteredEvents();
    const next = getNextEvent();
    scheduleList.innerHTML = "";

    if (!filtered.length) {
      scheduleList.innerHTML = '<p class="empty-state">No matching SAP watch windows. Try another filter.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach((event) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `timeline-row ${event.category}`;
      if (event.id === selectedId) button.classList.add("selected");
      button.setAttribute("aria-pressed", event.id === selectedId ? "true" : "false");
      button.innerHTML = `
        <span class="date-block">
          <strong>${event.week}</strong>
          <small>${formatMonth(event.startDate)}</small>
        </span>
        <span class="event-main">
          <span class="event-title">${event.title}</span>
          <span class="event-time">${event.displayTime}</span>
        </span>
        <span class="event-meta">
          ${event.id === next.id ? '<span class="next-badge">Next</span>' : ""}
          ${event.hotfixCollection ? `<span class="hotfix-badge">${event.hotfixCollection.code}</span>` : ""}
          <span class="category-badge">${categoryLabels[event.category]}</span>
        </span>
      `;
      button.addEventListener("click", () => {
        selectedId = event.id;
        renderSchedule();
        renderDetails();
      });
      fragment.appendChild(button);
    });

    scheduleList.appendChild(fragment);
  }

  function renderDetails() {
    const event = events.find((item) => item.id === selectedId) || getNextEvent();
    const hotfix = event.hotfixCollection;
    const detailWatch = event.detailWatch;
    const customerActionMarkup = renderSignalCards(event.customerActions, "Customer action", "customer-action-card");
    const productUpdateMarkup = renderSignalCards(event.productUpdates, "Product update", "product-update-card");
    const hotfixMarkup = hotfix ? `
      <section class="hotfix-card" aria-label="${escapeHTML(hotfix.code)} application corrections">
        <div class="hotfix-heading">
          <span class="hotfix-code">${escapeHTML(hotfix.code)}</span>
          <div>
            <strong>${escapeHTML(hotfix.correctionCount)} application corrections</strong>
            <span>Released ${escapeHTML(hotfix.releasedOn)} for SAP S/4HANA Cloud Public Edition ${escapeHTML(hotfix.release)}</span>
          </div>
        </div>
        <div class="hotfix-source">
          <span>SAP Note ${escapeHTML(hotfix.sapNote)}</span>
          <span>${escapeHTML(hotfix.attachment)}</span>
        </div>
        <div class="hotfix-list" role="list">
          ${hotfix.corrections.map((fix) => `
            <article class="hotfix-row" role="listitem">
              <span>${escapeHTML(fix.component)}</span>
              <p>${escapeHTML(fix.summary)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    ` : "";
    const detailWatchMarkup = detailWatch ? `
      <section class="watch-card ${escapeHTML(detailWatch.status)}" aria-label="Detail watch status">
        <div class="watch-heading">
          <span>${escapeHTML(detailWatch.label)}</span>
          <strong>${escapeHTML(detailWatch.status)}</strong>
        </div>
        <p>${escapeHTML(detailWatch.summary)}</p>
        <dl class="watch-list">
          ${detailWatch.expectedFrom ? `
            <div>
              <dt>Expected from</dt>
              <dd>${escapeHTML(detailWatch.expectedFrom)}</dd>
            </div>
          ` : ""}
          <div>
            <dt>Source being checked</dt>
            <dd>${escapeHTML(detailWatch.expectedSource)}</dd>
          </div>
          <div>
            <dt>Hourly action</dt>
            <dd>${escapeHTML(detailWatch.nextAction)}</dd>
          </div>
        </dl>
      </section>
    ` : "";

    detailContent.innerHTML = `
      <div class="detail-kicker ${event.category}">${categoryLabels[event.category]}</div>
      <h3>${escapeHTML(event.title)}</h3>
      <dl>
        <div>
          <dt>Week</dt>
          <dd>${escapeHTML(event.week)}</dd>
        </div>
        <div>
          <dt>Window</dt>
          <dd>${escapeHTML(event.displayTime)}</dd>
        </div>
        <div>
          <dt>Systems</dt>
          <dd>${escapeHTML(event.systems)}</dd>
        </div>
        <div>
          <dt>Outlook</dt>
          <dd>${escapeHTML(event.outlook)}</dd>
        </div>
      </dl>
      <p>${escapeHTML(event.description)}</p>
      ${hotfixMarkup}
      ${detailWatchMarkup}
      ${customerActionMarkup}
      ${productUpdateMarkup}
      <div class="detail-footer">
        <span>Source: ${escapeHTML(data.sourceLabel)}</span>
        <span>${escapeHTML(data.timezone)}</span>
      </div>
    `;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderSchedule();
    });
  });

  searchInput.addEventListener("input", renderSchedule);

  setCounts();
  renderSchedule();
  renderDetails();
})();
