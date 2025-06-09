import {TrocaService} from "@/service/post/getTrocas.service";
import {RespostaPropostaService} from "@/service/post/putRespostaProposta.service";
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
import {useEffect, useState} from "react";
import {IoFilter} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {CustomModal} from "./CustomModal";
import {Filter} from "./Filter";
import {ModalResposta} from "./ModalResposta";
import {Pagination} from "./Pagination";
import {TrocaCard} from "./TrocaCard";

const trocaId = localStorage.getItem("trocaId");

const userId = "90c8242e-0b7f-4ec8-a235-70a6401e5886";
// const userId = localStorage.getItem('userId');

const ITEMS_PER_PAGE = 3;

export function HistoricoTabs() {
  const navigate = useNavigate();

  const [trocasEnviadas, setTrocasEnviadas] = useState<TrocaService.Troca[]>(
    []
  );
  const [trocasRecebidas, setTrocasRecebidas] = useState<TrocaService.Troca[]>(
    []
  );

  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [trocaSelecionada, setTrocaSelecionada] =
    useState<TrocaService.Troca | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [currentTab, setCurrentTab] = useState<"enviadas" | "recebidas">(
    "enviadas"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false); // Loading do fetch
  const [loadingPut, setLoadingPut] = useState(false); // Loading do PUT (responderTroca)
  const [error, setError] = useState<string | null>(null);

  const [showFilter, setShowFilter] = useState(false);

  async function fetchTrocas() {
    setLoading(true);
    setError(null);
    try {
      const historico = await TrocaService.getHistoricoTroca(
        userId,
        currentTab
      );
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

  async function responderTroca(resposta: "aceita" | "recusada") {
    setLoadingPut(true);
    try {
      await RespostaPropostaService.putRespostaProposta(
        String(trocaId),
        resposta
      );
      setFormSubmitted(true);
      setIsCustomModalOpen(true);
      setIsModalOpen(false);
      await fetchTrocas();
    } catch {
      setFormSubmitted(false);
      setIsCustomModalOpen(true);
    } finally {
      setLoadingPut(false);
    }
  }

  // Limpa troca selecionada ao fechar o modal
  useEffect(() => {
    if (!isModalOpen) {
      setTrocaSelecionada(null);
    }
  }, [isModalOpen]);

  // UseEffect para carregar trocas e resetar página quando aba ou filtro mudam
  useEffect(() => {
    fetchTrocas();
    setCurrentPage(1);
    setShowFilter(false);
  }, [currentTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  const trocasAtuais =
    currentTab === "enviadas" ? trocasEnviadas : trocasRecebidas;

  const trocasFiltradas = trocasAtuais.filter(
    (troca) =>
      selectedStatus.length === 0 ||
      selectedStatus.includes(troca.status.toUpperCase())
  );

  const totalItems = trocasFiltradas.length;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const trocasPaginadas = trocasFiltradas.slice(startIndex, endIndex);

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
          }}
        >
          <TabsList gap={4} position="relative">
            <TabsTrigger
              value="enviadas"
              _selected={{color: "#24B384"}}
              _focus={{boxShadow: "none"}}
              bg="transparent"
              color="#4A4F59"
              px={2}
              pb={2}
            >
              Enviadas
            </TabsTrigger>
            <TabsTrigger
              value="recebidas"
              _selected={{color: "#24B384"}}
              _focus={{boxShadow: "none"}}
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
                onClick={() => setShowFilter((prev) => !prev)}
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
            onResposta={responderTroca}
            isLoading={loadingPut}
          />
        )}

        {isCustomModalOpen && (
          <CustomModal
            isOpen={isCustomModalOpen}
            onClose={() => {
              setIsCustomModalOpen(false);
              if (formSubmitted) navigate("/history");
            }}
            title="Proposta de Troca"
            isError={!formSubmitted}
            message={
              formSubmitted
                ? "Sua resposta foi enviada com sucesso!"
                : "Ocorreu um erro ao tentar enviar sua resposta. Tente novamente mais tarde."
            }
          />
        )}
      </Stack>
    </Stack>
  );
}
