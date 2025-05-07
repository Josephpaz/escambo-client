// components/PageLoader.tsx
import { Flex, Spinner } from "@chakra-ui/react";

export function PageLoader() {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(255, 255, 255, 0.7)"
      zIndex={9999}
      align="center"
      justify="center"
    >
      <Spinner size="xl" color="#1DAF87"/>
    </Flex>
  );
}
