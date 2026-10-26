(() => {
  "use strict";

  // Produção: definir DDI + DDD + número, somente dígitos. Vazio mantém a demonstração.
  const WHATSAPP_NUMBER = "";
  const GREETING = "Olá! Gostaria de solicitar uma cotação com a Alpha Log.";
  const whatsappUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl(GREETING);
  });

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navegacao");
  const mobile = window.matchMedia("(max-width: 900px)");
  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  };
  const syncMenu = () => {
    menuButton.hidden = !mobile.matches;
    setMenu(false);
  };
  header.classList.add("menu-ready");
  syncMenu();
  mobile.addEventListener("change", syncMenu);
  menuButton.addEventListener("click", () =>
    setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    setMenu(false);
    // Mantém o foco fora do menu recolhido após navegar pelo teclado.
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
  header.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });

  // O HTML define o estado inicial; o disclosure nativo funciona sem JavaScript.
  document.querySelectorAll(".faq-list details").forEach((item, index) => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");
    answer.id = `faq-answer-${index + 1}`;
    summary.setAttribute("aria-controls", answer.id);
    const sync = () => summary.setAttribute("aria-expanded", String(item.open));
    sync();
    item.addEventListener("toggle", sync);
  });

  const form = document.querySelector("#quote-form");
  const feedback = document.querySelector("#form-feedback");
  const retry = document.querySelector("#whatsapp-retry");
  const fields = [...form.querySelectorAll("[required]")];
  const labels = {
    nome: "Nome",
    empresa: "Empresa",
    telefone: "Telefone",
    origem: "Origem",
    destino: "Destino",
    carga: "Tipo de carga",
    mensagem: "Mensagem",
  };

  const validate = (field) => {
    let error = "";
    const value = field.value.trim();
    if (!value)
      error =
        field.tagName === "SELECT"
          ? "Selecione o tipo de carga."
          : "Preencha este campo.";
    else if (field.id === "telefone") {
      const digits = value.replace(/\D/g, "");
      const national =
        digits.startsWith("55") && digits.length > 11
          ? digits.slice(2)
          : digits;
      const validLength = /^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/.test(national);
      if (!validLength || /[^\d\s()+.-]/.test(value))
        error = "Informe DDD e telefone válido.";
    } else if (value.length < 2) error = "Informe pelo menos 2 caracteres.";
    field.setAttribute("aria-invalid", String(Boolean(error)));
    document.getElementById(`${field.id}-error`).textContent = error;
    return !error;
  };

  fields.forEach((field) => {
    field.setAttribute("aria-describedby", `${field.id}-error`);
    field.addEventListener("blur", () => {
      if (field.value || field.hasAttribute("aria-invalid")) validate(field);
    });
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  form.addEventListener("input", () => {
    feedback.textContent = "";
    retry.hidden = true;
    retry.href = whatsappUrl(GREETING);
  });
  const messageField = form.elements.mensagem;
  messageField.addEventListener("input", () => {
    messageField.style.height = "auto";
    messageField.style.height = `${Math.min(messageField.scrollHeight, 220)}px`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
    feedback.classList.toggle("is-error", invalid.length > 0);
    if (invalid.length) {
      feedback.textContent =
        "Revise os campos indicados para preparar sua cotação.";
      retry.hidden = true;
      invalid[0].focus();
      return;
    }
    const lines = Object.entries(labels).map(
      ([name, label]) =>
        `${label}: ${form.elements[name].value.trim() || "Não informada"}`,
    );
    const url = whatsappUrl(`${GREETING}\n\n${lines.join("\n")}`);
    retry.href = url;
    retry.hidden = false;
    feedback.textContent = WHATSAPP_NUMBER
      ? "Mensagem preparada. Conclua o envio no WhatsApp. Se a janela não abrir, utilize o link abaixo."
      : "Mensagem preparada. Escolha o contato no WhatsApp para concluir sua solicitação. Se a janela não abrir, utilize o link abaixo.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
  form.querySelector('[type="submit"]').disabled = false;
})();
