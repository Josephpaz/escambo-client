import {
    Stack,
    TabsContent,
    TabsList,
    TabsRoot,
    TabsTrigger,
    Text
} from "@chakra-ui/react";


import FogaoPng from '@/assets/fogao.png';
import GeladeiraPng from '@/assets/geladeira.png';
import { TrocaCard } from "./TrocaCard";

const trocas = {
    enviadas: [
        {
            produto1: {
                nome: "Geladeira",
                categoria: "Eletrodomésticos",
                usuario: "Samuel Gomes",
                imagem: GeladeiraPng,
            },
            produto2: {
                nome: "Fogão",
                categoria: "Eletrodomésticos",
                usuario: "Marcos Araújo",
                imagem: FogaoPng,
            },
            status: "ACEITA",
        },
        {
            produto1: {
                nome: "Geladeira",
                categoria: "Eletrodomésticos",
                usuario: "Samuel Gomes",
                imagem: GeladeiraPng,
            },
            produto2: {
                nome: "Fogão",
                categoria: "Eletrodomésticos",
                usuario: "Marcos Araújo",
                imagem: FogaoPng,
            },
            status: "RECUSADA",
        },
        {
            produto1: {
                nome: "Geladeira",
                categoria: "Eletrodomésticos",
                usuario: "Samuel Gomes",
                imagem: GeladeiraPng,
            },
            produto2: {
                nome: "Fogão",
                categoria: "Eletrodomésticos",
                usuario: "Marcos Araújo",
                imagem: FogaoPng,
            },
            status: "PENDENTE",
        },
    ],
    recebidas: [
        {
            produto1: {
                nome: "Fogão",
                categoria: "Eletrodomésticos",
                usuario: "Marcos Araújo",
                imagem: FogaoPng,
            },
            produto2: {
                nome: "Geladeira",
                categoria: "Eletrodomésticos",
                usuario: "Samuel Gomes",
                imagem: GeladeiraPng,
            },
            status: "RECUSADA",
        },
    ],
};

export function HistoricoTabs() {
    return (
        <Stack px={5} pb={5} textAlign={'center'}>
            <Text color={'#1DAF87'} fontSize={32} mb={5} fontWeight={'bolder'}>Histórico de Trocas</Text>
            <Stack px={5} pb={5} >
                <TabsRoot defaultValue="aceitas" >
                    <TabsList gap={4}>
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
                        {trocas.enviadas.map((troca, index) => (
                            <TrocaCard
                                key={index}
                                produto1={troca.produto1}
                                produto2={troca.produto2}
                                status={troca.status}
                                
                            />
                        ))}
                    </TabsContent>

                    <TabsContent value="recusadas" mt={2}>
                        {trocas.recebidas.map((troca, index) => (
                            <TrocaCard
                                key={index}
                                produto1={troca.produto1}
                                produto2={troca.produto2}
                                status={troca.status}
                            />
                        ))}
                    </TabsContent>
                </TabsRoot>
            </Stack>
        </Stack>
    );
}
