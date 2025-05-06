"use client"
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  RecipeVariantProps,
  useRecipe,
} from "@chakra-ui/react";
import { inputRecipe } from "@/theme/components/input.recipe";

type InputVariantProps = RecipeVariantProps<typeof inputRecipe> & ChakraInputProps;

export interface InputProps
  extends React.PropsWithChildren<InputVariantProps> {}

export function Input(props: InputProps) {
  const recipe = useRecipe({recipe: inputRecipe});
  const [recipeProps, restProps] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  return <ChakraInput css={styles} {...props} {...restProps} />;
}
