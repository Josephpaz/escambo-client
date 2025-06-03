import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SelectCustom } from "@/components/ui/select";
import { UploadImagem } from "@/components/ui/UploadImagem";
import { Button, Card, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MoveRight } from "lucide-react";
import { categorias } from "../CreatePost/CreatePost.page";

type PostItemTradeProps = {
  image: string;
}

export function PostItemTrade( { image }: PostItemTradeProps) {
  return <Flex direction="column" flex="1 1 350px" minW="280px" maxW="400px">
    <Card.Root bg="white" borderRadius="8px" borderColor="white">
      <Card.Header borderBottom="1px solid #A0AEC0" padding="16px">
        <Text textStyle="2xl" color="#373E4B" textAlign="center">
          Item Oferecido
        </Text>
      </Card.Header>
      <Card.Body
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <HStack margin={0} justifyContent="center" gap="18px">
          <UploadImagem onChangeBase64={(_) => { }} />
          <MoveRight size={24} color="#A0AEC0" />
          <Image
            src={image}
            w="126px"
            h="106px"
            borderRadius="10px"
          />
        </HStack>

        <VStack gap="8px" width="100%">
          <Field label="Item a ser oferecido" color="#373E4B" mt="4">
            <Input placeholder="item" size="xs" borderColor="#E2E8F0" />
          </Field>

          <SelectCustom
            label="Categoria"
            placeholder="Selecione a categoria"
            options={categorias}
            borderColor="#E2E8F0"
            color="#373E4B"
            size="xs"
            isClearable
          />
        </VStack>

        <Button
          mt="30px"
          colorPalette="blue"
          fontSize="sm"
          width="230px"
          type="submit"
          fontWeight="700"
        >
          Propor Troca
        </Button>
      </Card.Body>
    </Card.Root>
  </Flex>;
}