import { makeShowDiv } from "./helper.js";

export async function renderCategoryList(score) {
  const channelsList = document.getElementById("list-watch-later");
  channelsList.innerHTML = "";

  const categories = await getCategories();

  categories.forEach(async (category) => {
    const list = await getList(category);
    const chategoryDiv = document.createElement("div");
    chategoryDiv.classList.add("categories");
    console.log(list);

    const title = document.createElement("h3");
    title.classList.add("category");
    title.textContent = category;
    chategoryDiv.appendChild(title);

    list.forEach((el) => {
      const show = makeShowDiv(el);
      chategoryDiv.appendChild(show);
    });

    channelsList.appendChild(chategoryDiv);
  });
}

const filePath = "../data.json";
const getList = (category) => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => {
        console.log(json.shows.filter((show) => show.category == category));
        resolve(json.shows.filter((show) => show.category == category));
      });
  });
};

const getCategories = () => {
  return new Promise((resolve) => {
    fetch(filePath)
      .then((r) => r.json())
      .then((json) => resolve(json.categories));
  });
};
