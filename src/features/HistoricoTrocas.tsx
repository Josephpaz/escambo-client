import { NavBar } from "@/components/ui/Navbar";
import { Stack } from "@chakra-ui/react";

/*interface ItemTroca {
  nome: string;
  categoria: string;
  usuario: string;
  imagem: string;
}

interface Troca {
  id: number;
  enviado: ItemTroca;
  recebido: ItemTroca;
  status: "ACEITA" | "RECUSADA";
}

type CardTrocaProps = {
  troca: Troca
}

// Dados de exemplo
const trocas: Troca[] = [
  {
    id: 1,
    enviado: {
      nome: "Geladeira",
      categoria: "Eletrodomésticos",
      usuario: "Samuel Gomes",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    recebido: {
      nome: "Fogão",
      categoria: "Eletrodomésticos",
      usuario: "Márcio Arruda",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    status: "ACEITA",
  },
  {
    id: 2,
    enviado: {
      nome: "Geladeira",
      categoria: "Eletrodomésticos",
      usuario: "Samuel Gomes",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    recebido: {
      nome: "Fogão",
      categoria: "Eletrodomésticos",
      usuario: "Márcio Arruda",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
    status: "RECUSADA",
  },
];

// Card de troca fiel ao design
function CardTroca({ troca }: CardTrocaProps) {
  return (
    <Flex
      bg="#E3E3E3"
      borderRadius="20px"
      p={6}
      mb={8}
      align="center"
      justify="space-between"
      maxW="1200px"
      mx="auto"
      boxShadow="none"
    >
      <HStack spaceX={4} flex={1}>
        <Image
          src={troca.enviado.imagem}
          alt={troca.enviado.nome}
          boxSize="90px"
          borderRadius="md"
          objectFit="cover"
        />
        <Box>
          <Text fontWeight="bold" fontSize="1.6rem" color="#333" mb={1}>
            {troca.enviado.nome}
          </Text>
          <Text color="#6A6A6A" fontSize="1.1rem" mb={1}>
            {troca.enviado.categoria}
          </Text>
          <Text color="#A0A0A0" fontSize="1rem">
            {troca.enviado.usuario}
          </Text>
        </Box>
      </HStack>
      <HStack spaceX={4} flex={1} justify="flex-end">
        <Image
          src={troca.recebido.imagem}
          alt={troca.recebido.nome}
          boxSize="90px"
          borderRadius="md"
          objectFit="cover"
        />
        <Box>
          <Text fontWeight="bold" fontSize="1.6rem" color="#333" mb={1}>
            {troca.recebido.nome}
          </Text>
          <Text color="#6A6A6A" fontSize="1.1rem" mb={1}>
            {troca.recebido.categoria}
          </Text>
          <Text color="#D3D3D3" fontSize="1rem">
            {troca.recebido.usuario}
          </Text>
        </Box>
      </HStack>
      <Badge
        ml={6}
        bg={troca.status === "ACEITA" ? "#22B573" : "#E74C3C"}
        color="white"
        fontWeight="bold"
        fontSize="1rem"
        px={5}
        py={2}
        borderRadius="6px"
        minW="110px"
        textAlign="center"
      >
        {troca.status}
      </Badge>
    </Flex>
  );
}*/

export function HistoricoTrocas() {
  return (
    <Stack>
      <NavBar />
    </Stack>
  );
}
