import {API} from "@/axios";

export namespace TradeService {
  export type TradeDomain = {
    id: string;
    postagem_id: string;
    interessado_id: string;
    dono_postagem_id: string;
    descricao: string;
    nome: string;
    categoria: string;
    status: string;
    created_at: string;
    updated_at: string;
  };

  export type CreateProps = {
    postagem_id: string;
    dono_postagem_id: string;
    interessado_id: string;
    nome: string;
    categoria: string;
    descricao: string;
  };
}

const baseURL = "/trocas";
export class TradeService {
  static createTrade(payload: TradeService.CreateProps) {
    type Response = TradeService.TradeDomain;
    return API.post<Response>(`${baseURL}`, payload);
  }

  static uploadImage(id: string, file: File) {
    type Response = {
      url: string;
    };
    const formData = new FormData();
    formData.append("image", file);
    return API.post<Response>(`${baseURL}/${id}/imagem`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
