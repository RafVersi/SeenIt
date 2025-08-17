import { CreateAuthor, Author } from "@/types";

const getAllAuthors = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
};

const createAuthor = (author: CreateAuthor) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    });
}

const updateAuthor = (author: Author) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(author)
    });
}

export default {
    getAllAuthors,
    createAuthor,
    updateAuthor
}