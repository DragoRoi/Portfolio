const form = document.querySelector(".demo-form");
const receipt = document.querySelector("#receipt");
const isRepair = form.id === "repair-form";
const issue = form.elements.namedItem("issue");
const delivery = document.querySelector("#repair-delivery");

if (delivery) {
  const draft = document.querySelector("#repair-message");
  document.querySelector("#copy-repair").addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(draft.value);
      status.textContent = "Текст скопирован.";
    } catch {
      draft.focus();
      draft.select();
      status.textContent = "Текст выделен. Скопируйте его через меню браузера.";
    }
  });
}

if (!isRepair) {
  const dateField = form.elements.namedItem("date");
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    weekday: "short", day: "numeric", month: "long", year: "numeric"
  });
  for (let offset = 1; offset <= 7; offset++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    dateField.add(new Option(formatter.format(date)));
  }
}

form.hidden = false;
form.addEventListener("input", () => {
  if (issue) issue.setCustomValidity("");
  receipt.hidden = true;
  if (delivery) delivery.hidden = true;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const description = issue?.value.trim();
  if (isRepair && description.length < 5) {
    issue.setCustomValidity("Опишите поломку хотя бы пятью символами.");
    issue.reportValidity();
    return;
  }

  const title = isRepair ? "Тестовая заявка сформирована" : "Тестовая запись сформирована";
  const details = isRepair
    ? `${data.get("device")} · ${description} · ${data.get("time")}`
    : `${data.get("service")} · ${data.get("date")} · ${data.get("time")}`;
  document.querySelector("#receipt-title").textContent = title;
  document.querySelector("#receipt-details").textContent = details;
  receipt.hidden = false;
  if (delivery) {
    const draft = `/repair\nТехника: ${data.get("device")}\nУдобное время: ${data.get("time")}\nОписание: ${description}`;
    const link = document.querySelector("#repair-telegram");
    const telegram = new URL(link.href);
    telegram.search = `?text=${encodeURIComponent(draft)}`;
    link.href = telegram.href;
    document.querySelector("#repair-message").value = draft;
    document.querySelector("#copy-status").textContent = "";
    delivery.hidden = false;
    link.focus();
  } else {
    form.reset();
    receipt.scrollIntoView({ block: "nearest" });
  }
});
