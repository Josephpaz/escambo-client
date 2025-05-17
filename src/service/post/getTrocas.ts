// TrocaService.ts
import { API } from "@/axios";

export namespace TrocaService {
  export interface Produto {
    nome: string;
    descricao: string;
    categoria: string;
    usuario: string;
    imagem: string;
  }

  export interface Troca {
    produto_postagem: Produto;
    produto_proposta_troca: Produto;
    status: string;
  }

  export type GetHistoricoRawResponse = Troca[];

  export async function getHistoricoTroca(
    id: string,
    tipo: "enviadas" | "recebidas"
  ): Promise<Troca[]> {
    try {
      const response = await API.get<GetHistoricoRawResponse>(
        `/trocas/${id}/historico`,
        {
          params: { tipo },
        }
      );

      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao obter histórico de trocas:", error);
      throw new Error("Não foi possível obter o histórico de trocas.");
    }
  }
}
