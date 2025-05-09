import LogoPng from "@/assets/Logo.png";
import {Box, Flex, Image, Link, LinkProps, Stack, Text} from "@chakra-ui/react";
import {Avatar} from "./Avatar";
import {CustomBreadcrumb} from "./CustomBreadcrumb";

type RenderLinkProps = LinkProps;
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

const childrenLinks: LinkProps["children"][] = [
  <Image
    src={LogoPng}
    h={53}
    w={284}
    mr="-3rem"
    cursor={"pointer"}
    textDecoration={"none"}
  />,
  <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
    Histórico
  </Text>,
  <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
    Incluir Item
  </Text>,
  <Text color="white" fontWeight="normal" fontSize={16} cursor="pointer">
    Favoritos
  </Text>,
];

export function NavBar() {
  return (
    <Stack bg="#EFF1F4">
      {/* Header */}
      <Box bg="#1DAF87" py={3} px={8} h="86px">
        <Flex align="center" justifyContent={"space-between"}>
          {childrenLinks.map((childrenLink) => (
            <RenderLink
              key={childrenLink!.toString()}
              children={childrenLink}
            />
          ))}
          <Avatar />
        </Flex>
      </Box>
      <CustomBreadcrumb />
    </Stack>
  );
}
