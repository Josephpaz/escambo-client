import {Box, Flex, Text} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import "./post-detail.css";
import {useQuery} from "@tanstack/react-query";
import {PostService} from "@/service/post/index.service";
import {PostImages} from "./PostImages";
import {PostImagesCarouselModal} from "./PostImagesCarouselModal";
import {PostItemTrade} from "./PostItemTrade";
import {useParams} from "react-router-dom";
import {UserService} from "@/service/user/index.service";

export function PostDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {id: postId} = useParams<{id: string}>();

  const {
    data: postDetailResponse,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      return await PostService.getById(postId!);
    },
    enabled: !!postId, // prevent fetch if postId is undefined
  });

  const postDetail = useMemo(() => {
    return postDetailResponse?.data;
  }, [postDetailResponse]);

  const {data: postUserDetailResponse} = useQuery({
    queryKey: ["postUserDetail", postDetail?.user_id],
    queryFn: async () => {
      return await UserService.getById(postDetail!.user_id);
    },
    enabled: !!postDetail?.user_id, // only runs when postDetail is loaded
  });

  const postUserDetail = useMemo(() => {
    return postUserDetailResponse?.data;
  }, [postUserDetailResponse]);

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
            <Text textStyle="3xl" color="#373E4B" fontWeight="700">
              {postDetail?.titulo}
            </Text>
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
