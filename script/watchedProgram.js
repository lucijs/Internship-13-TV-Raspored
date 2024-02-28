document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tv-guide-grid-row").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const channel = el.getAttribute("channel");
      const isSelected = el.classList.contains("watched");
      if (!isSelected) {
        document.querySelectorAll(".tv-guide-grid-row").forEach((el) => {
          el.classList.remove("watched");
          el.style.transform = "";
          return;
        });
      }

      alterChannelName(channel);

      el.classList.add("watched");
    });
  });
});

function alterChannelName(channel) {
  document.querySelectorAll("#tv-guide-program-names h2").forEach((ch) => {
    if (ch.getAttribute("channel") == channel) ch.classList.add("currently-on");
    else {
      ch.classList.remove("currently-on");
      ch.style.transform = "";
    }
  });
}
