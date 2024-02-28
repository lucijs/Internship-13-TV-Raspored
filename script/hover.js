document.addEventListener("DOMContentLoaded", () => {
  const previewData = {};
  document.querySelectorAll(".tv-guide-grid-row a").forEach((el) => {
    el.addEventListener("mouseover", async () => {
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

const filePath = "../data.json";
const getPreviewData = (id) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        const shows = json.shows;
        const getShow = shows[id - 1];
        const duration = getShow.startTime + ":" + getShow.endTime;
        resolve(duration);
      })
      .catch((error) => {
        resolve("Nema informacija");
      });
  });
};
