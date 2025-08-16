import { Author } from "@/types";

const getAllAuthors = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/authors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export default {
    getAllAuthors
}