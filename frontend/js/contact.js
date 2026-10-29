// Formulario de contacto: arma el mensaje de WhatsApp con los datos
// elegidos, lo muestra en vivo y al enviar abre el chat. No guarda ni
// envía nada a ningún servidor: el mensaje sale desde el WhatsApp del visitante.
const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {

const PHONE = "595994671223";

const preview = document.querySelector("[data-contact-preview]");
const nameInput = contactForm.elements.name;
const nameError = document.getElementById("cf-name-error");
const typeError = document.getElementById("cf-type-error");

function buildMessage(){

    const name = nameInput.value.trim();
    const type = contactForm.elements.type.value;
    const when = contactForm.elements.when.value;
    const idea = contactForm.elements.idea.value.trim();

    const lines = [name ? `Hola, soy ${name}.` : "Hola."];

    lines.push(type ? `Me interesa ${type}.` : "Me interesa…");

    if (when) lines.push(`Me gustaría empezar ${when}.`);

    if (idea) lines.push("", idea);

    return lines.join("\n");

}

function render(){

    preview.textContent = buildMessage();

}

// Al corregir un campo se quita su error
contactForm.addEventListener("input", (e) => {

    render();

    if (e.target === nameInput && nameInput.value.trim()) {

        nameInput.removeAttribute("aria-invalid");

        nameError.hidden = true;

    }

    if (e.target.name === "type") typeError.hidden = true;

});

contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const missingName = !nameInput.value.trim();
    const missingType = !contactForm.elements.type.value;

    nameInput.setAttribute("aria-invalid", String(missingName));

    nameError.hidden = !missingName;

    typeError.hidden = !missingType;

    if (missingName) { nameInput.focus(); return; }

    if (missingType) { contactForm.querySelector('[name="type"]').focus(); return; }

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage())}`;

    window.open(url, "_blank", "noopener");

});

render();

}
