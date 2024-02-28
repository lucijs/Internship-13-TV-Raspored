import { makeShowDiv } from "./helper.js";

export async function renderList() {
  const channelsList = document.getElementById("list-watch-later");

  const showCategory = document.createElement("p");
  showCategory.classList.add("list-watch-later-show-category");

  const list = await getList();
  console.log(list);

  list.forEach((el) => {
    const show = makeShowDiv(el);
    channelsList.appendChild(show);
  });
}

const filePath = "../data.json";

const getList = () => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        console.log(json.watchlist);
        resolve(json.watchlist);
      });
  });
};

renderList();
