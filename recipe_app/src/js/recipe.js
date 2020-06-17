// 해당 파일을 이 파일에서 사용할 때 임의로 이름을 지정
// import str from "./models/search";
// 해당 파일 안에 작성된 모듈을 불러올 때
// import { add, multiply } from "./views/searchView";
import Search from "./models/search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { element, elements, rednerLoader, clearLoader } from "./views/base";
// Global State of the app
const state = {};

// Search Controller
const controlSearch = async () => {
  const query = searchView.getInput();
  console.log(query);
  // 1) Get query from view
  const query = "pizza";
  if (query) {
    // 2) New Search Object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResult();
    rednerLoader(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    clearLoader();
    searchView.renderResults(stat.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    searchView.renderResults(stat.search.result, goToPage);
    console.log(goToPage);
  }
});

// Recipe Controller
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
