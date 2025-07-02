import {UseSessionToken, UseSessionUser} from "@/zustand";
import {
  AvatarFallback,
  AvatarRoot,
  Button,
  HStack,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import {ChevronDown, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";

export function Avatar() {
  const navigate = useNavigate();
  const setToken = UseSessionToken((state) => state.setToken);
  const user = UseSessionUser((state) => state.user);

  return (
    <Stack>
      <HStack gap={4} key={"usuario.user"}>
        <AvatarRoot
          border={"1px solid white"}
          size="xl"
          cursor="pointer"
          _hover={{transform: "scale(1.05)"}}
          _active={{transform: "scale(0.95)"}}
          transition="all 0.2s ease"
        >
          <AvatarFallback name={user.nome} mb={-0.9} />
        </AvatarRoot>
        <Stack alignItems="center" py={3} gap={0} maxW="150px">
          <Text
            color="white"
            fontWeight="bold"
            fontSize={14}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="100%"
          >
            {user.nome}
          </Text>
        </Stack>

        <Menu.Root positioning={{placement: "bottom-start"}}>
          <Menu.Trigger asChild>
            <Button color="white" borderRadius={"full"} p={1}>
              <ChevronDown size={25} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                bg={"white"}
                p={4}
                gap={"10px"}
                display={"flex"}
                flexDir={"column"}
              >
                <Menu.Item
                  value="edit-post"
                  _hover={{bg: "gray.200"}}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/");
                    setToken({token: null});
                  }}
                >
                  <LogOut size={15} color="#373E4B" />
                  <Text color="#373E4B" fontSize="12px">
                    Sair
                  </Text>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </Stack>
  );
}
