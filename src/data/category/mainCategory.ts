export const mainCategory = [
  {
    name: "Dogs",
    categoryId: "dogs",
    level: 1,
    levelTwoCategory: [
      {
        name: "Food & Treats",
        categoryId: "dogs_food_treats",
        parentCategoryId: "dogs",
        level: 2,
        levelThreeCategory: [
          { name: "Dry Food", categoryId: "dogs_food_treats_dry", level: 3 },
          { name: "Wet Food", categoryId: "dogs_food_treats_wet", level: 3 },
          { name: "Treats", categoryId: "dogs_food_treats_treats", level: 3 }
        ]
      },
      {
        name: "Toys & Accessories",
        categoryId: "dogs_toys_accessories",
        parentCategoryId: "dogs",
        level: 2,
        levelThreeCategory: [
          { name: "Chew Toys", categoryId: "dogs_toys_accessories_chew", level: 3 },
          { name: "Fetch Toys", categoryId: "dogs_toys_accessories_fetch", level: 3 },
          { name: "Collars & Leashes", categoryId: "dogs_toys_accessories_collars", level: 3 }
        ]
      },
      {
        name: "Health & Grooming",
        categoryId: "dogs_health_grooming",
        parentCategoryId: "dogs",
        level: 2,
        levelThreeCategory: [
          { name: "Shampoos & Conditioners", categoryId: "dogs_health_grooming_shampoos", level: 3 },
          { name: "Brushes & Combs", categoryId: "dogs_health_grooming_brushes", level: 3 },
          { name: "Dental Care", categoryId: "dogs_health_grooming_dental", level: 3 }
        ]
      },
      {
        name: "Beds & Crates",
        categoryId: "dogs_beds_crates",
        parentCategoryId: "dogs",
        level: 2,
        levelThreeCategory: [
          { name: "Soft Beds", categoryId: "dogs_beds_crates_soft", level: 3 },
          { name: "Crate Pads", categoryId: "dogs_beds_crates_pads", level: 3 }
        ]
      }
    ]
  },
  {
    name: "Cats",
    categoryId: "cats",
    level: 1,
    levelTwoCategory: [
      {
        name: "Food & Treats",
        categoryId: "cats_food_treats",
        parentCategoryId: "cats",
        level: 2,
        levelThreeCategory: [
          { name: "Dry Food", categoryId: "cats_food_treats_dry", level: 3 },
          { name: "Wet Food", categoryId: "cats_food_treats_wet", level: 3 },
          { name: "Treats", categoryId: "cats_food_treats_treats", level: 3 }
        ]
      },
      {
        name: "Toys & Scratchers",
        categoryId: "cats_toys_scratchers",
        parentCategoryId: "cats",
        level: 2,
        levelThreeCategory: [
          { name: "Interactive Toys", categoryId: "cats_toys_scratchers_interactive", level: 3 },
          { name: "Catnip Toys", categoryId: "cats_toys_scratchers_catnip", level: 3 }
        ]
      },
      {
        name: "Litter & Accessories",
        categoryId: "cats_litter_accessories",
        parentCategoryId: "cats",
        level: 2,
        levelThreeCategory: [
          { name: "Clumping Litter", categoryId: "cats_litter_accessories_clumping", level: 3 },
          { name: "Non-Clumping Litter", categoryId: "cats_litter_accessories_non_clumping", level: 3 },
          { name: "Litter Boxes", categoryId: "cats_litter_accessories_boxes", level: 3 }
        ]
      }
    ]
  },
  {
    name: "Small Pets",
    categoryId: "small_pets",
    level: 1,
    levelTwoCategory: [
      {
        name: "Food & Hay",
        categoryId: "small_pets_food_hay",
        parentCategoryId: "small_pets",
        level: 2,
        levelThreeCategory: [
          { name: "Pellets", categoryId: "small_pets_food_hay_pellets", level: 3 },
          { name: "Timothy Hay", categoryId: "small_pets_food_hay_timothy", level: 3 }
        ]
      },
      {
        name: "Cages & Habitats",
        categoryId: "small_pets_cages_habitats",
        parentCategoryId: "small_pets",
        level: 2,
        levelThreeCategory: [
          { name: "Wire Cages", categoryId: "small_pets_cages_habitats_wire", level: 3 },
          { name: "Plastic Habitats", categoryId: "small_pets_cages_habitats_plastic", level: 3 }
        ]
      }
    ]
  },
  {
    name: "Fish & Aquatics",
    categoryId: "fish_aquatics",
    level: 1,
    levelTwoCategory: [
      {
        name: "Fish Food & Care",
        categoryId: "fish_food_care",
        parentCategoryId: "fish_aquatics",
        level: 2,
        levelThreeCategory: [
          { name: "Flakes", categoryId: "fish_food_care_flakes", level: 3 },
          { name: "Pellets", categoryId: "fish_food_care_pellets", level: 3 },
          { name: "Live Food", categoryId: "fish_food_care_live", level: 3 }
        ]
      },
      {
        name: "Aquariums & Accessories",
        categoryId: "fish_aquariums_accessories",
        parentCategoryId: "fish_aquatics",
        level: 2,
        levelThreeCategory: [
          { name: "Tanks", categoryId: "fish_aquariums_accessories_tanks", level: 3 },
          { name: "Filters", categoryId: "fish_aquariums_accessories_filters", level: 3 },
          { name: "Decorations", categoryId: "fish_aquariums_accessories_decorations", level: 3 }
        ]
      }
    ]
  }
];
