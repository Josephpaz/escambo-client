import { API } from "@/axios";

export namespace RespostaPropostaService {
  export type Resposta = {
    resposta: string;
  };
  export async function putRespostaProposta(
    id: string,
    novo_status: "aceita" | "recusada"
  ): Promise<Resposta> {
    try {
      const response = await API.put<Resposta>(`/trocas/${id}/status`, {
        status: novo_status,
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao enviar resposta da proposta:", error);
      throw new Error("Não foi possível enviar a resposta da proposta.");
    }
  }
}
