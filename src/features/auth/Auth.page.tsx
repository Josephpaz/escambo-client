import {Button, Flex, Image, Text} from "@chakra-ui/react";
import LogoPng from "@/assets/imgs/Logomarca.png";
import TradeSvg from "@/assets/Ilustracao_Troca.svg";
import {Field} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.hook";

type AuthForm = {
  email: string;
  password: string;
};

export function AuthPage() {
  const {control, handleSubmit} = useForm<AuthForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const {login, isLoading} = useAuth();

  const onSubmit = (data: AuthForm) => {
    login.mutate({email: data.email, senha: data.password});
  };

  return (
    <Flex
      justifyContent={"space-between"}
      minH="100vh"
      maxH="100vh"
      alignItems={"stretch"}
    >
      <Flex
        bg="#1DAF87"
        borderRightRadius={20}
        p="4"
        flex="1"
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Flex alignItems={"center"} gap="2">
          <Image src={LogoPng} h={58} w={58} cursor={"pointer"} />
          <Text color={"white"} fontSize={40} fontWeight={"bolder"}>
            Escambo
          </Text>
        </Flex>

        <Flex flexDir={"column"} gap="4" mt="8">
          <Controller
            control={control}
            name="email"
            rules={{required: "E-mail obrigatório"}}
            render={({field, formState: {errors}}) => (
              <Field
                label="E-mail"
                color="#373E4B"
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  placeholder="Digite seu e-mail"
                  visual="without-border"
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{required: "Senha obrigatória"}}
            render={({field, formState: {errors}}) => (
              <Field
                label="Senha"
                color="#373E4B"
                invalid={!!errors.password}
                errorText={errors.password?.message}
              >
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  visual="without-border"
                  {...field}
                />
              </Field>
            )}
          />
        </Flex>

        <Button
          colorPalette="blue"
          size="xs"
          fontSize="sm"
          type="submit"
          w="10rem"
          fontWeight="700"
          mt="8"
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Entrar
        </Button>

        <Text fontSize="xs" mt="4">
          Ainda não tem conta?{" "}
          <Text
            as="span"
            color="blue"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => navigate("/register")}
          >
            Cadastre-se aqui
          </Text>
        </Text>
      </Flex>

      <Flex flex="1" justifyContent="center" alignItems="center">
        <Image src={TradeSvg} maxH="70%" />
      </Flex>
    </Flex>
  );
}
