import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import "./post-detail.css";
import { useQuery } from "@tanstack/react-query";
import { PostService } from "@/service/post/index.service";
import { PostImages } from "./PostImages";
import { PostImagesCarouselModal } from "./PostImagesCarouselModal";
import { PostItemTrade } from "./PostItemTrade";

const images = [
  "https://picsum.photos/200/120",
  "https://picsum.photos/201/120",
  "https://picsum.photos/202/120",
  "https://picsum.photos/203/120",
  "https://picsum.photos/204/120",
  "https://picsum.photos/205/120",
  "https://picsum.photos/206/120",
  "https://picsum.photos/207/120",
];

export function PostDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data } = useQuery({
    queryKey: ["postDetail"],
    queryFn: async () => {
      const id = "76390f3d-dd1e-450e-befc-45fdb5a076bf";
      return await PostService.getById(id);
    },
  });

  const postDetail = useMemo(() => {
    return data?.data;
  }, [data]);


  function handleClick(idx: number) {
    setCurrentSlide(idx);
    setIsOpen(true);
  }

  return (
    <>
      {isOpen && (
        <PostImagesCarouselModal
          onClose={() => setIsOpen(false)}
          images={images}
          currentOuterSlide={currentSlide}
        />
      )}
      <Flex wrap="wrap" gap="67px" padding="2rem" justify="center">
        <Flex direction="column" flex="1 1 500px" minW="320px" maxW="850px">
          <PostImages images={images} handleClick={handleClick} />
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

        <PostItemTrade image={images[0]} />
      </Flex>
    </>
  );
}
