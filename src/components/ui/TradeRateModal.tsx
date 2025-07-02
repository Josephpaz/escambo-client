import {
  Box,
  Button,
  Flex,
  IconButton,
  Portal,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {Star} from "lucide-react";
import {useState} from "react";
import {toaster} from "./toaster";

interface TradeRatingModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export function TradeRatingModal({
  isOpen,
  onClose,
  onSubmit,
}: TradeRatingModal) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
    onClose();
    toaster.create({
      title: "Avaliação enviada com sucesso!",
      type: "success",
    });
  };

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
        >
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

          <Text mb={2} fontSize="18px" fontWeight="bolder" color="#2D3748">
            Como você avalia o usuário e a troca realizada?
          </Text>

          <Flex mb={4} gap={1} justifyContent={"center"}>
            {[1, 2, 3, 4, 5].map((i) => (
              <IconButton
                key={i}
                aria-label={`Avaliar com ${i} estrela(s)`}
                onClick={() => handleClick(i)}
                variant="ghost"
              >
                <Star
                  fill={i <= rating ? "#ECC94B" : "none"}
                  stroke="#ECC94B"
                />
              </IconButton>
            ))}
          </Flex>

          <Textarea
            placeholder="Deixe um comentário sobre a troca..."
            value={comment}
            bg="white"
            color="#373E4B"
            onChange={(e) => setComment(e.target.value)}
            mb={4}
            fontSize="sm"
          />

          <Flex justify="flex-end" gap={4}>
            <Button
              onClick={onClose}
              bg="gray.400"
              color="white"
              fontWeight="bold"
              size="sm"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              bg="#1DAF87"
              color="white"
              fontWeight="bold"
              size="sm"
              disabled={rating === 0}
            >
              Enviar
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Portal>
  );
}
