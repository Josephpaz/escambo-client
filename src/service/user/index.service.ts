import {API} from "@/axios";

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
}
