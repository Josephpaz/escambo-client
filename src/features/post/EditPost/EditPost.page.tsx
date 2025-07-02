import {CustomModal} from "@/components/ui/CustomModal";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {PageLoader} from "@/components/ui/PageLoader";
import {SelectCustom} from "@/components/ui/select";
import {REQUIRED_FIELD} from "@/helpers/constants.helper";
import {PostService} from "@/service/post/index.service";
import {Button, Stack, Text, Textarea} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

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

export function EditPost() {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [files, _] = useState<File[]>([]);

  const {id: postId} = useParams<{id: string}>();

  console.log("postId", postId);

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    reset,
  } = useForm<CreatePostForm>();

  const onSubmit = async (data: CreatePostForm) => {
    setIsLoading(true);

    const payload: Omit<PostService.CreateProps, "user_id"> = {
      categoria: data.categoryId[0],
      descricao: data.description,
      titulo: data.title,
    };

    try {
      await PostService.edit({...payload, id: postId!});

      setFormSubmitted(true);
    } catch (err) {
      setFormSubmitted(false);
    } finally {
      setIsLoading(false);
      setOpen(true);
    }
  };

  const {data: postDetailResponse} = useQuery({
    queryKey: ["editPost", postId],
    queryFn: async () => {
      return await PostService.getById(postId!);
    },
    enabled: !!postId,
  });

  const onClose = () => setOpen(false);

  const postDetail = useMemo(() => {
    return postDetailResponse?.data;
  }, [postDetailResponse]);

  useEffect(() => {
    setValue("images", files);
  }, [files]);

  useEffect(() => {
    if (!postDetail) return;
    reset({
      title: postDetail.titulo,
      categoryId: [postDetail.categoria],
      description: postDetail.descricao,
    });
  }, [postDetail, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <PageLoader />}
      <Stack justifyItems={"center"} alignItems={"center"}>
        <Text textStyle={"4xl"} color="#1DAF87" mb="10" fontWeight={"700"}>
          Editar Item
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

          <Button
            colorPalette={"blue"}
            size="xs"
            fontSize="sm"
            width="359px"
            type="submit"
            fontWeight="700"
          >
            Editar Item
          </Button>
        </Stack>
      </Stack>
      <CustomModal
        isOpen={open}
        onClose={() => {
          onClose();
          if (formSubmitted) navigate("/");
        }}
        title={formSubmitted ? "Item editado com Realizado" : "Erro na Edição"}
        isError={!formSubmitted}
        message={
          formSubmitted
            ? "Edição realizada com sucesso!"
            : "Ocorreu um erro ao tentar editar o item. Tente novamente."
        }
      />
    </form>
  );
}
