import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      console.log("category", category);
      // console.log("data", docSnapshot.data());
      const { title, items } = category;

      acc[title.toLowerCase()] = items;

      return acc;
    }, {})
);
