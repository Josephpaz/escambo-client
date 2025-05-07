import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {SelectCustom} from "@/components/ui/select";
import {REQUIRED_FIELD} from "@/helpers/constants.helper";
import {
  Button,
  CardBody,
  CardRoot,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {Image} from "lucide-react";
import {useForm, Controller} from "react-hook-form";

type CreateProductForm = {
  title: string;
  category: string[];
  description: string;
};

const categorias = [
  {label: "Eletrônicos", value: "eletronicos"},
  {label: "Roupas", value: "roupas"},
  {label: "Livros", value: "livros"},
  {label: "Outros", value: "outros"},
];

export function CreateProduct() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm<CreateProductForm>({
    defaultValues: {
      title: "",
      category: [],
      description: "",
    },
  });

  const onSubmit = (data: CreateProductForm) => {
    console.log(data);
  };

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack justifyItems={"center"} alignItems={"center"}>
        <Text textStyle={"4xl"} color="#1DAF87" mt="12" fontWeight={"700"}>
          Incluir Item para troca
        </Text>
        <Stack gap={4} marginTop={2}>
          <Field
            label="Título"
            color="#373E4B"
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              rules={{required: REQUIRED_FIELD}}
              render={({field}) => (
                <Input
                  visual="without-border"
                  placeholder="Título do produto"
                  size="xs"
                  {...field}
                />
              )}
            />
          </Field>

          <Field
            invalid={!!errors.category}
            errorText={errors.category?.message}
          >
            <Controller
              name="category"
              control={control}
              rules={{required: REQUIRED_FIELD}}
              render={({field}) => (
                <SelectCustom
                  label="Categoria"
                  visual="without-border"
                  placeholder="Selecione a categoria"
                  options={categorias}
                  color="#373E4B"
                  size="xs"
                  width="320px"
                  onValueChange={(e) => setValue("category", e.value)}
                  isClearable
                  {...field}
                />
              )}
            />
          </Field>

          <Field
            label="Descrição"
            color="#373E4B"
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              rules={{required: REQUIRED_FIELD}}
              render={({field}) => (
                <Textarea
                  fontSize="xs"
                  bg="white"
                  border={errors.description ? "1px solid red" : "white"}
                  placeholder="Descrição do produto"
                  {...field}
                />
              )}
            />
          </Field>

          <Field label="Fotos" color="#373E4B">
            <CardRoot
              width="126px"
              height="106px"
              background="#FFFFFF"
              border="none"
              mb="8px"
            >
              <CardBody
                display="flex"
                flexDirection="column"
                padding={0}
                justifyContent="center"
                alignItems="center"
                gap="10px"
              >
                <Image size="41" color="#A0AEC0" />
                <Text fontSize="xs" textAlign="center" color="#A0AEC0">
                  Faça o upload das suas fotos
                </Text>
              </CardBody>
            </CardRoot>
            <Button
              colorPalette={"blue"}
              size="xs"
              fontSize="sm"
              width="126px"
              type="submit"
              fontWeight="700"
            >
              Incluir
            </Button>
          </Field>
        </Stack>
      </Stack>
    </form>
  );
}
