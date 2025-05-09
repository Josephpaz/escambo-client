
import LogoPng from '@/assets/Logo.png';
import {
    Box,
    Flex,
    HStack,
    Image,
    Link,
    Spacer,
    Stack,
    Text
} from "@chakra-ui/react";
import { Avatar } from './Avatar';
import { CustomBreadcrumb } from './CustomBreadcrumb';

export function NavBar() {
    return (
        <Stack bg="#EFF1F4">
            {/* Header */}
            <Box bg="#1DAF87" py={3} px={8} h='86px'>
                <Flex align="center">
                    <Link href='/' _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                        _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                        transition="all 0.2s ease">
                        <Image src={LogoPng} h={53} w={284} cursor={'pointer'} textDecoration={'none'} />
                    </Link>
                    <Spacer />
                    <HStack spaceX={20} mt={8} alignItems={'center'} textAlign={'center'}>
                        <Link href="/history" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
                                Histórico
                            </Text>
                        </Link>
                        <Link href="/product" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
                                Incluir Item
                            </Text>
                        </Link>
                        <Link href="/favorits" textDecoration="none" _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                            _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                            transition="all 0.2s ease">
                            <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
                                Favoritos
                            </Text>
                        </Link>
                    </HStack>
                    <Spacer />
                    <Avatar/>
                </Flex>
            </Box>
            <CustomBreadcrumb />

        </Stack>
    );
}