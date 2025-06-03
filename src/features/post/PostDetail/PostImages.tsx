import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

type PostImagesProps = {
  images: string[];
  handleClick: (idx: number) => void
}

export function PostImages({ images, handleClick }: PostImagesProps) {
  return <>
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
  </>
}