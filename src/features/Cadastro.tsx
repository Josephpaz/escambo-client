import Vetor from "@/assets/vetor_cadastro.png";
import {Box, Button, Flex, Heading, Image, Stack} from "@chakra-ui/react";
import {CustomModal} from "@/components/ui/CustomModal";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {REQUIRED_FIELD} from "@/helpers/constants.helper";
import {
  PostRegister,
  verificarEmail,
} from "@/service/post/postRegister.service";
import {useDisclosure} from "@chakra-ui/react";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth.hook";

interface RegisterForm {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  confirmSenha: string;
}

const inputProps = {
  _placeholder: {color: "#A0AEC0", fontWeight: "normal"},
  color: "#232D3D",
  w: 300,
  h: 8,
};

export function Cadastro() {
  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm<RegisterForm>({
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      senha: "",
      confirmSenha: "",
    },
  });

  const {open, onOpen, onClose} = useDisclosure();
  const navigate = useNavigate();
  const senha = watch("senha");
  const {login, isLoading} = useAuth();

  const registerMutation = useMutation({
    mutationFn: PostRegister.create,
    onError: () => {
      onOpen();
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const payload = {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        senha: data.senha,
      };

      await registerMutation.mutateAsync(payload);
      await login.mutateAsync({email: data.email, senha: data.senha});
    } catch (err) {
      onOpen();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex minH="100vh" bg="#EFF1F4">
        <Flex flex={1} align="center" justify="center">
          <Image
            src={Vetor}
            alt="Ilustração de Cadastro"
            objectFit="contain"
            maxW="100%"
          />
        </Flex>

        <Flex
          flex={1}
          bg="#1DAF87"
          color="white"
          align="center"
          justify="center"
        >
          <Box maxW="md" w="full" bg="transparent">
            <Stack align="center" justify="center" textAlign="center">
              <Heading fontSize={48} mb={4} textAlign="center">
                Criar Conta
              </Heading>
              <Stack align="center" justify="center" textAlign="center" mt={7}>
                {/* NOME */}
                <Field
                  label="Nome"
                  color="#FFFFFF"
                  fontWeight="bolder"
                  invalid={!!errors.nome}
                  errorText={errors.nome?.message}
                  errorColor="#F94649"
                >
                  <Controller
                    name="nome"
                    control={control}
                    rules={{
                      required: REQUIRED_FIELD,
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ\s]+$/,
                        message: "Digite apenas letras",
                      },
                    }}
                    render={({field}) => (
                      <Input
                        {...inputProps}
                        visual="without-border"
                        placeholder="Seu Nome"
                        borderColor={errors.nome ? "#F94649" : "transparent"}
                        type="text"
                        {...field}
                      />
                    )}
                  />
                </Field>

                {/* TELEFONE */}
                <Field
                  label="Telefone"
                  color="#FFFFFF"
                  fontWeight="bolder"
                  invalid={!!errors.telefone}
                  errorText={errors.telefone?.message}
                  errorColor="#F94649"
                >
                  <Controller
                    name="telefone"
                    control={control}
                    rules={{
                      required: REQUIRED_FIELD,
                      pattern: {
                        value: /^\(?\d{2}\)?\d{4,5}-\d{4}$/,
                        message:
                          "Digite um telefone válido (ex: (DD)00000-0000)",
                      },
                    }}
                    render={({field}) => (
                      <Input
                        {...inputProps}
                        visual="without-border"
                        placeholder="(DDD)00000-0000"
                        borderColor={
                          errors.telefone ? "#F94649" : "transparent"
                        }
                        type="tel"
                        {...field}
                      />
                    )}
                  />
                </Field>

                {/* EMAIL */}
                <Field
                  label="Email"
                  color="#FFFFFF"
                  fontWeight="bolder"
                  invalid={!!errors.email}
                  errorText={errors.email?.message}
                  errorColor="#F94649"
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: REQUIRED_FIELD,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Digite um email válido",
                      },
                      validate: async (value) => {
                        const existe = await verificarEmail(value);
                        return !existe || "E-mail já cadastrado";
                      },
                    }}
                    render={({field}) => (
                      <Input
                        {...inputProps}
                        visual="without-border"
                        placeholder="Email@Email.com"
                        type="email"
                        borderColor={errors.email ? "#F94649" : "transparent"}
                        {...field}
                      />
                    )}
                  />
                </Field>

                {/* SENHA */}
                <Field
                  label="Senha"
                  color="#FFFFFF"
                  fontWeight="bolder"
                  invalid={!!errors.senha}
                  errorText={errors.senha?.message}
                  errorColor="#F94649"
                >
                  <Controller
                    name="senha"
                    control={control}
                    rules={{
                      required: REQUIRED_FIELD,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
                        message:
                          "A senha deve conter letras maiús, minús, números e caract especiais",
                      },
                    }}
                    render={({field}) => (
                      <Input
                        {...inputProps}
                        visual="without-border"
                        placeholder="******"
                        type="password"
                        borderColor={errors.senha ? "#F94649" : "transparent"}
                        {...field}
                      />
                    )}
                  />
                </Field>

                {/* CONFIRMAR SENHA */}
                <Field
                  label="Confirmar Senha"
                  color="#FFFFFF"
                  fontWeight="bolder"
                  invalid={!!errors.confirmSenha}
                  errorText={errors.confirmSenha?.message}
                  errorColor="#F94649"
                >
                  <Controller
                    name="confirmSenha"
                    control={control}
                    rules={{
                      required: REQUIRED_FIELD,
                      validate: (value) =>
                        value === senha || "As senhas não coincidem",
                    }}
                    render={({field}) => (
                      <Input
                        {...inputProps}
                        visual="without-border"
                        placeholder="******"
                        type="password"
                        borderColor={
                          errors.confirmSenha ? "#F94649" : "transparent"
                        }
                        {...field}
                      />
                    )}
                  />
                </Field>

                <Stack align="center" justify="center" mt={5}>
                  <Button
                    type="submit"
                    mt={4}
                    bg="#0871FF"
                    color="white"
                    _hover={{bg: "#559CFB"}}
                    fontWeight="bold"
                    w={182}
                    loading={isLoading}
                  >
                    Cadastrar-se
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Flex>

      <CustomModal
        isOpen={open}
        onClose={() => {
          onClose();
          if (login.isSuccess) navigate("/");
        }}
        title={login.isSuccess ? "Cadastro Realizado" : "Erro no Cadastro"}
        isError={login.isError}
        message={
          login.isSuccess
            ? "Cadastro realizado com sucesso!"
            : "Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde."
        }
      />
    </form>
  );
}
