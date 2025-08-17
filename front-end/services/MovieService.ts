import { Movie } from "@/types";

const getAllMovies = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/movies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
};

const createMovie = (movie: Movie) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });
}

const updateMovie = (movie: Movie) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/movies", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });
}

const deleteMovie = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/movies/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export default {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}