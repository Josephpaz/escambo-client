import { Box, Button, Flex, Portal, Text } from "@chakra-ui/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  isError?: boolean;
}

export function CustomModal({ isOpen, onClose, title, message, isError = false}: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.4)"
        zIndex={9999}
        align="center"
        justify="center"
      >
        <Box
          bg="white"
          borderRadius="md"
          p={6}
          boxShadow="lg"
          maxW="420px"
          w="full"
          position="relative"
          borderWidth="2px"
          borderColor={isError ? "#F94649" : "transparent"}
        >
          {/* Botão de fechar (ícone X) */}
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
            {/* Ícone SVG do X */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 6L14 14M6 14L14 6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Button>

          <Text mb={2} fontSize={"18px"} fontWeight="bolder" color="#2D3748" >
            {title}
          </Text>
          <Text mb={6} mt={7} fontSize={"16px"} color="#2D3748" >
            {message}
          </Text>
          <Flex justify="flex-end">
            <Button onClick={onClose} bg={isError ? "#F94649" : "#1DAF87" } color={"white"} fontWeight={"bold"} size={"sm"}>
              Fechar
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Portal>
  );
}
