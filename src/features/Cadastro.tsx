import Vetor from '@/assets/vetor_cadastro.png'; // ajuste conforme o caminho do seu vetor
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Input,
    Stack
} from '@chakra-ui/react';

import { Field } from '@/components/ui/field';

export function Cadastro() {
    return (
        <Flex minH={"100vh"} bg={"#EFF1F4"}>
            <Flex flex={1} align={"center"} justify={"center"}>
                <Image src={Vetor} alt={"Ilustração de Cadastro"} objectFit={"contain"} maxW={"100%"} />
            </Flex>

            <Flex
                flex={1}
                bg="#1DAF87"
                color="white"
                align="center"
                justify="center"
            >
                <Box maxW="md" w="full" bg="transparent">
                    <Stack spaceX={4}>
                        <Heading fontSize={48} mb={4} textAlign={"center"}>Criar Conta</Heading>
                        <Stack gap={4} marginTop={2} justify={"center"}>
                            <Field label="Título" color={"#FFFFFF"}  fontSize={24} fontWeight={"bolder"}>
                                <Input w={360} h={9} bg={"#FFFFFF"} placeholder="Seu nome" size="xs" textDecoration={'none'} />
                            </Field>
                        </Stack>
                        <Stack gap={4} marginTop={2} justify={"center"}>
                            <Field label="Título" color={"#FFFFFF"}  fontSize={24} fontWeight={"bolder"}>
                                <Input w={360} h={9} bg={"#FFFFFF"} placeholder="Seu nome" size="xs" textDecoration={'none'} />
                            </Field>
                        </Stack>
                        <Stack gap={4} marginTop={2} justify={"center"}>
                            <Field label="Título" color={"#FFFFFF"}  fontSize={24} fontWeight={"bolder"}>
                                <Input w={360} h={9} bg={"#FFFFFF"} placeholder="Seu nome" size="xs" textDecoration={'none'} />
                            </Field>
                        </Stack>
                        <Stack gap={4} marginTop={2} justify={"center"}>
                            <Field label="Título" color={"#FFFFFF"}  fontSize={24} fontWeight={"bolder"}>
                                <Input w={360} h={9} bg={"#FFFFFF"} placeholder="Seu nome" size="xs" textDecoration={'none'} />
                            </Field>
                        </Stack>
                        <Stack gap={4} marginTop={2} justify={"center"}>
                            <Field label="Título" color={"#FFFFFF"}  fontSize={24} fontWeight={"bolder"}>
                                <Input w={360} h={9} bg={"#FFFFFF"} placeholder="Seu nome" size="xs" textDecoration={'none'} />
                            </Field>
                        </Stack>
                        <Flex justify={"center"} mt={4}>
                            <Button
                                w={150}
                                h={10}
                                fontSize={13}
                                colorScheme="blue"
                                bg="#0871FF"
                                color="white"
                                fontWeight="bold"
                                _hover={{ bg: 'blue.600' }}
                            >
                                Cadastrar-se
                            </Button>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
}
