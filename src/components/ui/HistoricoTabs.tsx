import {
    Box,
    Stack,
    TabsContent,
    TabsList,
    TabsRoot,
    TabsTrigger,
    Text
} from "@chakra-ui/react";

import { IoFilter } from "react-icons/io5";
import { Pagination } from "./Pagination";

import FogaoPng from '@/assets/fogao.png';
import GeladeiraPng from '@/assets/geladeira.png';
import { useState } from "react";
import { TrocaCard } from "./TrocaCard";

const trocas = {
    enviadas: [
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            status: "ACEITA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            produto2: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Arlindo Neto", imagem: FogaoPng },
            status: "RECUSADA",
        },

    ],
    recebidas: [
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
        {
            produto1: { nome: "Fogão", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Marcos Araújo", imagem: FogaoPng },
            produto2: { nome: "Geladeira", data: "08-05-2025", categoria: "Eletrodomésticos", usuario: "Samuel Gomes", imagem: GeladeiraPng },
            status: "RECUSADA",
        },
    ],
};

const ITEMS_PER_PAGE = 3;

export function HistoricoTabs() {
    const [currentTab, setCurrentTab] = useState("aceitas");
    const [currentPage, setCurrentPage] = useState(1);

    const trocasAtuais = currentTab === "aceitas" ? trocas.enviadas : trocas.recebidas;
    const totalItems = trocasAtuais.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const trocasPaginadas = trocasAtuais.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Stack>
            <Stack px={5} pb={5} textAlign="center">
                <Text color="#1DAF87" fontSize={32} mb={5} fontWeight="bolder">
                    Histórico de Trocas
                </Text>

                <Stack px={5} pb={5}>
                    <TabsRoot
                        defaultValue="aceitas"
                        onValueChange={(tab) => {
                            setCurrentTab(tab.value);
                            setCurrentPage(1);
                        }}
                    >
                        <TabsList gap={4} >
                            <TabsTrigger
                                value="aceitas"
                                _selected={{ color: "#24B384" }}
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
                                _selected={{ color: "#24B384" }}
                                _focus={{ boxShadow: "none" }}
                                bg="transparent"
                                color="#4A4F59"
                                px={2}
                                pb={2}
                            >
                                Recebidas

                            </TabsTrigger>
                            <Box position="absolute" top="16px" right="16px">
                                <IoFilter color="#606266" size={18} onClick={() => alert("oi")} cursor={'pointer'}/>
                            </Box>
                        </TabsList>

                        <TabsContent value="aceitas">
                            {currentTab === "aceitas" &&
                                trocasPaginadas.map((troca, index) => (
                                    <TrocaCard
                                        key={index}
                                        produto1={troca.produto1}
                                        produto2={troca.produto2}
                                        status={troca.status}
                                    />
                                ))}
                        </TabsContent>

                        <TabsContent value="recusadas" mt={2}>
                            {currentTab === "recusadas" &&
                                trocasPaginadas.map((troca, index) => (
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


                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Stack>
        </Stack>
    );
}