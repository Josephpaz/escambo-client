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
        <Stack px={5} pb={5} textAlign={'center'}>
            <Text color={'#1DAF87'} fontSize={32} mb={5} fontWeight={'bolder'}>Histórico de Trocas</Text>
            <Stack px={5} pb={5}>
                <TabsRoot defaultValue="aceitas">
                    <TabsList gap={4} >
                        <TabsTrigger
                            value="aceitas"
                            _selected={{
                                color: "#24B384",
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
