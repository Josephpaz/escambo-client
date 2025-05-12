import { API } from "@/axios";

export interface RegisterCreate {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    confirmSenha: string;
}

interface RegisterResponse {
    message: string;
}

const baseUrl = '/registerCreated';

export class PostRegister {
    static async create(payload: RegisterCreate) {
        const response = await API.put<RegisterResponse>(baseUrl, payload);
        return response.data;
    }
}
