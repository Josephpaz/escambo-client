import { Box, Flex, Grid, HStack, Image, Portal, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './post-detail.css'

const images = [
  "https://picsum.photos/200",
  "https://picsum.photos/201",
  "https://picsum.photos/202",
  "https://picsum.photos/203",
  "https://picsum.photos/204",
  "https://picsum.photos/205",
  "https://picsum.photos/206",
  "https://picsum.photos/207",
  "https://picsum.photos/208",
];

export function PostDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalRef = useRef(null);
  const sliderRef = useRef<Slider>(null);


  function SampleNextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <ChevronRight
        color="#373E4B"
        onClick={onClick}
        className={className}
        style={{...style, width: '30px', height: '30px'}}
      />
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <ChevronLeft
        color="#373E4B"
        onClick={onClick}
        className={className}
        style={{...style, width: '30px', height: '30px'}}
      />
    );
  }


  const handleClick = (index: number) => {
    setCurrentSlide(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

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

  console.log(sliderRef.current)

  return (
    <>
      {isOpen && (
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
            <Box ref={modalRef} maxW="4xl" w="full" h="full" maxH='xl' p={12} bg="white" borderRadius="md" position='relative'>
              <Box position="absolute" top={3} right={4} zIndex={9999}>
                <X onClick={closeModal} color="#373E4B" />
              </Box>
              <Slider ref={sliderRef} {...settings} >
                {images.map((src, idx) => (
                  <Box key={idx}>
                    <Image
                      src={src}
                      alt={`Image ${idx}`}
                      mx="auto"
                      w='50%'
                      h='50%'
                      maxH="80vh"
                      maxW='80vw'
                      objectFit="contain"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </Slider>

              <HStack overflowX='auto'>
                {images.map((src, idx) => (
                  <Box
                    key={idx}
                    width="100px"
                    height="100px"
                    borderRadius="md"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => sliderRef.current?.slickGoTo(idx)}
                    opacity={idx === currentSlide ? 1 : 0.4}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${idx}`}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </HStack>
            </Box>
          </Flex>
        </Portal>
      )}

      <Flex wrap={'wrap'} gap={'67px'} padding={'2rem'}>
        <Flex flexDirection={'column'} width='600px'>
          <Grid templateColumns="2fr 2fr" gap={2} mb='4'>

            {/* Main image on the left */}
            <Box onClick={() => handleClick(0)} cursor="pointer">
              <Image src={images[0]} alt="Main preview" height="100%" objectFit="cover" borderRadius="md" />
            </Box>

            {/* 2x2 grid on the right */}
            <Grid templateColumns="1fr 1fr" gap={2} height="100%">
              {images.slice(1, 5).map((src, idx) => {
                const imageIndex = idx + 1;
                const isLast = imageIndex === 4 && images.length > 5;
                return (
                  <Box key={imageIndex} position="relative" onClick={() => handleClick(imageIndex)} cursor="pointer">
                    <Image src={src} alt={`Preview ${imageIndex}`} height="100%" objectFit="cover" borderRadius="md" />
                    {isLast && (
                      <Flex
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="blackAlpha.600"
                        align="center"
                        justify="center"
                        borderRadius="md"
                      >
                        <Text color="white" fontSize="xl" fontWeight="bold">
                          +{images.length - 5}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </Grid>

          </Grid>
          <Box alignItems={'start'}>
            <Text textStyle={"3xl"} color="#373E4B" fontWeight={"700"} >
              Título
            </Text>
            <Text textStyle={"2xl"} color="#373E4B" mt='2' fontWeight={"400"}>
              Categoria
            </Text>
            <Text textStyle={"md"} color="#373E4B" fontWeight={"400"} textAlign={'justify'}>
              Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.
              O Lorem Ipsum tem sido a simulação de texto padrão da indústria tipográfica e de impressos desde o século XVI,
              quando um impressor desconhecido pegou uma galera de tipos e os embaralhou para criar um livro de espécimes de tipos.
              Ele sobreviveu não apenas a cinco séculos
            </Text>
          </Box>
        </Flex>
        {/* <Flex flexDirection={'column'} width='400px' >
          <Card.Root bg={'white'} borderRadius={'8px'} borderColor={'white'}>
            <Card.Header borderBottom={'1px solid #A0AEC0'} padding={'16px'}>
              <Text textStyle={"2xl"} color="#373E4B" fontWeight={"700"} >
                Item Oferecido
              </Text>
            </Card.Header>
            <Card.Body />
            <Card.Footer />
          </Card.Root>
        </Flex> */}
      </Flex>
    </>
  )
}