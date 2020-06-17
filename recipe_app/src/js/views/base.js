export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResList: document.querySelector(".results__list"),
  searchResPages = document.querySelector('.results__pages'),
};

export const elementStrings = {
  loader: "loader",
};

export const rednerLoader = (parent) => {
  const loader = `
    <div class="${elements.loader}">
    <svg>
    <use herf="img/icons.svg#icon-cw"></use>
    </svg>
    </div>
    `;
  parent.insertAdjacentHTML("afterebegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elements.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
