document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
      const age = document.getElementById("age").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const condition = document.getElementById("condition").value.trim();

      if (!name || !gender || !age || !phone || !address || !condition) {
        alert("Please fill all fields!");
        return;
      }

      const message = `New Appointment Request%0AName: ${name}%0AGender: ${gender}%0AAge: ${age}%0APhone: ${phone}%0AAddress: ${address}%0ACondition: ${condition}`;
      const whatsappNumber = "918577050405"; // ✅ Replace with your number

      const url = `https://wa.me/${whatsappNumber}?text=${message}`;
      window.open(url, "_blank");
    });
  }
});
