import { AuthUser } from "./auth-user";

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: AuthUser;
}
