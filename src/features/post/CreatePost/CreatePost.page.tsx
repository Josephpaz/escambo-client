import {CustomModal} from "@/components/ui/CustomModal";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {PageLoader} from "@/components/ui/PageLoader";
import {SelectCustom} from "@/components/ui/select";
import {UploadImagem} from "@/components/ui/UploadImagem";
import {REQUIRED_FIELD} from "@/helpers/constants.helper";
import {PostService} from "@/service/post/index.service";
import {Button, Stack, Text, Textarea} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type CreatePostForm = {
  title: string;
  categoryId: string[];
  description: string;
  images: File[];
};

export const categories = [
  {label: "Eletrônicos", value: "eletronicos"},
  {label: "Roupas", value: "roupas"},
  {label: "Livros", value: "livros"},
  {label: "Outros", value: "outros"},
];

export function CreatePost() {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<CreatePostForm>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: [],
      images: [],
    },
  });

  const onSubmit = async (data: CreatePostForm) => {
    setIsLoading(true);

    //const userId = localStorage.getItem("userId") || "";
    const userId = "4c02d404-51f8-4b7e-ad94-7023eb53aaf8";

    console.log(userId);

    const payload: PostService.CreateProps = {
      categoria: data.categoryId[0],
      descricao: data.description,
      titulo: data.title,
      user_id: userId,
    };

    try {
      const {
        data: {id},
      } = await PostService.create(payload);

      for (const image of data.images) {
        await PostService.uploadImage(id, image);
      }

      setFormSubmitted(true);
    } catch (err) {
      setFormSubmitted(false);
    } finally {
      setIsLoading(false);
      setOpen(true);
    }
  };

  const onClose = () => setOpen(false);

  useEffect(() => {
    setValue("images", files);
  }, [files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <PageLoader />}
      <Stack justifyItems={"center"} alignItems={"center"}>
        <Text textStyle={"4xl"} color="#1DAF87" mt="9" fontWeight={"700"}>
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
              rules={{
                required: REQUIRED_FIELD,
                minLength: {
                  value: 5,
                  message: "O título deve ter pelo menos 5 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "O título deve ter no máximo 20 caracteres",
                },
              }}
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
            invalid={!!errors.categoryId}
            errorText={errors.categoryId?.message}
          >
            <Controller
              name="categoryId"
              control={control}
              rules={{required: REQUIRED_FIELD}}
              render={({field}) => (
                <SelectCustom
                  label="Categoria"
                  visual="without-border"
                  placeholder="Selecione a categoria"
                  options={categories}
                  color="#373E4B"
                  size="xs"
                  width="360px"
                  value={field.value}
                  onValueChange={({value}) => field.onChange(value)}
                  isClearable
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
              rules={{
                required: REQUIRED_FIELD,
                minLength: {
                  value: 10,
                  message: "A descrição deve ter pelo menos 10 caracteres",
                },
              }}
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

          <Controller
            name="images"
            control={control}
            rules={{
              validate: (val) =>
                (val && val.length > 0) ||
                "É necessário enviar pelo menos uma imagem",
            }}
            render={({field}) => (
              <Field
                label="Fotos"
                color="#373E4B"
                errorText={errors.images?.message}
                invalid={!!errors.images}
              >
                <UploadImagem files={field.value} setFiles={setFiles} />
              </Field>
            )}
          />

          <Button
            colorPalette={"blue"}
            size="xs"
            fontSize="sm"
            width="359px"
            type="submit"
            fontWeight="700"
          >
            Incluir Item
          </Button>
        </Stack>
      </Stack>
      <CustomModal
        isOpen={open}
        onClose={() => {
          onClose();
          if (formSubmitted) navigate("/");
        }}
        title={formSubmitted ? "Cadastro Realizado" : "Erro no Cadastro"}
        isError={!formSubmitted}
        message={
          formSubmitted
            ? "Cadastro realizado com sucesso!"
            : "Ocorreu um erro ao tentar cadastrar. Tente novamente."
        }
      />
    </form>
  );
}
