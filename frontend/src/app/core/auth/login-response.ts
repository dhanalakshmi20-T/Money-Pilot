import { AuthUser } from "../models/auth-user";

export interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: AuthUser;
}
