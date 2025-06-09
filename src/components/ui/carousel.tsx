import {useRef} from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {BiLeftArrowAlt, BiRightArrowAlt} from "react-icons/bi";

type CarouselProps = {
  imgs: string[];
};
export function Carousel({imgs}: CarouselProps) {
  const slider = useRef<Slider>(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const top = useBreakpointValue({base: "90%", md: "50%"});
  const side = useBreakpointValue({base: "30%", md: "10px"});

  return (
    <Box position="relative" height="400px" width="full" overflow="hidden">
      {/* Left Arrow */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider.current?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider.current?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={slider}>
        {imgs.map((url, index) => (
          <Box key={index} height="400px" position="relative">
            <Image
              src={url}
              alt={`Slide ${index + 1}`}
              objectFit="cover"
              width="100%"
              height="100%"
            />
            <Text
              position={"absolute"}
              color={"red"}
              left="50%"
              transform="translate(-50%, -50%)"
              bottom="2px"
            >
              {index + 1}/{imgs.length}
            </Text>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
