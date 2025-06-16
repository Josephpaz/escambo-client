import {formatDate} from "@/helpers/formatters.helper";
// import {FavoriteService} from "@/service/favorite/index.service";
import {PostDomain} from "@/service/post/index.service";
import {Box, Card, Flex, Image, Text} from "@chakra-ui/react";
// import {useMutation} from "@tanstack/react-query";
import {
  // Heart,
  MapPin,
} from "lucide-react";

type CardPostProps = {
  post: PostDomain;
  onClick: () => void;
};

export function CardPost({post, onClick}: CardPostProps) {
  // const {mutateAsync: createFavorite} = useMutation({
  //   mutationFn: FavoriteService.create,
  // });

  // async function handleCreateFavorite() {
  //   const payload: FavoriteService.CreateProps = {
  //     postagem_id: post.id,
  //     user_id: "a175a1b6-1c8b-4b9c-a67f-1a939a97232e",
  //   };
  //   await createFavorite(payload);
  // }

  return (
    <Card.Root
      w="200px"
      h="358px"
      minW="200px"
      minH="340px"
      bg="#FFFFFF"
      border="none"
      onClick={onClick}
    >
      <Card.Header p={0} cursor={"pointer"}>
        {post?.imagens?.[0] && (
          <Image
            src={post.imagens[0]}
            boxSize="200px"
            objectFit="contain"
            borderTopRadius="10px"
          />
        )}
      </Card.Header>

      <Card.Body m={0} px="10px" cursor={"pointer"}>
        <Text color="#373E4B" w="170px" textAlign="start" fontWeight="bold">
          {post.titulo}
        </Text>
      </Card.Body>

      <Card.Footer>
        <Flex w="100%" justify="space-between" align="end">
          <Flex direction="column" gap={1.5}>
            <Flex gap="1" align="center" ml="-1">
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
            </Flex>
            <Text color="#373E4B" fontSize="12px">
              {formatDate(post.criacao_em)}
            </Text>
          </Flex>

          <Box
            onClick={(e) => {
              e.stopPropagation();
              // handleCreateFavorite();
            }}
            cursor="pointer"
          >
            {/* <Heart size={20} color="#373E4B" fill="#f56565" /> */}
          </Box>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
