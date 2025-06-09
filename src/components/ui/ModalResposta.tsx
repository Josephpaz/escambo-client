import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface ModalRespostaBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onResposta: (resposta: "aceita" | "recusada") => void;
    isLoading?: boolean;
}

export function ModalResposta({
    isOpen,
    onClose,
    onResposta,
    isLoading = false,
}: ModalRespostaBoxProps) {
    if (!isOpen) return null;

    const handleResposta = (resposta: "aceita" | "recusada") => {
        onResposta(resposta);
        onClose();
    };

    return (
        <Box
            role="dialog"
            aria-modal="true"
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.4)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="lg"
                maxW="400px"
                w="100%"
                position="relative"
            >
                <Flex mb={4} alignItems="center" justifyContent="space-between">
                    <Text fontSize={14} fontWeight="bold" mb={5} color={"#2D3748"}>
                        Resposta da Proposta de Troca
                    </Text>

                    <Button
                        position="absolute"
                        top={3}
                        right={3}
                        size="sm"
                        variant="ghost"
                        onClick={onClose}
                        aria-label="Fechar"
                        minW="auto"
                        p={1}
                        h="auto"
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M6 6L14 14M6 14L14 6"
                                stroke="#4A5568"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </Button>
                </Flex>

                <Flex direction="column" alignItems="center" padding={4}>
                    <Text mb={8} fontSize={15} color="#4A4F59">
                        Desejas <strong>aceitar</strong> ou <strong>recusar</strong> a troca?
                    </Text>

                    <Box display="flex" justifyContent="center" gap={4} mt={3}>
                        <Button
                            size="md"
                            bg="#1DAF87"
                            color="white"
                            _hover={{ bg: "#17a178" }}
                            mr={10}
                            onClick={() => handleResposta("aceita")}
                            disabled={isLoading}
                        >
                            Aceitar
                        </Button>
                        <Button
                            size="md"
                            bg="#F94649"
                            color="white"
                            _hover={{ bg: "#e43b3d" }}
                            onClick={() => handleResposta("recusada")}
                            disabled={isLoading}
                        >
                            Recusar
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
