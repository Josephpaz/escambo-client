import {API} from "@/axios";

export namespace UserService {
  export type GetUser = {
    email: string;
    id: string;
    nome: string;
    telefone: string;
  };
}

const baseUrl = "/usuarios";
export class UserService {
  static getById(id: string) {
    type Response = {
      id: string;
      nome: string;
      telefone: string;
      email: string;
    };
    return API.get<Response>(`${baseUrl}/${id}`);
  }

  static getByToken(token: string) {
    type Response = {
      id: string;
      nome: string;
      telefone: string;
      email: string;
    };
    return API.get<Response>(`/me`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }
}
