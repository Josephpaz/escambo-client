import { Box, Button, Flex, Portal, Text } from "@chakra-ui/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function CustomModal({ isOpen, onClose, message }: CustomModalProps) {
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
          maxW="400px"
          w="full"
        >
          <Text mb={4} fontSize="lg" fontWeight="bold">
            {message}
          </Text>

          <Flex justify="flex-end">
            <Button onClick={onClose} colorScheme="green">
              OK
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Portal>
  );
}
