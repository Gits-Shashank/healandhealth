document.querySelectorAll(".faq-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const isOpen = content.style.display === "block";

    // Close all
    document.querySelectorAll(".faq-content").forEach(c => c.style.display = "none");
    document.querySelectorAll(".faq-toggle").forEach(b => b.classList.remove("active"));

    if (!isOpen) {
      content.style.display = "block";
      button.classList.add("active");
    }
  });
});
