import React from "react";
import { mainCategory } from "../../../data/category/mainCategory";
import { Box } from "@mui/material";

interface Category {
  name: string;
  categoryId: string;
  parentCategoryId?: string;
  level: number;
  levelThreeCategory?: Category[];
}

const categoryTwo: Record<string, Category[]> = {};
const categoryThree: Record<string, Category[]> = {};

mainCategory.forEach((category) => {
  categoryTwo[category.categoryId] = category.levelTwoCategory;

  category.levelTwoCategory.forEach((subCategory) => {
    categoryThree[subCategory.categoryId] = subCategory.levelThreeCategory || [];
  });
});

const CategorySheet: React.FC = () => {
  const childCategory = (category: Record<string, Category[]>, parentCategoryId: string) => {
    return category[parentCategoryId] || [];
  };

  return (
    <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[470px] overflow-y-auto">
      <div className="flex text-sm flex-wrap">
        {mainCategory.map((category) => (
          <div key={category.categoryId} className="p-4">
            <p className="text-primary-color mb-5 font-semibold">{category.name}</p>
            <ul className="space-y-3">
              {childCategory(categoryTwo, category.categoryId).map((subCategory) => (
                <div key={subCategory.categoryId}>
                  <p className="font-medium">{subCategory.name}</p>
                  <ul className="pl-4 space-y-2">
                    {childCategory(categoryThree, subCategory.categoryId).map((levelThreeItem) => (
                      <li key={levelThreeItem.categoryId} className="hover:text-primary-color cursor-pointer">
                        {levelThreeItem.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
