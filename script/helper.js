export function getCurrentMinutes() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  return currentHour * 60 + currentMinute;
}

export function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

export function formattedTime(time) {
  const array = time.split("T");
  const arrayTime = array[1].split(":");
  return `${arrayTime[0]}:${arrayTime[1]}`;
}

export function makeShowDiv(show) {
  const showDiv = document.createElement("div");
  showDiv.classList.add("list-watch-later-show");

  const showTitle = document.createElement("h3");
  showTitle.classList.add("list-watch-later-show-title");
  showTitle.textContent = show.name;

  const showImg = document.createElement("img");
  showImg.classList.add("list-watch-later-show-img");
  showImg.src = show.img;

  const showDescription = document.createElement("p");
  showDescription.classList.add("list-watch-later-show-description");
  showDescription.textContent = show.description;

  const showTime = document.createElement("p");
  showTime.classList.add("list-watch-later-show-time");
  showTime.textContent =
    "Vrijeme prikazivanja: " +
    formattedTime(show.startTime) +
    " - " +
    formattedTime(show.endTime);

  const showScore = document.createElement("p");
  showScore.classList.add("list-watch-later-show-score");

  const showCategory = document.createElement("p");
  showCategory.classList.add("list-watch-later-show-category");
  showCategory.textContent = `Kategorija: ${show.category}`;

  showDiv.appendChild(showTitle);
  showDiv.appendChild(showImg);
  showDiv.appendChild(showDescription);
  showDiv.appendChild(showTime);

  if (show.score !== "undefined") {
    showScore.textContent = `Ocjena ${show.score}`;
    showDiv.appendChild(showScore);
  }

  showDiv.appendChild(showCategory);

  return showDiv;
}
