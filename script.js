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
      const haystack = `${event.week} ${event.title} ${event.displayTime} ${event.description} ${event.systems}`.toLowerCase();
      return matchesFilter && (!search || haystack.includes(search));
    });
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
    detailContent.innerHTML = `
      <div class="detail-kicker ${event.category}">${categoryLabels[event.category]}</div>
      <h3>${event.title}</h3>
      <dl>
        <div>
          <dt>Week</dt>
          <dd>${event.week}</dd>
        </div>
        <div>
          <dt>Window</dt>
          <dd>${event.displayTime}</dd>
        </div>
        <div>
          <dt>Systems</dt>
          <dd>${event.systems}</dd>
        </div>
        <div>
          <dt>Outlook</dt>
          <dd>${event.outlook}</dd>
        </div>
      </dl>
      <p>${event.description}</p>
      <div class="detail-footer">
        <span>Source: ${data.sourceLabel}</span>
        <span>${data.timezone}</span>
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
