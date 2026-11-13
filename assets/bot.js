const messages = document.querySelector("#messages");
const options = document.querySelector("#options");
const form = document.querySelector("#bot-form");
const field = form.elements.namedItem("message");
const reset = document.querySelector("#reset");

function say(sender, message) {
  const item = document.createElement("li");
  const label = document.createElement("b");
  label.textContent = sender;
  item.classList.toggle("visitor", sender === "Вы");
  item.append(label, document.createTextNode(message));
  messages.append(item);
}

function start() {
  messages.replaceChildren();
  field.setCustomValidity("");
  form.reset();
  form.hidden = true;
  options.hidden = false;
  say("Помощник", "Здравствуйте! Выберите, чем могу помочь.");
}

const replies = {
  services: "Могу подсказать про лендинг, форму записи или бота с меню и заявками.",
  price: "Ориентир за небольшую задачу — 3–5 тыс. ₽. Стоимость зависит от объёма работы.",
  request: "Кратко опишите задачу, чтобы проверить, как формируется заявка."
};

options.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.dataset.choice;
    say("Вы", button.textContent);
    say("Помощник", replies[choice]);
    if (choice === "request") {
      options.hidden = true;
      form.hidden = false;
      field.focus();
    }
  });
});

field.addEventListener("input", () => field.setCustomValidity(""));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = field.value.trim();
  if (message.length < 5) {
    field.setCustomValidity("Введите хотя бы пять символов.");
    field.reportValidity();
    return;
  }
  say("Вы", message);
  say("Помощник", "Тестовая заявка сформирована. В этом демо данные остаются на странице.");
  form.reset();
  form.hidden = true;
  options.hidden = false;
  reset.focus();
});

reset.addEventListener("click", () => {
  start();
  options.querySelector("button").focus();
});

start();
document.querySelector("#chat").hidden = false;
