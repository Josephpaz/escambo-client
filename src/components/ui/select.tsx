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
  isClearable?: boolean;
}

type SelectVariantProps = RecipeVariantProps<typeof selectRecipe> &
  SelectCustomProps;

export interface SelectProps
  extends React.PropsWithChildren<SelectVariantProps> {}

export function SelectCustom(props: SelectProps) {
  const {label, options, placeholder = "Selecione uma opção", isClearable} = props;
  const recipe = useRecipe({recipe: selectRecipe});
  const [recipeProps, restProps] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  const collection = createListCollection({
    items: options,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <Select.Root collection={collection}
    
    borderColor={'#E2E8F0'}
    {...restProps}>
      <Select.HiddenSelect />
      {label && <Select.Label color="#373E4B">{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger css={styles} borderColor={'#E2E8F0'}>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
        {isClearable && <Select.ClearTrigger />}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content background={"white"} color={"#1d1d20"} borderColor={'#E2E8F0'}>
            {collection.items.map((item) => (
              <Select.Item
                key={item.value}
                item={item}
                css={{_highlighted: {background: "#ccfbf1"}}}
              >
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
