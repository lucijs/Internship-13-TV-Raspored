import { makeShowDiv } from "./helper.js";

export async function renderShow() {
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
  const previewData = {};
  document.querySelectorAll(".tv-guide-grid-row a").forEach((el) => {
    el.addEventListener("ondblclick", async () => {
      const previewTooltipEl = el.querySelector(".preview-tooltip");
      if (previewTooltipEl) {
        return;
      }
      const id = el.getAttribute("id");
      if (!(el.getAttribute("id") in previewData)) {
        previewData[el.getAttribute("id")] = await getPreviewData(
          el.getAttribute("id")
        );
      }
      el.insertAdjacentHTML(
        "afterbegin",
        `<span class="preview-tooltip">
      <span>${previewData[id]}</span>
      </span>`
      );
    });

    document.querySelectorAll(".tv-guide-grid-row a").forEach((el) => {
      el.addEventListener("mouseleave", () => {
        const previewTooltipEl = el.querySelector(".preview-tooltip");
        if (previewTooltipEl) {
          previewTooltipEl.remove();
        }
      });
    });
  });
});

const getPreviewData = (id) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        const shows = json.shows;
        const getShow = shows[id - 1];
        const duration =
          formattedTime(getShow.startTime) +
          " - " +
          formattedTime(getShow.endTime);
        resolve(duration);
      })
      .catch((error) => {
        resolve("Nema informacija");
      });
  });
};
