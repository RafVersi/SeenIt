export type Role = 'admin' | 'user' | 'moderator';

export type AuthorInput = {
    id?: number;
    firstname: string;
    lastname: string;
    fullname?: string;
    birth: Date;
    age?: number;
    img?: string; 
}

export type MovieInput = {
    id?: number;
    name: string;
    year: number;
    img?: string;
    author: AuthorInput;
}

export type UserInput = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    img: string;
    password: string;
    role: Role;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};