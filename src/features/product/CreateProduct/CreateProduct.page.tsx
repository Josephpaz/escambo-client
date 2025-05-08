import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/ui/Navbar";
import { SelectCustom } from "@/components/ui/select";
import {
  Box,
  Button,
  CardRoot,
  FileUpload,
  Icon,
  Stack,
  Text,
  Textarea
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

const categorias = [
  { label: "Eletrônicos", value: "eletronicos" },
  { label: "Roupas", value: "roupas" },
  { label: "Livros", value: "livros" },
  { label: "Outros", value: "outros" },
];

export function CreateProduct() {
  return (
    <Stack spaceX={6}>
      <NavBar />
      <Stack justifyItems={"center"} alignItems={"center"}>
        <Text color={'#1DAF87'} fontSize={32} mb={5} fontWeight={'bolder'}>
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
            <Textarea fontSize={"xs"} bg={'white'} border={'none'} placeholder="Descreva seu produto"/>
          </Field>

          <Field label="Fotos" color="#373E4B">
            <CardRoot
              width="126px"
              height="106px"
              background="#FFFFFF"
              border="1px solid #E0E0E0"
              borderRadius="md"
              overflow="hidden"
              p={1}
            >
              <FileUpload.Root width="full" height="full" alignItems="center" justifyContent="center" maxFiles={2} cursor={'pointer'}>
                <FileUpload.HiddenInput />

                <FileUpload.Dropzone
                  bg="white"
                  p={1}
                  width="full"
                  height="full"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={LuUpload} boxSize={6} mt={2} color="gray.500" />
                  <FileUpload.DropzoneContent textAlign="center">
                    <Box fontSize="xs" color={'gray.500'}>.png, .jpg até 5MBs</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
              </FileUpload.Root>
            </CardRoot>
            <Button
              colorPalette={"blue"}
              className="with-border"
              h={'32px'}
              fontSize={"14px"}
              w={'126px'}
              fontWeight={"bold"}
            >
              Incluir
            </Button>
          </Field>
        </Stack>
      </Stack>
    </Stack>
  );
}
