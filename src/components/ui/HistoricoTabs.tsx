import {
    Stack,
    TabsContent,
    TabsList,
    TabsRoot,
    TabsTrigger,
    Text
} from "@chakra-ui/react";

export function HistoricoTabs() {
    return (
        <Stack  pt={15} px={12} pb={10} textAlign={'center'}>
            <Text color={'#1DAF87'} fontSize={24} fontWeight={'bold'}>Histórico de Trocas</Text>
            <Stack pt={15} px={12} pb={10}>
                <TabsRoot defaultValue="aceitas">
                    <TabsList
                        borderBottom="2px solid #B0B7C3"
                        gap={4}
                    >
                        <TabsTrigger
                            value="aceitas"
                            _selected={{
                                color: "#24B384",
                                borderBottom: "2px solid #1DAF87",
                            }}
                            _focus={{ boxShadow: "none" }}
                            bg="transparent"
                            color="#4A4F59"
                            px={2}
                            pb={2}
                        >
                            Enviadas
                        </TabsTrigger>
                        <TabsTrigger
                            value="recusadas"
                            _selected={{
                                color: "#24B384",
                                borderBottom: "2px solid #1DAF87",
                            }}
                            _focus={{ boxShadow: "none" }}
                            bg="transparent"
                            color="#4A4F59"
                            px={2}
                            pb={2}
                        >
                            Recebidas
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="aceitas">
                        <Text color={'#4A4F59'}>Exibindo trocas aceitas</Text>
                    </TabsContent>
                    <TabsContent value="recusadas">
                        <Text color={'#4A4F59'}>Exibindo trocas recusadas</Text>
                    </TabsContent>
                </TabsRoot>
            </Stack>
        </Stack>
    );
}
