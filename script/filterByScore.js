import { makeShowDiv } from "./helper.js";

export async function renderScoreList(score) {
  const channelsList = document.getElementById("list-watch-later");
  channelsList.innerHTML = "";
  const list = await getList(score);
  console.log(list);

  list.forEach((el) => {
    const show = makeShowDiv(el);
    channelsList.appendChild(show);
  });
}

const filePath = "../data.json";
const getList = (score) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        console.log(json.shows.filter((show) => show.score == score));
        resolve(json.shows.filter((show) => show.score == score));
      });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#pin").addEventListener("click", async (e) => {
    e.preventDefault();

    const score = document.querySelectorAll(".pin input")[0].value;
    if (!correctFomrmat(score)) {
      alert("Neispravan unos. Treba biti broj između 1 i 5.");
      return;
    }
    renderScoreList(score);
  });
});

function correctFomrmat(score) {
  console.log(score);
  console.log(typeof score);
  return /^\d$/.test(score) && score >= 1 && score <= 5;
}
