import {useOutsideClick} from "@/hooks/useOutsideClick.hook";
import {Box, Flex, Image, Portal, Text} from "@chakra-ui/react";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import {useRef, useState} from "react";
import Slider, {CustomArrowProps, Settings} from "react-slick";

type PostImagesCarouselProps = {
  images: string[];
  currentOuterSlide: number;
  onClose: () => void;
};

function SampleNextArrow(props: CustomArrowProps) {
  const {className, style, onClick} = props;
  return (
    <ChevronRight
      color="#373E4B"
      onClick={onClick}
      className={className}
      style={{...style, width: "30px", height: "30px"}}
    />
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const {className, style, onClick} = props;
  return (
    <ChevronLeft
      color="#373E4B"
      onClick={onClick}
      className={className}
      style={{...style, width: "30px", height: "30px"}}
    />
  );
}

export function PostImagesCarouselModal({
  images,
  currentOuterSlide,
  onClose,
}: PostImagesCarouselProps) {
  const modalRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(currentOuterSlide);
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    afterChange: (current: number) => setCurrentSlide(current),
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  useOutsideClick(modalRef, onClose);

  return (
    <Portal>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.800"
        align="center"
        justify="center"
        zIndex={1400}
      >
        <Box
          ref={modalRef}
          maxW="4xl"
          w="full"
          maxH="80vh"
          maxWidth="80vw"
          px={12}
          pt={12}
          pb={4}
          bg="white"
          borderRadius="md"
          position="relative"
        >
          <Box position="absolute" top={5} left={4} zIndex={9999}>
            <Text color="#373E4B" fontWeight={700}>
              {currentSlide + 1}/{images.length}
            </Text>
          </Box>
          <Box position="absolute" top={3} right={4} zIndex={9999}>
            <X onClick={onClose} color="#373E4B" cursor={"pointer"} />
          </Box>
          {images.length > 1 ? (
            <Slider ref={sliderRef} {...settings}>
              {images.map((src, idx) => (
                <Box key={idx}>
                  <Image
                    src={src}
                    alt={`Image ${idx}`}
                    mx="auto"
                    boxSize={"200px"}
                    maxH="40vh"
                    maxW="40vw"
                    objectFit="contain"
                    borderRadius="md"
                  />
                </Box>
              ))}
            </Slider>
          ) : (
            <Image
              src={images[0]}
              alt={`Image solo`}
              mx="auto"
              boxSize={"200px"}
              maxH="40vh"
              maxW="40vw"
              objectFit="contain"
              borderRadius="md"
            />
          )}
          <Box
            mt="2rem"
            overflowX="auto"
            whiteSpace="nowrap"
            display={"flex"}
            justifyContent={"center"}
            maxW="100%"
            mx="auto"
            p="2"
            css={{
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#CBD5E0",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
            }}
          >
            {images.map((src, idx) => (
              <Box
                key={idx}
                as="span"
                display="inline-block"
                width="100px"
                height="100px"
                mr={2}
                borderRadius="md"
                overflow="hidden"
                cursor="pointer"
                onClick={() => sliderRef.current?.slickGoTo(idx)}
                opacity={idx === currentSlide ? 1 : 0.4}
                flexShrink={0}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx}`}
                  objectFit="cover"
                  borderRadius="md"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </Portal>
  );
}
