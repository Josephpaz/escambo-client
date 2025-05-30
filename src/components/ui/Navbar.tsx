import LogoPng from '@/assets/imgs/Logomarca.png';
import {Box, Flex, Image, Link, LinkProps, Stack, Text} from "@chakra-ui/react";
import {Avatar} from "./Avatar";
import {CustomBreadcrumb} from "./CustomBreadcrumb";
import {ReactNode} from "react";

type RenderLinkProps = LinkProps;
type ChildrenLinks = {
  children: ReactNode;
  href: string;
};

export function RenderLink(props: RenderLinkProps) {
  const {children} = props;
  return (
    <Link
      _active={{color: "#A0EACB", transform: "scale(0.95)"}}
      _hover={{color: "#CFFCEE", transform: "scale(1.05)"}}
      transition="all 0.2s ease"
      {...props}
    >
      {children}
    </Link>
  );
}

const childrenLinks: ChildrenLinks[] = [
  {
    href: "history",
    children: (
      <Text
        color="white"
        fontWeight="normal"
        fontSize={16}
        cursor="pointer"
        textAlign={"center"}
      >
        Histórico
      </Text>
    ),
  },

  {
    href: "post",
    children: (
      <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
        Incluir Item
      </Text>
    ),
  },

  {
    href: "favorits",
    children: (
      <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
        Favoritos
      </Text>
    ),
  },
];

export function NavBar() {
  return (
    <Stack bg="#EFF1F4">
      {/* Header */}
      <Box bg="#1DAF87" py={3} px={8} h="86px">
        <Flex align="center" justifyContent={"space-between"}>
          <Flex align={"center"}>
            <RenderLink
              textDecoration={"none"}
              href="/"
              _focus={{outline: "none"}}
            >
              <Image
                src={LogoPng}
                h={50}
                w={50}
                cursor={"pointer"}
                textDecoration={"none"}
              />
              <Text
                color={"white"}
                fontSize={36}
                fontWeight={"bolder"}
                textDecoration={"none"}
              >
                Escambo
              </Text>
            </RenderLink>
          </Flex>
          <Flex gap={"8.8rem"} mt="8">
            {childrenLinks.map((link) => (
              <RenderLink
                key={link.href}
                children={link.children}
                href={link.href}
              />
            ))}
          </Flex>
          <Avatar />
        </Flex>
      </Box>
      <CustomBreadcrumb />
    </Stack>
  );
}
