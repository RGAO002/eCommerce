import { CategoriesState } from "./category.reducer";
import { createSelector } from "reselect";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      console.log("category", category);
      // console.log("data", docSnapshot.data());
      const { title, items } = category;

      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
