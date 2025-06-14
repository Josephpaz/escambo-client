import {formatDate} from "@/helpers/formatters.helper";
import {PostDomain} from "@/service/post/index.service";
import {Box, Card, Image, Text} from "@chakra-ui/react";
import {Heart, MapPin} from "lucide-react";

type CardPostProps = {
  post: PostDomain;
  onClick: () => void;
};

export function CardPost({post, onClick}: CardPostProps) {
  return (
    <Card.Root
      // cursor={"pointer"}
      w={"200px"}
      h={"327px"}
      minW={"200px"}
      minH={"327px"}
      bg={"#FFFFFF"}
      border="none"
      onClick={onClick}
    >
      <Card.Header p={0}>
        <Image
          src={post?.imagens[0]}
          maxW={"200px"}
          maxHeight={"180px"}
          borderTopRadius={"10px"}
        />
      </Card.Header>
      <Card.Body m={0} px={"10px"}>
        <Text
          color="#373E4B"
          mt={2}
          w={"170px"}
          textAlign={"start"}
          fontWeight={"bold"}
        >
          {post.titulo}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"start"}
            gap={1.5}
          >
            <Box display="flex" gap="1" alignItems={"center"} marginLeft="-1">
              <MapPin size={20} color="#373E4B" />
              <Text
                fontSize="12px"
                color="#373E4B"
                maxW="6rem"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {post.cidade}, {post.estado}
              </Text>
            </Box>
            <Text color="#373E4B" fontSize={"12px"}>
              {formatDate(post.criacao_em)}
            </Text>
          </Box>
          <Box>
            <Heart size={20} color="#373E4B" />
          </Box>
        </Box>
      </Card.Footer>
    </Card.Root>
  );
}
