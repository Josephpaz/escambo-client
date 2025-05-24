import { TrocaService } from "@/service/post/getTrocas.service";
import {
  Box,
  Spinner,
  Stack,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { Filter } from "./Filter";
import { ModalResposta } from "./ModalResposta";
import { Pagination } from "./Pagination";
import { TrocaCard } from "./TrocaCard";

//const trocaId = localStorage.getItem("userId") || "";
const trocaId = "4ee1c8f7-5e46-4c12-9b6a-465b88bddaa3";
console.log(trocaId)
const ITEMS_PER_PAGE = 3;

export function HistoricoTabs() {
  const [trocasEnviadas, setTrocasEnviadas] = useState<TrocaService.Troca[]>([]);
  const [trocasRecebidas, setTrocasRecebidas] = useState<TrocaService.Troca[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [trocaSelecionada, setTrocaSelecionada] = useState<TrocaService.Troca | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState<"enviadas" | "recebidas">("enviadas");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escolhe o array correto baseado na aba atual
  const trocasAtuais = currentTab === "enviadas" ? trocasEnviadas : trocasRecebidas;
  const trocasArray = Array.isArray(trocasAtuais) ? trocasAtuais : [];

  // Aplica filtro por status (se nenhum selecionado, mostra todos)
  const trocasFiltradas = trocasArray.filter(
    (troca) =>
      selectedStatus.length === 0 || selectedStatus.includes(troca.status.toUpperCase())
  );

  // Paginação aplicada sobre o array filtrado
  const totalItems = trocasFiltradas.length;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const trocasPaginadas = trocasFiltradas.slice(startIndex, endIndex);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    async function fetchTrocas() {
      setLoading(true);
      setError(null);
      try {
        const historico = await TrocaService.getHistoricoTroca(trocaId, currentTab);
        if (currentTab === "enviadas") {
          setTrocasEnviadas(historico);
        } else {
          setTrocasRecebidas(historico);
        }
      } catch (err) {
        setError((err as Error).message);
        if (currentTab === "enviadas") {
          setTrocasEnviadas([]);
        } else {
          setTrocasRecebidas([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTrocas();
  }, [currentTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, currentTab]);

  // Fecha filtro ao trocar aba
  useEffect(() => {
    setShowFilter(false);
  }, [currentTab]);


  // Reseta página quando filtro ou aba mudam para evitar página inválida
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, currentTab]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Stack>
      <Stack px={5} pb={5} textAlign="center" position="relative">
        <Text color="#1DAF87" fontSize={32} mb={5} fontWeight="bolder">
          Histórico de Trocas
        </Text>

        <TabsRoot
          defaultValue="enviadas"
          onValueChange={(details) => {
            setCurrentTab(details.value as "enviadas" | "recebidas");
            setCurrentPage(1);
          }}
        >
          <TabsList gap={4} position="relative">
            <TabsTrigger
              value="enviadas"
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
              value="recebidas"
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
              <IoFilter
                color="#606266"
                size={18}
                aria-label="Abrir filtros"
                onClick={() => setShowFilter(!showFilter)}
                cursor="pointer"
              />
            </Box>
          </TabsList>

          <TabsContent value={currentTab}>
            {loading && (
              <Stack align="center" py={10}>
                <Spinner size="lg" color="#1DAF87" />
                <Text mt={2} color={"#4A4F59"}>
                  Carregando histórico...
                </Text>
              </Stack>
            )}

            {error && (
              <Text color="#F94649" fontWeight="bold" py={5}>
                {error}
              </Text>
            )}

            {!loading && !error && trocasPaginadas.length === 0 && (
              <Text py={5} color="#4A4F59">
                Nenhuma troca encontrada.
              </Text>
            )}

            {!loading &&
              !error &&
              trocasPaginadas.map((troca, index) => (
                <TrocaCard
                  key={`${troca.produto_postagem.nome}-${troca.produto_proposta_troca.nome}-${index}`}
                  produto1={troca.produto_postagem}
                  produto2={troca.produto_proposta_troca}
                  status={troca.status}
                  onClick={() => {
                    setTrocaSelecionada(troca);
                    setIsModalOpen(true);
                  }}
                />

              ))}
          </TabsContent>
        </TabsRoot>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {showFilter && (
          <Box
            position="absolute"
            top="100px"
            right="25px"
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Filter value={selectedStatus} onChange={setSelectedStatus} />
          </Box>

        )}

        {trocaSelecionada && (
          <ModalResposta
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAceitar={() => {
              console.log("Aceitar troca:", trocaSelecionada);
              setIsModalOpen(false);
            }}
            onRecusar={() => {
              console.log("Recusar troca:", trocaSelecionada);
              setIsModalOpen(false);
            }}
          />
        )}

      </Stack>
    </Stack>
  );
}
