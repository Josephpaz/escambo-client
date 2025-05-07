import AvatarPng from '@/assets/Avatar.png';
import LogoPng from "@/assets/Logo.png";
import {
    AvatarFallback,
    AvatarImage,
    AvatarRoot,
    Box,
    Flex,
    HStack,
    Image,
    Link,
    Spacer,
    Stack,
    Text
} from "@chakra-ui/react";
import { CustomBreadcrumb } from './CustomBreadcrumb';

export function NavBar() {
    return (
        <Stack bg="#EFF1F4" minH="100vh">
            {/* Header */}
            <Box bg="#1DAF87" py={3} px={8} h='86px'>
                <Flex align="center">
                    <Link href='/' _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                        _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                        transition="all 0.2s ease">
                        <Image src={LogoPng} h={53} w={284} cursor={'pointer'} textDecoration={'none'} />
                    </Link>
                    <Spacer />
                    <HStack spaceX={20} mt={8}>
                        <Link href="/history" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize="lg" cursor="pointer">
                                Histórico
                            </Text>
                        </Link>
                        <Link href="/product" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize="lg" cursor="pointer">
                                Incluir Item
                            </Text>
                        </Link>
                        <Link href="/favorits" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize="lg" cursor="pointer">
                                Favoritos
                            </Text>
                        </Link>
                    </HStack>
                    <Spacer />
                    <HStack>
                        <AvatarRoot size={'xl'} cursor="pointer"
                            _hover={{ transform: "scale(0.95)", boxShadow: "lg" }}
                            _active={{ transform: "scale(0.95)", boxShadow: "md" }}
                            transition="all 0.2s ease">
                            <AvatarFallback name="Samuca" />
                            <AvatarImage src={AvatarPng} />
                        </AvatarRoot>
                    </HStack>
                    <Stack mr={18} alignItems="center" py={3} px={3}>
                        <Text color="white" fontWeight="bold" fontSize={14}>
                            Samuel Gomes
                        </Text>
                        <Text color="white" fontSize={12} mr={14} fontWeight="light">
                            Usuário
                        </Text>
                    </Stack>
                </Flex>
            </Box>
            <CustomBreadcrumb />
        </Stack>
    );
}
