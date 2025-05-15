import { Box, Stack, chakra } from "@chakra-ui/react";

const CustomCheckbox = chakra("input");

const checkboxStyles = {
  appearance: "none",
  width: "18px",
  height: "18px",
  border: "2px solid teal",
  borderRadius: "4px",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  mr: "8px",
  "&:checked::before": {
    content: '"✔"',
    display: "block",
    textAlign: "center",
    color: "teal",
    fontSize: "12px",
    lineHeight: "16px",
  },
};

const statusOptions = [
  { label: "Aceita", value: "ACEITA" },
  { label: "Recusada", value: "RECUSADA" },
  { label: "Pendente", value: "PENDENTE" },
];

export function Filter({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newValue: string[]) => void;
}) {
  const handleToggle = (status: string) => {
    if (value.includes(status)) {
      onChange(value.filter((v) => v !== status));
    } else {
      onChange([...value, status]);
    }
  };

  return (
    <Box>
      <Stack>
        {statusOptions.map((option) => (
          <label key={option.value} style={{ display: "flex", alignItems: "center",  color:"#373E4B",}}>
            <CustomCheckbox
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              css={checkboxStyles}
              color={"#373E4B"}
            />
            {option.label}
          </label>
        ))}
      </Stack>
    </Box>
  );
}
