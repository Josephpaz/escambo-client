import Vetor from '@/assets/vetor_cadastro.png';
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Stack
} from '@chakra-ui/react';

import { CustomModal } from '@/components/CustomModal';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PageLoader } from '@/components/ui/PageLoader';
import { REQUIRED_FIELD } from '@/helpers/constants.helper';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface RegisterForm {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
     confirmSenha: string;
}

export function Cadastro() {
    const { handleSubmit, control, watch, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: {
            nome: '',
            telefone: '',
            email: '',
            senha: '',
            confirmSenha: '',
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { open, onOpen, onClose } = useDisclosure();

    const senha = watch('senha')

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(data);
            setFormSubmitted(true);
        } catch (error) {
            console.error(error);
            setFormSubmitted(false);
        } finally {
            setIsLoading(false);
            onOpen();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading && <PageLoader />}

            <Flex minH="100vh" bg="#EFF1F4">
                <Flex flex={1} align="center" justify="center">
                    <Image src={Vetor} alt="Ilustração de Cadastro" objectFit="contain" maxW="100%" />
                </Flex>

                <Flex flex={1} bg="#1DAF87" color="white" align="center" justify="center">
                    <Box maxW="md" w="full" bg="transparent">
                        <Stack align="center" justify="center" textAlign="center">
                            <Heading fontSize={48} mb={4} textAlign="center">
                                Criar Conta
                            </Heading>
                            <Stack align="center" justify="center" textAlign="center" mt={7}>
                                <Field
                                    label="Nome"
                                    color="#FFFFFF"
                                    fontWeight="bolder"
                                    invalid={!!errors.nome}
                                    errorText={errors.nome?.message}

                                >
                                    <Controller
                                        name="nome"
                                        control={control}
                                        rules={{
                                            required: REQUIRED_FIELD,
                                            pattern: {
                                                value: /^[A-Za-zÀ-ÿ\s]+$/,
                                                message: "Digite apenas letras"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                visual="without-border"
                                                placeholder="Seu Nome"
                                                _placeholder={{ color: '#A0AEC0', fontWeight: 'normal' }}
                                                color={"#232D3D"}
                                                w={300}
                                                h={8}
                                                type='text'
                                                {...field}
                                            />
                                        )}
                                    />
                                </Field>


                                <Field
                                    label="Telefone"
                                    color="#FFFFFF"
                                    fontWeight="bolder"
                                    invalid={!!errors.telefone}
                                    errorText={errors.telefone?.message}
                                >
                                    <Controller
                                        name="telefone"
                                        control={control}
                                        rules={{ required: REQUIRED_FIELD }}
                                        render={({ field }) => (
                                            <Input
                                                visual="without-border"
                                                placeholder="DDD00000000"
                                                _placeholder={{ color: '#A0AEC0', fontWeight: 'normal' }}
                                                color={"#232D3D"}
                                                w={300}
                                                h={8}
                                                type="tel"
                                                {...field}
                                            />
                                        )}
                                    />
                                </Field>


                                <Field
                                    label="Email"
                                    color="#FFFFFF"
                                    fontWeight="bolder"
                                    invalid={!!errors.email}
                                    errorText={errors.email?.message}
                                >
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: REQUIRED_FIELD,
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Digite um email válido"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                visual="without-border"
                                                placeholder="Email@Email.com"
                                                _placeholder={{ color: '#A0AEC0', fontWeight: 'normal' }}
                                                color={"#232D3D"}
                                                w={300}
                                                h={8}
                                                type="email"
                                                {...field}
                                            />
                                        )}
                                    />

                                </Field>


                                <Field
                                    label="Senha"
                                    color="#FFFFFF"
                                    fontWeight="bolder"
                                    invalid={!!errors.senha}
                                    errorText={errors.senha?.message}
                                >
                                    <Controller
                                        name="senha"
                                        control={control}
                                        rules={{
                                            required: REQUIRED_FIELD,
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                message: "A senha deve ter pelo menos 6 caracteres, incluindo letras e números"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                visual="without-border"
                                                placeholder="******"
                                                _placeholder={{ color: '#A0AEC0', fontWeight: 'normal' }}
                                                color={"#232D3D"}
                                                w={300}
                                                h={8}
                                                type="password"
                                                {...field}
                                            />
                                        )}
                                    />
                                </Field>
                                <Field
                                    label="Confirmar Senha"
                                    color="#FFFFFF"
                                    fontWeight="bolder"
                                    invalid={!!errors.confirmSenha}
                                    errorText={errors.confirmSenha?.message}
                                >
                                    <Controller
                                        name="confirmSenha"
                                        control={control}
                                        rules={{
                                            required: REQUIRED_FIELD,
                                            validate: value => value === senha || "As senhas não coincidem"
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                visual="without-border"
                                                placeholder="******"
                                                _placeholder={{ color: '#A0AEC0', fontWeight: 'normal' }}
                                                color={"#232D3D"}
                                                w={300}
                                                h={8}
                                                type="password"
                                                {...field}
                                            />
                                        )}
                                    />
                                </Field>
                                <Stack align="center" justify="center" textAlign="center" mt={5}>
                                    <Button
                                        type="submit"
                                        mt={4}
                                        bg="#0871FF"
                                        color="white"
                                        _hover={{ bg: "#559CFB" }}
                                        fontWeight="bold"
                                        w={182}
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
                onClose={onClose}
                message="Cadastro realizado com sucesso!"
            />

        </form>
    );
}