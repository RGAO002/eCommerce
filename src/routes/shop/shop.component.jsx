import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
// import { fetchCategoriesAsync } from "../../store/categories/category.action";
import { fetchCategoriesStart } from "../../store/categories/category.action";

import { useDispatch } from "react-redux";

import "./shop.styles.scss";
// import { CategoriesProvider } from "../../contexts/categories.context";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const getCategoriesMap = async () => {
    // const categoriesArray = await getCategoriesAndDocuments("categories");
    dispatch(fetchCategoriesStart());
    // };
    // getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
