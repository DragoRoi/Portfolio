const { name, telegram, email } = window.portfolioContacts;
if (name.trim()) {
  document.querySelectorAll("[data-brand]").forEach((element) => {
    element.textContent = name.trim();
  });
  document.title = `${name.trim()} — веб-разработчик`;
}

const links = document.querySelector("#contact-links");
function addContact(label, url, kind) {
  const link = document.createElement("a");
  link.className = `button ${kind}`;
  link.href = url;
  link.textContent = label;
  links.append(link);
}

const handle = telegram.trim().replace(/^@/, "");
if (/^[a-zA-Z0-9_]{5,32}$/.test(handle)) {
  addContact("Написать в Telegram ↗", `https://t.me/${handle}`, "primary");
}
const address = email.trim();
if (/^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(address)) {
  const mailbox = encodeURIComponent(address).replace("%40", "@");
  addContact(address, `mailto:${mailbox}?subject=${encodeURIComponent("Запрос на разработку")}`, links.children.length ? "secondary" : "primary");
}
if (links.children.length) {
  links.hidden = false;
  document.querySelector("#contact-note").hidden = true;
}
