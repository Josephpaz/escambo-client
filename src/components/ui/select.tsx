import {selectRecipe} from "@/theme/components/select.recipe";
import {
  Select,
  Portal,
  createListCollection,
  SelectRootProps,
  RecipeVariantProps,
  useRecipe,
} from "@chakra-ui/react";

interface Option {
  label: string;
  value: string;
}

interface SelectCustomProps extends Omit<SelectRootProps, "collection"> {
  label?: string;
  options: Option[];
  placeholder?: string;
}

type SelectVariantProps = RecipeVariantProps<typeof selectRecipe> &
  SelectCustomProps;

export interface SelectProps
  extends React.PropsWithChildren<SelectVariantProps> {}

export function SelectCustom(props: SelectProps) {
  const {label, options, placeholder = "Selecione uma opção"} = props;
  const recipe = useRecipe({recipe: selectRecipe});
  const [recipeProps, restProps] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  const collection = createListCollection({
    items: options,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <Select.Root collection={collection} {...restProps}>
      <Select.HiddenSelect />
      {label && <Select.Label color="#373E4B">{label}</Select.Label>}
      <Select.Control css={styles}>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
