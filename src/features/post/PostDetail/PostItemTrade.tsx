/* eslint-disable @typescript-eslint/no-explicit-any */
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {SelectCustom} from "@/components/ui/select";
import {generateId} from "@/components/ui/UploadImagem";
import {
  Button,
  Card,
  Flex,
  chakra,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import {MoveRight, X} from "lucide-react";
import {categorias} from "../CreatePost/CreatePost.page";
import {useState} from "react";
import {FiUpload} from "react-icons/fi";
import {Controller, useForm} from "react-hook-form";
import {CustomModal} from "@/components/ui/CustomModal";
import {FaWhatsapp} from "react-icons/fa6";
import {REQUIRED_FIELD} from "@/helpers/constants.helper";
import {TradeService} from "@/service/trade/index.service";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

type PostItemTradeProps = {
  post: any;
  postId: string;
  userPhone: string;
};

type CreateTradeForm = {
  image: File;
  name: string;
  categoryId: string[];
};

export function PostItemTrade({post, postId, userPhone}: PostItemTradeProps) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<CreateTradeForm>({
    defaultValues: {
      categoryId: [],
      name: "",
    },
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [tradeId, setTradeId] = useState<string>("");
  const [file, setFile] = useState<File>();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSizeInBytes = 5 * 1024 * 1024;

    const validFiles = Array.from(selectedFiles).filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSizeInBytes
    );

    const invalidFiles = Array.from(selectedFiles).filter(
      (file) => !allowedTypes.includes(file.type) || file.size > maxSizeInBytes
    );

    if (invalidFiles.length > 0) {
      alert(
        `Só são permitidos arquivos PNG e JPEG com tamanho máximo de 5MB são permitidos. ${invalidFiles.length} arquivo(s) inválido(s) foram ignorados.`
      );
    }

    const renamedFiles = validFiles.map((file) => {
      const extension = file.name.split(".").pop();
      const newName = `img-${generateId()}.${extension}`;

      return new File([file], newName, {type: file.type});
    });

    setFile(renamedFiles[0]);

    event.target.value = "";
  }

  function removeFile() {
    setFile(undefined);
  }

  const handleSendMessage = () => {
    const phone = "55" + userPhone.replace(/\D/g, "");
    const message = `Olá! Tenho interesse no seu anúncio. O código da minha proposta é: ${tradeId
      .slice(0, 6)
      .toUpperCase()}`;
    const url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setOpen(false);
    navigate("/");
  };

  const {
    mutateAsync: createTrade,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (data: CreateTradeForm) => {
      const payload: TradeService.CreateProps = {
        categoria: data.categoryId[0],
        nome: data.name,
        descricao: "",
        dono_postagem_id: post.user_id,
        interessado_id: "90c8242e-0b7f-4ec8-a235-70a6401e5886",
        postagem_id: postId,
      };

      const {
        data: {id},
      } = await TradeService.createTrade(payload);

      setTradeId(id);

      await TradeService.uploadImage(id, file!);
    },
    onSettled: () => setOpen(true),
  });

  const onSubmit = async (data: CreateTradeForm) => {
    await createTrade(data);
  };

  return (
    <Flex direction="column" flex="1 1 350px" minW="280px" maxW="400px">
      <Card.Root bg="white" borderRadius="8px" borderColor="white">
        <Card.Header borderBottom="1px solid #A0AEC0" padding="16px">
          <Text textStyle="2xl" color="#373E4B" textAlign="center">
            Item Oferecido
          </Text>
        </Card.Header>
        <Card.Body display="flex" flexDirection="column" alignItems="center">
          <HStack margin={0} justifyContent="center" gap="18px">
            <HStack
              maxW="700px"
              mx="auto"
              margin={0}
              flexDirection="column"
              position={"relative"}
            >
              {file ? (
                <>
                  <Box position="absolute" top={-2} right={-2} zIndex={9999}>
                    <X
                      onClick={removeFile}
                      color="#373E4B"
                      cursor={"pointer"}
                    />
                  </Box>
                  <Image w="126px" h="106px" src={URL.createObjectURL(file)} />
                </>
              ) : (
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  bg="#FFFFFF"
                  p={4}
                  w="126px"
                  h="106px"
                  border="1px dashed #A0AEC0"
                  borderRadius="md"
                  _hover={{bg: "gray.50"}}
                  transition="background 0.2s"
                  textAlign="center"
                >
                  <Icon as={FiUpload} boxSize={8} color="#A0AEC0" mb={2} />
                  <Text fontSize={12} color="#A0AEC0" fontWeight="normal">
                    Faça o upload de sua foto
                  </Text>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{display: "none"}}
                  />
                </chakra.label>
              )}
            </HStack>
            <MoveRight size={24} color="#A0AEC0" />
            <Image
              src={post.imagens[0]}
              w="126px"
              h="106px"
              borderRadius="10px"
            />
          </HStack>

          <VStack gap="8px" width="100%">
            <Field
              label="Item a ser oferecido"
              color="#373E4B"
              mt="4"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Controller
                control={control}
                name={"name"}
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
                render={({field, fieldState: {error}}) => (
                  <Input
                    placeholder="item"
                    size="xs"
                    borderColor="#E2E8F0"
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
                    options={categorias}
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
          </VStack>

          <Button
            mt="30px"
            colorPalette="blue"
            fontSize="sm"
            width="230px"
            type="submit"
            fontWeight="700"
            onClick={handleSubmit(onSubmit)}
            loading={isPending}
          >
            Propor Troca
          </Button>
        </Card.Body>
      </Card.Root>
      <CustomModal
        ActionButton={
          <Button
            bg="#1DAF87"
            onClick={handleSendMessage}
            color={"white"}
            fontWeight={"bold"}
            size={"sm"}
          >
            Entrar em contato <Icon as={FaWhatsapp} w={"20px"} h={"20px"} />
          </Button>
        }
        isOpen={open}
        onClose={() => {
          setOpen(false);
          navigate("/");
        }}
        title={"Envio de Proposta"}
        isError={isError}
        message={
          isSuccess
            ? "Sua proposta de troca foi enviada com sucesso!"
            : "Sua proposta de troca não foi enviada. Contate o suporte da plataforma."
        }
      />
    </Flex>
  );
}
