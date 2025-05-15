function sendContact() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  const whatsappNumber = "918577050405"; // Replace with your number
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=New Contact Message%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

  window.open(whatsappURL, "_blank");
}
