import {defineRecipe} from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      "without-border": {
        bg: "white",
        border: "1px solid white",
      },
    },
  },
});
