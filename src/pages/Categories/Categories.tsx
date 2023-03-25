import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categories/categories";

interface CategoriesProps {}

const Categories: React.FunctionComponent<CategoriesProps> = () => {
  const query = useQuery(["categoriesData"], () => getCategories(), {
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error.response.status);
    },
  });
  return <></>;
};

export default Categories;
