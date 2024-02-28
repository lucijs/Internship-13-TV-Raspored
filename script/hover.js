import { formattedTime } from "./helper.js";
import { makeShowDiv } from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
  const previewData = {};
  const container = document.getElementById("hover");
  document.querySelectorAll(".tv-guide-grid-row a").forEach((el) => {
    el.addEventListener("mouseover", async () => {
      const previewTooltipEl = el.querySelector(".preview-tooltip");
      if (previewTooltipEl) {
        return;
      }

      const id = el.getAttribute("id");

      const show = await getShow(id);
      const showDiv = makeShowDiv(show);
      container.appendChild(showDiv);

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
          container.innerHTML = "";
        }
      });
    });
  });
});

const filePath = "../data.json";
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
      .catch(() => {
        resolve("Nema informacija");
      });
  });
};

const getShow = (id) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => resolve(json.shows[id - 1]));
  });
};
