import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import {PostDomain, PostService} from "@/service/post/index.service";
import {EllipsisVertical, MapPin, SquarePen, Trash2} from "lucide-react";
import {formatDate} from "@/helpers/formatters.helper";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toaster} from "@/components/ui/toaster";
import {PageLoader} from "@/components/ui/PageLoader";

type CardPostProps = {
  post: PostDomain;
  onClick: () => void;
};

export function CardPostDetails({post, onClick}: CardPostProps) {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(["postUserList"]);
  const isPostsLoading = queryState?.status === "pending";

  const {mutate: deletePost, isPending: isDeleting} = useMutation({
    mutationFn: (postId: string) => PostService.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["postUserList"]});
      toaster.create({
        title: "Postagem deletada com sucesso",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Erro ao deletar a postagem",
        type: "error",
      });
    },
  });

  if (isDeleting || isPostsLoading) return <PageLoader />;

  return (
    <Flex
      flexWrap={"wrap"}
      gap={"1.5rem"}
      flex="1"
      bg={"white"}
      px={4}
      py={6}
      borderRadius={"10px"}
      onClick={onClick}
    >
      <Image
        src={post.imagens[0]}
        minW={"200px"}
        maxW={"200px"}
        minH={"180px"}
        maxH={"180px"}
        objectFit="cover"
        borderRadius="10px"
      />
      <Flex justifyContent={"space-between"} flex="1" gap="2rem">
        <Flex flexDir={"column"}>
          <Flex flexDir={"column"} flex="1" gap={"10px"}>
            <Text fontSize={"24px"} fontWeight={"bold"} color={"#373E4B"}>
              {post.titulo}
            </Text>
            <Text
              fontSize="16px"
              fontWeight="bold"
              color="#373E4B"
              textAlign="justify"
              css={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.descricao}
            </Text>
          </Flex>
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
        </Flex>

        <Flex flexDir={"column"} onClick={(e) => e.stopPropagation()}>
          <Menu.Root positioning={{placement: "left-start"}}>
            <Menu.Trigger asChild>
              <Button
                color="#373E4B"
                borderRadius={"full"}
                border={"1px solid #373E4B"}
                p={1}
              >
                <EllipsisVertical size={25} />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg={"white"}
                  p={4}
                  gap={"10px"}
                  display={"flex"}
                  flexDir={"column"}
                >
                  <Menu.Item
                    value="edit-post"
                    _hover={{bg: "gray.200"}}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SquarePen size={15} color="#373E4B" />
                    <Text color="#373E4B" fontSize="12px">
                      Editar Postagem
                    </Text>
                  </Menu.Item>
                  <Menu.Item
                    value="delete-post"
                    _hover={{bg: "gray.200"}}
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                    }}
                  >
                    <Trash2 size={15} color="#373E4B" />
                    <Text color="#373E4B" fontSize="12px">
                      Deletar Postagem
                    </Text>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </Flex>
    </Flex>
  );
}
