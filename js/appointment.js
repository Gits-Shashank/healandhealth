// ========== Live Time ==========
function updateLiveTime() {
  const now = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  const formattedTime = now.toLocaleString("en-IN", options);
  document.getElementById("live-time").textContent = formattedTime;
  return formattedTime;
}
setInterval(updateLiveTime, 1000);
updateLiveTime(); // Initial run

// ========== Slot Booking ==========
const openHour = 10;
const closeHour = 21;
const slotDuration = 30;
let bookedSlots = [];

function getNextAvailableSlot() {
  const now = new Date();
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();

  let slotStart = new Date();
  slotStart.setSeconds(0);
  slotStart.setMilliseconds(0);

  if (currentHour < openHour) {
    slotStart.setHours(openHour, 0);
  } else {
    let minutesSinceOpen = (currentHour - openHour) * 60 + currentMin;
    let nextSlotMinutes = Math.ceil(minutesSinceOpen / slotDuration) * slotDuration;
    slotStart.setHours(openHour + Math.floor(nextSlotMinutes / 60), nextSlotMinutes % 60);
  }

  if (slotStart.getHours() >= closeHour) return null;

  while (bookedSlots.some(s => s.getTime() === slotStart.getTime())) {
    slotStart.setMinutes(slotStart.getMinutes() + slotDuration);
    if (slotStart.getHours() >= closeHour) return null;
  }

  return slotStart;
}

// ========== Form Validation ==========
function validateForm() {
  const name = document.getElementById("name");
  const gender = document.querySelector("input[name='gender']:checked");
  const age = document.getElementById("age");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const condition = document.getElementById("condition");

  let valid = true;
  const fields = [name, gender, age, phone, address, condition];

  fields.forEach((field) => {
    if (!field || !field.value.trim()) {
      field.setCustomValidity("Please fill this field.");
      field.reportValidity();
      valid = false;
    } else {
      field.setCustomValidity("");
    }
  });

  return valid;
}

// ========== WhatsApp Redirect ==========
document.getElementById("payBtn").addEventListener("click", () => {
  if (!validateForm()) return;

  const slot = getNextAvailableSlot();
  if (!slot) {
    alert("Sorry, no slots available today.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const condition = document.getElementById("condition").value;
  const timeSlot = slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  bookedSlots.push(slot); // Optional: mark slot as booked

  const doctorMsg = `New Appointment:\nName: ${name}\nGender: ${gender}\nAge: ${age}\nPhone: ${phone}\nAddress: ${address}\nCondition: ${condition}\nSlot: ${timeSlot}`;
  const patientMsg = `Hi ${name}, your appointment is confirmed at Heal&Health.\nSlot Time: ${timeSlot}\nThank you!`;

  const docNumber = "918577050404"; // Doctor's WhatsApp number
  const patientNumber = phone.replace(/^0/, '91');

  window.open(`https://wa.me/${docNumber}?text=${encodeURIComponent(doctorMsg)}`);
  window.open(`https://wa.me/${patientNumber}?text=${encodeURIComponent(patientMsg)}`);
});
