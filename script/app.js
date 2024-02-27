import { data } from "./data.js";

function updateLinePosition() {
  const tvGuide = document.getElementById("tv-guide-grid");
  const verticalLine = document.getElementById("line");
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const totalCurrentMinutes = currentHour * 60 + currentMinute;
  tvGuide.scrollLeft = totalCurrentMinutes * 4;
  verticalLine.style.left = (totalCurrentMinutes - 81) * 4.5 + "px";
}

function updateTimeLine() {
  const timeLine = document.getElementById("time-line");
  timeLine.innerHTML = "";
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  const time = document.createElement("div");
  const t = document.createElement("h3");
  t.textContent = formattedTime;
  time.appendChild(t);
  timeLine.appendChild(time);
}

function renderTVGuide() {
  const channelsList = document.getElementById("tv-guide-program-names");
  updateTimeLine();
  channelsList.innerHTML = "";
  const showsGrid = document.getElementById("tv-guide-grid");
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
    updateLinePosition();
    showsGrid.appendChild(gridRow);
  });
}

renderTVGuide();
setInterval(updateLinePosition, 60000);
setInterval(updateTimeLine, 60000);
