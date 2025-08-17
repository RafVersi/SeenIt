import MovieService from "@/services/MovieService";
import { Component, useEffect, useState } from 'react';
import { Movie } from "@/types";
import { mutate } from "swr";

type Props = {
    movies: Movie[];
}

const MovieOverview: React.FC<Props> = ({
    movies
}: Props) => {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

    const handleEdit = (movie: Movie) => {
        setEditingId(movie.id);
        setEditedMovie({ ...movie });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedMovie) return;
        const { name, value } = e.target;

        setEditedMovie({
            ...editedMovie,
            [name]: value
        });
    };

    const handleSave = async () => {
        if (!editedMovie) return;

        try {
            const response = await MovieService.updateMovie(editedMovie);
            if (!response.ok) {
                setStatusMessage("Failed to save changes.");
                return;
            }
            setStatusMessage("Changes saved successfully.");
            setEditingId(null);
            setEditedMovie(null);
        } catch (err) {
            setStatusMessage("Error updating author.");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await MovieService.deleteMovie(id);

            if (!response.ok) {
                setStatusMessage("Failed to delete movie.");
                return;
            }

            setStatusMessage("Movie deleted successfully.");
            mutate("movies");
        } catch (err) {
            setStatusMessage("Error deleting movie.");
        }
    };

    return (
        <>
            {statusMessage && <p>{statusMessage}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Img</th>
                        <th>AuthorId</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>
                                {editingId === movie.id ? (
                                    <input type="text" name="name" value={editedMovie?.name || ""} onChange={handleChange}/>
                                ) : (movie.name)}
                            </td>
                            <td>
                                {editingId === movie.id ? (
                                    <input type="number" name="year" value={editedMovie?.year || ""} onChange={handleChange}/>
                                ) : (movie.year)}
                            </td>
                            <td>
                                {editingId === movie.id ? (
                                    <input type="text" name="img" value={editedMovie?.img || ""} onChange={handleChange}/>
                                ) : (movie.img)}
                            </td>
                            <td>
                                {editingId === movie.id ? (
                                    <input type="number" name="author" value={editedMovie?.author.id || ""} onChange={handleChange} />
                                )  : ( movie.author.id)}
                            </td>
                            <td>
                                {editingId === movie.id ? (
                                    <button onClick={handleSave}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(movie)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(movie.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default MovieOverview;