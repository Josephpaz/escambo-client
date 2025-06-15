import {API} from "@/axios";
import {PostDomain} from "../post/index.service";

export namespace FavoriteService {
  export type CreateProps = {
    postagem_id: string;
    user_id: string;
  };
  export type DeleteProps = CreateProps;
  export type GetAllProps = {userId: string};
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

  static async getAll({userId}: FavoriteService.GetAllProps) {
    type Response = PostDomain[];
    return API.get<Response>(`${baseUrl}/${userId}`);
  }
}
