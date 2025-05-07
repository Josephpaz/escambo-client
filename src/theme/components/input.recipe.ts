import {defineRecipe} from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    visual: {
      "without-border": {
        _focus: {
          outline: 'none',
          border: '1px solid red'
        },
        bg: "white",
        border: "1px solid white",
      },
    },
  },
});
