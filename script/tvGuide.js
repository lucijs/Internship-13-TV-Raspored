import { data } from "./data.js";

function getCurrentMinutes() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  return currentHour * 60 + currentMinute;
}

function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function updateTimeLine() {
  const timeLine = document.getElementById("time-line");
  const tvGuide = document.getElementById("tv-guide-grid");
  const verticalLine = document.getElementById("line");

  const time = document.createElement("div");
  timeLine.innerHTML = "";
  const t = document.createElement("h3");
  time.appendChild(t);

  t.textContent = getCurrentTime();
  const totalCurrentMinutes = getCurrentMinutes();

  if (totalCurrentMinutes < 400) {
    tvGuide.scrollLeft = (totalCurrentMinutes + 24 * 60) * 4;
    verticalLine.style.left = (totalCurrentMinutes + 24 * 60) * 4.5 + "px";
    time.style.left = (totalCurrentMinutes + 24 * 60) * 4.5 - 18 + "px";

    timeLine.appendChild(time);

    return;
  }

  tvGuide.scrollLeft = totalCurrentMinutes * 4;
  verticalLine.style.left = (totalCurrentMinutes - 60) * 4.5 + "px";
  time.style.left = (totalCurrentMinutes - 60) * 4.5 - 18 + "px";

  timeLine.appendChild(time);
}

function renderTVGuide() {
  if (window.innerWidth < 1000) {
    mobileVersion();
    return;
  }

  const channelsList = document.getElementById("tv-guide-program-names");
  channelsList.innerHTML = "";

  const showsGrid = document.getElementById("tv-guide-grid");

  data.programs.forEach((channel) => {
    const gridRow = document.createElement("div");
    gridRow.classList.add("tv-guide-grid-row");
    gridRow.setAttribute("channel", channel.name);

    const channelHeader = document.createElement("h2");
    channelHeader.textContent = channel.name;
    channelHeader.setAttribute("channel", channel.name);

    channelsList.appendChild(channelHeader);

    channel.broadcasted.forEach((show) => {
      const showDiv = document.createElement("div");

      const showA = document.createElement("a");
      showA.setAttribute("id", show.id);

      const showName = document.createElement("h3");
      showName.classList.add("show-title");

      const duration = (show.endTime - show.startTime) / (1000 * 60);
      const width = duration * 4.5;

      showDiv.style.width = width + "px";

      if (!show.isReplay) showName.textContent = show.name;
      else showName.textContent = show.name + " (R)";

      showDiv.appendChild(showName);
      showA.appendChild(showDiv);
      gridRow.appendChild(showA);
    });

    updateTimeLine();
    showsGrid.appendChild(gridRow);
  });
}

function mobileVersion() {
  const channelsList = document.getElementById("tv-guide-program-names");
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

      const showName = document.createElement("h3");
      showName.classList.add("show-title");

      const duration = (show.endTime - show.startTime) / (1000 * 60);
      const height = duration;
      showDiv.style.height = height + "px";

      if (!show.isReplay) showName.textContent = show.name;
      else showName.textContent = show.name + " (R)";

      showDiv.appendChild(showName);
      gridRow.appendChild(showDiv);
    });

    updateLinePosition();
    showsGrid.appendChild(gridRow);
  });
}

renderTVGuide();
setInterval(updateTimeLine, 60000);
