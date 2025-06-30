import {API} from "@/axios";

const baseUrl = "/login";

export namespace AuthService {
  export type LoginPayload = {
    email: string;
    senha: string;
  };
}
export class AuthService {
  static async login(payload: AuthService.LoginPayload) {
    type Response = {
      token: string;
    };
    return API.post<Response>(baseUrl, payload);
  }
}
