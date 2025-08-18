export type Author = {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    birth: Date;
    age: number;
    img: string; 
}

export type CreateAuthor = {
    firstname: string;
    lastname: string;
    birth: Date;
    img: string; 
}

export type Movie = {
    id: number;
    name: string;
    year: number;
    img: string;
    author: Author;
}

export type User = {
    id?: number;
    firstname?: string;
    lastname?: string;
    username: string;
    email?: string;
    img?: string;
    password: string;
    role?: string;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};