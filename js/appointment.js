document.addEventListener("DOMContentLoaded", function () {
  // === Live Time Section ===
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
  updateLiveTime();

  // === Daily Patient Counter (localStorage based) ===
  function incrementDailyCounter() {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    let counterData = JSON.parse(localStorage.getItem("patientCounter")) || {};

    if (counterData.date !== today) {
      counterData = { date: today, count: 1 };
    } else {
      counterData.count += 1;
    }

    localStorage.setItem("patientCounter", JSON.stringify(counterData));
    return counterData.count;
  }

  // === Form Submit Handler ===
  document.getElementById("appointmentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const address = document.getElementById("address").value.trim();
    const condition = document.getElementById("condition").value.trim();
    const gender = document.querySelector("input[name='gender']:checked");

    if (!name || !phone || !age || !address || !condition || !gender) {
      alert("Please fill in all fields.");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    const genderValue = gender.value;
    const liveTime = updateLiveTime();
    const dailyPatientNo = incrementDailyCounter();

    const message = `*Appointment Request*\n\n*Patient No:* ${dailyPatientNo}\n*Name:* ${name}\n*Phone:* ${phone}\n*Age:* ${age}\n*Gender:* ${genderValue}\n*Address:* ${address}\n*Condition:* ${condition}\n*Time:* ${liveTime}`;

    const whatsappLink = `https://wa.me/918577050405?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  });
});
