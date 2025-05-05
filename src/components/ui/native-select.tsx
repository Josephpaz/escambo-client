import {
  Select,
  Portal,
  createListCollection,
  SelectRootProps,
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

export function SelectCustom({
  label,
  options,
  placeholder = "Selecione uma opção",
  ...rest
}: SelectCustomProps) {
  const collection = createListCollection({
    items: options,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <Select.Root collection={collection} {...rest}>
      <Select.HiddenSelect />
      {label && <Select.Label color="#373E4B">{label}</Select.Label>}
      <Select.Control className="without-border">
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
