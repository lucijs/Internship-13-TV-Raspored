import { data } from "./data.js";

function renderTVGuide() {
  const channelsList = document.getElementById("tv-guide-program-names");
  channelsList.innerHTML = "";
  const showsGrid = document.getElementById("tv-guide-grid");
  showsGrid.innerHTML = "";

  data.programs.forEach((channel) => {
    const gridRow = document.createElement("div");
    gridRow.classList.add("tv-guide-grid-row");

    const channelHeader = document.createElement("h2");
    channelHeader.textContent = channel.name;
    channelsList.appendChild(channelHeader);

    channel.broadcasted.forEach((show) => {
      const showDiv = document.createElement("div");
      const duration = (show.endTime - show.startTime) / (1000 * 60);
      const width = duration * 4.5;

      showDiv.style.width = width + "px";

      const showName = document.createElement("h3");
      showName.classList.add("show-title");
      showName.textContent = show.name;
      showDiv.appendChild(showName);
      gridRow.appendChild(showDiv);
    });

    showsGrid.appendChild(gridRow);
  });
}

renderTVGuide();
