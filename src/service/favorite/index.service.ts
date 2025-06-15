import {API} from "@/axios";

export namespace FavoriteService {
  export type CreateProps = {
    postagem_id: string;
    user_id: string;
  };
  export type DeleteProps = CreateProps;
}

const baseUrl = "/favoritos";
export class FavoriteService {
  static async create(payload: FavoriteService.CreateProps) {
    type Response = string;

    return API.post<Response>(`${baseUrl}`, payload);
  }

  static delete(payload: FavoriteService.DeleteProps) {
    type Response = string;
    return API.delete<Response>(`${baseUrl}`, {data: payload});
  }

  static async getAll() {
    type Response = string[];
    return API.get<Response>(`${baseUrl}`);
  }
}
