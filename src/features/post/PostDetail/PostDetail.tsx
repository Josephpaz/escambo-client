import {Box, Flex, Text} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import "./post-detail.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import {PostService} from "@/service/post/index.service";
import {PostImages} from "./PostImages";
import {PostImagesCarouselModal} from "./PostImagesCarouselModal";
import {PostItemTrade} from "./PostItemTrade";
import {useParams} from "react-router-dom";
import {UserService} from "@/service/user/index.service";
import {Heart, ToggleLeft} from "lucide-react";
import {FavoriteService} from "@/service/favorite/index.service";
import {toaster, Toaster} from "@/components/ui/toaster";

export function PostDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleHeart, setToggleHeart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {id: postId} = useParams<{id: string}>();

  const {data: postDetailResponse, isLoading} = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      return await PostService.getById(postId!);
    },
    enabled: !!postId,
  });

  const postDetail = useMemo(() => {
    return postDetailResponse?.data;
  }, [postDetailResponse]);

  const {data: postUserDetailResponse} = useQuery({
    queryKey: ["postUserDetail", postDetail?.user_id],
    queryFn: async () => {
      return await UserService.getById(postDetail!.user_id);
    },
    enabled: !!postDetail?.user_id,
  });

  const postUserDetail = useMemo(() => {
    return postUserDetailResponse?.data;
  }, [postUserDetailResponse]);

  console.log(postDetail?.imagens);

  const {mutateAsync: createFavorite} = useMutation({
    mutationFn: FavoriteService.create,
    onSuccess: () => {
      setToggleHeart(true);
      toaster.create({
        title: "Post favoritado com sucesso!",
        type: "success",
        duration: 3000,
      });
    },
    onError: () => {
      toaster.create({
        title: "Erro ao favoritar post!",
        type: "error",
        duration: 3000,
      });
    },
  });

  const {mutateAsync: deleteFavorite} = useMutation({
    mutationFn: FavoriteService.delete,
    onSuccess: () => {
      setToggleHeart(false);
      toaster.create({
        title: "Post desfavoritado com sucesso!",
        type: "success",
        duration: 3000,
      });
    },
    onError: () => {
      toaster.create({
        title: "Erro ao desfavoritar post!",
        type: "error",
        duration: 3000,
      });
    },
  });

  async function handleCreateFavorite() {
    if (postId) {
      if (!toggleHeart) {
        const payload: FavoriteService.CreateProps = {
          postagem_id: postId,
          user_id: "a175a1b6-1c8b-4b9c-a67f-1a939a97232e",
        };
        await createFavorite(payload);
      }

      if (toggleHeart) {
        const payload: FavoriteService.CreateProps = {
          postagem_id: postId,
          user_id: "a175a1b6-1c8b-4b9c-a67f-1a939a97232e",
        };
        await deleteFavorite(payload);
      }
    }
  }

  function handleClick(idx: number) {
    setCurrentSlide(idx);
    setIsOpen(true);
  }

  if (isLoading) return;

  return (
    <>
      {isOpen && (
        <PostImagesCarouselModal
          onClose={() => setIsOpen(false)}
          images={postDetail?.imagens || []}
          currentOuterSlide={currentSlide}
        />
      )}
      <Flex wrap="wrap" gap="67px" padding="2rem" justify="center">
        <Flex direction="column" flex="1 1 500px" minW="320px" maxW="850px">
          <PostImages
            images={postDetail?.imagens || []}
            handleClick={handleClick}
          />
          <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text textStyle="3xl" color="#373E4B" fontWeight="700">
                {postDetail?.titulo}
              </Text>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateFavorite();
                }}
                cursor="pointer"
              >
                <Heart
                  size={30}
                  color={`${toggleHeart ? "#f56565" : "#373E4B"}`}
                  fill={`${toggleHeart ? "#f56565" : "none"}`}
                />
              </Box>
            </Flex>
            <Text textStyle="2xl" color="#373E4B" mt="2" fontWeight="400">
              {postDetail?.categoria}
            </Text>
            <Text
              textStyle="md"
              color="#373E4B"
              fontWeight="400"
              textAlign="justify"
            >
              {postDetail?.descricao}
            </Text>
          </Box>
        </Flex>

        <PostItemTrade
          post={postDetail}
          postId={postId!}
          userPhone={postUserDetail?.telefone || ""}
        />
      </Flex>
    </>
  );
}
