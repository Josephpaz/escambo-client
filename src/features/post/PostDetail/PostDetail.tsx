import { Box, Button, Card, Flex, Grid, HStack, Image, Portal, Text, VStack } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { X, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'
import './post-detail.css'
import { UploadImagem } from "@/components/ui/UploadImagem";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { SelectCustom } from "@/components/ui/select";
import { categorias } from "../CreatePost/CreatePost.page";
import { useQuery } from "@tanstack/react-query";
import { PostService } from "@/service/post/index.service";

const images = [
  "https://picsum.photos/200/120",
  "https://picsum.photos/201/120",
  "https://picsum.photos/202/120",
  // "https://picsum.photos/203/120",
  // "https://picsum.photos/204/120",
  // "https://picsum.photos/205/120",
  // "https://picsum.photos/206/120",
  // "https://picsum.photos/207/120",
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
        style={{ ...style, width: '30px', height: '30px' }}
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
        style={{ ...style, width: '30px', height: '30px' }}
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


  const { data } = useQuery({
    queryKey: ['postDetail'],
    queryFn: async () => {
      const id = '76390f3d-dd1e-450e-befc-45fdb5a076bf'
      return await PostService.getById(id);
    },

  });

  const postDetail = useMemo(() => {
    return data?.data
  }, [data])

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
            <Box ref={modalRef} maxW="4xl" w="full" maxH='80vh' maxWidth='80vw'
              px={12}
              pt={12}
              pb={4}
              bg="white" borderRadius="md" position='relative'>
              <Box position="absolute" top={5} left={4} zIndex={9999}>
                <Text color='#373E4B' fontWeight={700}>
                  {currentSlide + 1}/{images.length}
                </Text>
              </Box>
              <Box position="absolute" top={3} right={4} zIndex={9999}>
                <X onClick={closeModal} color="#373E4B" />
              </Box>
              <Slider ref={sliderRef} {...settings}>
                {images.map((src, idx) => (
                  <Box key={idx}>
                    <Image
                      src={src}
                      alt={`Image ${idx}`}
                      mx="auto"
                      w='50%'
                      h='50%'
                      maxH="40vh"
                      maxW='40vw'
                      objectFit="contain"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </Slider>

              <Box
                mt="2rem"
                overflowX="auto"
                whiteSpace="nowrap"
                display={'flex'}
                justifyContent={'center'}
                maxW="100%"
                mx='auto'
                p="2"
                css={{
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#CBD5E0',
                    borderRadius: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
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
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Flex>
        </Portal>
      )}

      <Flex
        wrap="wrap"
        gap="67px"
        padding="2rem"
        justify="center"
      >
        <Flex
          direction="column"
          flex="1 1 500px"
          minW="320px"
          maxW="850px"
        >
          {images.length === 1 && (
            <Box onClick={() => handleClick(0)} cursor="pointer" maxW="4xl" maxH="300px" h="100%">
              <Image
                src={images[0]}
                alt="Preview 0"
                h="100%"
                objectFit="cover"
                borderRadius="md"
                width="100%"
              />
            </Box>
          )}

          {images.length === 2 && (
            <Grid templateColumns="repeat(2, 1fr)" gap={2} mb="4" maxH="300px">
              {images.map((src, idx) => (
                <Box key={idx} onClick={() => handleClick(idx)} cursor="pointer" h="100%">
                  <Image
                    src={src}
                    alt={`Preview ${idx}`}
                    h="100%"
                    objectFit="cover"
                    borderRadius="md"
                    width="100%"
                  />
                </Box>
              ))}
            </Grid>
          )}

          {images.length === 3 && (
            <Grid templateColumns="2fr 1fr" gap={2} mb="4" maxH="300px" h="100%">
              <Box onClick={() => handleClick(0)} cursor="pointer" h="100%">
                <Image
                  src={images[0]}
                  alt="Main preview"
                  h="100%"
                  objectFit="cover"
                  borderRadius="md"
                  width="100%"
                />
              </Box>
              <Grid templateRows="repeat(2, 1fr)" gap={2} h="100%">
                {images.slice(1).map((src, idx) => (
                  <Box key={idx + 1} onClick={() => handleClick(idx + 1)} cursor="pointer">
                    <Image
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      h="100%"
                      objectFit="cover"
                      borderRadius="md"
                      width="100%"
                    />
                  </Box>
                ))}
              </Grid>
            </Grid>
          )}

          {images.length >= 4 && (
            <Grid templateColumns="2fr 3fr" gap={2} mb="4" maxH="300px">
              <Box onClick={() => handleClick(0)} cursor="pointer">
                <Image
                  src={images[0]}
                  alt="Preview 0"
                  h="272px"
                  objectFit="cover"
                  borderRadius="md"
                  width="100%"
                />
              </Box>

              <Grid
                templateColumns="1fr 1fr"
                templateRows="1fr 1fr"
                gap={2}
              >
                <Box onClick={() => handleClick(1)} cursor="pointer">
                  <Image
                    src={images[1]}
                    alt="Preview 1"
                    h="132px"
                    objectFit="cover"
                    borderRadius="md"
                    width="264px"
                  />
                </Box>
                <Box onClick={() => handleClick(2)} cursor="pointer">
                  <Image
                    src={images[2]}
                    alt="Preview 2"
                    h="132px"
                    objectFit="cover"
                    borderRadius="md"
                    width="264px"
                  />
                </Box>

                {/* Última imagem (img[3]) com overlay se houver mais */}
                <Box
                  gridColumn="1 / span 2"
                  position="relative"
                  onClick={() => handleClick(3)}
                  cursor="pointer"
                >
                  <Image
                    src={images[3]}
                    alt="Preview 3"
                    h="132px"
                    objectFit="cover"
                    borderRadius="md"
                    width="100%"
                  />
                  {images.length > 4 && (
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
                        +{images.length - 4}
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}

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

        <Flex
          direction="column"
          flex="1 1 350px"
          minW="280px"
          maxW="400px"
        >
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
                <UploadImagem onChangeBase64={(base64List) => { }} />
                <MoveRight size={24} color="#A0AEC0" />
                <Image
                  src={images[0]}
                  w="126px"
                  h="106px"
                  borderRadius="10px"
                />
              </HStack>

              <VStack gap="8px" width="100%">
                <Field label="Item a ser oferecido" color="#373E4B" mt="4">
                  <Input
                    placeholder="item"
                    size="xs"
                    borderColor="#E2E8F0"
                  />
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
        </Flex>
      </Flex>
    </>
  )
}