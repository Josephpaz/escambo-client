import {API} from "@/axios";

export namespace PostService {
  export type CreateProps = {
    titulo: string;
    descricao: string;
    imagem_url: string;
    user_id: string;
    categoria: string;
  };
}
const baseUrl = "/postagens";
export class PostService {
  static create(payload: PostService.CreateProps) {
    type Response = "Postagem inserida/atualizada com sucesso";
    return API.post<Response>(baseUrl, payload);
  }

  static getById(id: string) {
    type Response = {
      categoria: string
      descricao: string;
      titulo: string;
      user_id: string
    };
    return API.get<Response>(`${baseUrl}/${id}/detalhes`);
  }
}
