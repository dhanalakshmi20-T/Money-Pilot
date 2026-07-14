export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'USER' | 'ADMIN';
    profileImage?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;    
}
