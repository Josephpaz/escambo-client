import {API} from "@/axios";
import {Order} from "@/types";

export type PostDomain = {
  id: string;
  bairro: string;
  categoria: string;
  cidade: string;
  criacao_em: string;
  descricao: string;
  estado: string;
  imagens: string[];
  nome_usuario: string;
  status: true;
  titulo: string;
  user_id: string;
};
export namespace PostService {
  export type CreateProps = {
    titulo: string;
    descricao: string;
    user_id: string;
    categoria: string;
  };

  export type GetAllParams = {
    categoria?: string;
    ordenacao?: Order;
    limite?: number;
    pagina?: number;
    user_id?: string;
  };

  export type GetAllResponse = PostDomain[];
}
const baseUrl = "/postagens";
export class PostService {
  static create(payload: PostService.CreateProps) {
    type Response = {
      id: "string";
      message: "string";
    };
    return API.post<Response>(baseUrl, payload);
  }

  static uploadImage(id: string, file: File) {
    type Response = {
      url: string;
    };
    const formData = new FormData();
    formData.append("image", file);
    return API.post<Response>(`${baseUrl}/${id}/imagem`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static getById(id: string) {
    type Response = {
      categoria: string;
      descricao: string;
      titulo: string;
      imagens: string[];
      user_id: string;
    };
    return API.get<Response>(`${baseUrl}/${id}/detalhes`);
  }

  static getAll(params: PostService.GetAllParams) {
    return API.get<PostService.GetAllResponse>(baseUrl, {params});
  }
}
