export type CreateUserPayload = {
    email: string;
    password: string;
    googleId?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
