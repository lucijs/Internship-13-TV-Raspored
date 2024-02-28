import { renderTVGuide } from "./tvGuide.js";
import { renderList } from "./wacthList.js";
import { renderScoreList } from "./filterByScore.js";

const handleFirstPageLoad = () => {
  const pageObserver = new MutationObserver(() => {
    handlePageLoad();
  });
  pageObserver.observe(document.getElementById("root"), {
    childList: true,
  });

  handlePageLoad();
};

const handlePageLoad = () => {
  document.dispatchEvent(new Event("page-load"));
  document.querySelectorAll(".buttons a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      handleLinkClick(el.href);
    });
  });
};

const handleLinkClick = (href) => {
  fetch(href)
    .then((r) => r.text())
    .then((html) => {
      handlePageReplace(href, html);
    });
};

const handlePageReplace = (href, html) => {
  const parser = new DOMParser();
  const newDocument = parser.parseFromString(html, "text/html");

  const title = newDocument.title;
  document.getElementById("root").innerHTML =
    newDocument.getElementById("root").innerHTML;
  console.log(title);
  switch (title) {
    case "TV Guide":
      renderTVGuide();
      break;
    case "Watch List":
      renderList();
      break;
    case "Filter by score":
      renderScoreList();
      break;
    default:
      break;
  }

  document.querySelector("title").innerText =
    newDocument.querySelector("title").innerText;

  history.pushState({}, "", href);
};

document.addEventListener("DOMContentLoaded", handleFirstPageLoad);
