import Vetor from '@/assets/vetor_cadastro.png';
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Stack
} from '@chakra-ui/react';

import { CustomModal } from '@/components/ui/CustomModal';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PageLoader } from '@/components/ui/PageLoader';
import { REQUIRED_FIELD } from '@/helpers/constants.helper';
import { PostRegister, RegisterCreate, verificarEmail } from '@/service/post/postRegister';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { open, onOpen, onClose } = useDisclosure();
    const senha = watch('senha')

    const inputProps = {
        _placeholder: { color: '#A0AEC0', fontWeight: 'normal' },
        color: "#232D3D",
        w: 300,
        h: 8
    };

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true);
        try {
            const payload: RegisterCreate = {
                nome: data.nome,
                telefone: data.telefone,
                email: data.email,
                senha: data.senha,
                confirmSenha: data.confirmSenha,
            };

            await PostRegister.create(payload);
            setFormSubmitted(true);
            onOpen();
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setFormSubmitted(false);
            onOpen();
        } finally {
            setIsLoading(false);
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
                                                {...inputProps}
                                                visual="without-border"
                                                placeholder="Seu Nome"
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

                                        rules={{
                                            required: REQUIRED_FIELD,
                                            pattern: {
                                                value: /^\(?\d{2}\)?\d{4, 5}-?\d{4}$/,
                                                message: "Digite um telefone válido (ex: 11999999999)"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...inputProps}
                                                visual="without-border"
                                                placeholder="DDD00000000"
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
                                            },
                                            validate: async (value) => {
                                                const existe = await verificarEmail(value);
                                                return !existe || "E-mail já cadastrado";
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...inputProps}
                                                visual="without-border"
                                                placeholder="Email@Email.com"
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
                                                message: "A senha deve ter pelo menos 6 caracteres"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...inputProps}
                                                visual="without-border"
                                                placeholder="******"
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
                                                {...inputProps}
                                                visual="without-border"
                                                placeholder="******"
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
                onClose={() => {
                    onClose();
                    if (formSubmitted) navigate('/')
                }}
                title={formSubmitted ? 'Cadastro Realizado' : 'Erro no Cadastro'}
                isError={!formSubmitted}
                message={
                    formSubmitted
                        ? 'Cadastro realizado com sucesso!'
                        : 'Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.'
                }
            />


        </form>
    );
}