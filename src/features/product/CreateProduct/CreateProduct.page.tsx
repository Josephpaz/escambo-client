import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SelectCustom } from "@/components/ui/select";
import {
  Button,
  CardBody,
  CardRoot,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Image } from "lucide-react";

const categorias = [
  {label: "Eletrônicos", value: "eletronicos"},
  {label: "Roupas", value: "roupas"},
  {label: "Livros", value: "livros"},
  {label: "Outros", value: "outros"},
];

export function CreateProduct() {
  return (
    <Stack justifyItems={"center"} alignItems={"center"}>
      <Text textStyle={"4xl"} color="#1DAF87" mt="12" fontWeight={"700"}>
        Incluir Item para troca
      </Text>
      <Stack gap={4} marginTop={2}>
        <Field label="Título" color="#373E4B">
          <Input visual='without-border' placeholder="Título do produto" size="xs" />
        </Field>
        <SelectCustom
          label="Categoria"
          visual={'without-border'}
          placeholder="Selecione a categoria"
          options={categorias}
          color={"#373E4B"}
          size="xs"
          width="320px"
        />
        <Field label="Descrição" color="#373E4B">
          <Textarea fontSize={"xs"} bg={'white'} border={'none'}/>
        </Field>

        <Field label="Fotos" color="#373E4B">
          <CardRoot
            width="126px"
            height="106px"
            background={"#FFFFFF"}
            border={"none"}
            mb="8px"
          >
            <CardBody
              display={"flex"}
              flexDirection={"column"}
              padding={0}
              justifyContent={"center"}
              alignItems={"center"}
              gap="10px"
            >
              <Image size="41" color="#A0AEC0" />
              <Text fontSize={"xs"} textAlign="center" color="#A0AEC0">
                Faça o upload das suas fotos
              </Text>
            </CardBody>
          </CardRoot>
          <Button
            colorPalette={"blue"}
            className="with-border"
            size={"xs"}
            fontSize={"sm"}
            width={"126px"}
            fontWeight={"700"}
          >
            Incluir
          </Button>
        </Field>
      </Stack>
    </Stack>
  );
}
