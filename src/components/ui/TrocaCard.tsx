import {
  Badge,
  Box,
  HStack,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa6";

interface Produto {
  nome: string;
  descricao: string;
  categoria: string;
  usuario: string;
  imagem: string;
}

interface TrocaCardProps {
  produto1: Produto;
  produto2: Produto;
  status: string;
}

export function TrocaCard({ produto1, produto2, status }: TrocaCardProps) {
  return (
    <Box
      p={4}
      borderRadius="md"
      bg={'#D9D9D9'}
      alignItems={'center'}
      textAlign={'center'}
      w="1205px"
      h={'130px'}
      mt={5}
      mx="auto"
    >
      <HStack p={2} justifyContent={'space-between'} display={'flex'} alignItems={'center'}>
        <HStack>
          <Image
            src={produto1.imagem}
            alt={produto1.nome}
            w={135}
            h={91}
            borderRadius="md"
            objectFit="cover"
          />
          <VStack align="start" spaceX={0} ml={2}>
            <Text color={'#373E4B'} fontWeight={'bold'} fontSize={18}>{produto1.nome}</Text>
            <Text fontSize={15} color={'#373E4B'} fontWeight={'light'}>
              {produto1.categoria}
            </Text>
            <Text fontSize={12} color={'#373E4B'} fontWeight={'extralight'}>
              {produto1.descricao}
            </Text>
            <Text fontSize={10} color={'#373E4B'} fontWeight={'extralight'}>
              {produto1.usuario}
            </Text>
          </VStack>
        </HStack>
        <FaArrowRight size={50} color="#A0AEC0" />
        <HStack ml={15}>
          <Image
            src={produto2.imagem}
            alt={produto2.nome}
            w={135}
            h={91}
            borderRadius="md"
            objectFit="cover"
          />
          <VStack align="start" spaceX={0} ml={2}>
            <Text color={'#373E4B'} fontWeight={'bold'} fontSize={18}>{produto2.nome}</Text>
            <Text fontSize={15} color={'#373E4B'}>
              {produto2.categoria}
            </Text>
            <Text fontSize={12} color={'#373E4B'} fontWeight={'extralight'}>
              {produto2.descricao}
            </Text>
            <Text fontSize={10} color={'#373E4B'} fontWeight={'extralight'} >
              {produto2.usuario}
            </Text>
          </VStack>
        </HStack>


        <Badge
          mr={12}
          fontWeight={'extrabold'}
          w={84}
          h={31}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={'white'}
          bg={
            status === "ACEITA"
              ? "#38A169"
              : status === "RECUSADA"
                ? "#F94649"
                : "#BF8528"
          }
        >
          {status.toUpperCase()}
        </Badge>
      </HStack>
    </Box>
  );
}
