import { API } from "@/axios";

export namespace TrocaService {
  const trocasEnviadas = "/trocas/enviadas";
  const trocasRecebidas = "/trocas/recebidas";

  export interface Produto {
    nome: string;
    data: string;
    categoria: string;
    usuario: string;
    imagem: string;
  }

  export interface Troca {
    produto1: Produto;
    produto2: Produto;
    status: string;
  }

  export interface GetEnviadasResponse {
    enviadas: Troca[];
  }

  export interface GetRecebidasResponse {
    recebidas: Troca[];
  }

  export async function getEnviadas(): Promise<GetEnviadasResponse> {
    const response = await API.get<GetEnviadasResponse>(trocasEnviadas);
    return response.data;
  }

  export async function getRecebidas(): Promise<GetRecebidasResponse> {
    const response = await API.get<GetRecebidasResponse>(trocasRecebidas);
    return response.data;
  }
}
