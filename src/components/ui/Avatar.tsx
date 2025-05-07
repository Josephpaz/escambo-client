import { AvatarFallback, AvatarImage, AvatarRoot, HStack, Stack, Text } from "@chakra-ui/react"

export function Avatar() {
    return (
        <Stack>
            {users.map((usuario) => (
                <HStack gap={4} key={usuario.user}>
                    <AvatarRoot size={'xl'} cursor="pointer"
                        _hover={{ color: "#CFFCEE", transform: "scale(1.05)" }}
                        _active={{ color: "#A0EACB", transform: "scale(0.95)" }}
                        transition="all 0.2s ease">
                        <AvatarFallback name={usuario.name} />
                        <AvatarImage src={usuario.avatar} />
                    </AvatarRoot>

                    <Stack mr={18} alignItems="center" py={3} gap={0}>
                        <Text color="white" fontWeight={'bold'} fontSize={14}>
                            {usuario.name}
                        </Text>
                        <Text color="white" textStyle={'sm'} fontWeight={'lighter'} mt={1}>
                            {usuario.user}
                        </Text>
                    </Stack>
                </HStack>
                ))}
        </Stack>
    )
}

const users = [
    {
        id: "1",
        name: "Samuel Monteiro",
        user: "Usuario",
        avatar: AvatarPng,
    },
    
]

import AvatarPng from '@/assets/Avatar.png'
