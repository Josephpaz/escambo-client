import { HistoricoTabs } from "@/components/ui/HistoricoTabs"; // ajuste o caminho se necessário
import { NavBar } from "@/components/ui/Navbar";
import { Box, Stack } from "@chakra-ui/react";

export function HistoricoTrocas() {
  return (
    <Stack spaceX={6}>
      <NavBar />

      <Box pt={4} px={4}>
        <HistoricoTabs />
      </Box>
    </Stack>
  );
}
