import AuthorService from "@/services/AuthorService";
import { Component, useEffect, useState } from 'react';
import { Author } from "@/types";
import { mutate } from "swr";

type Props = {
    authors: Author[];
}

const AuthorOverview: React.FC<Props> = ({
    authors
}: Props) => {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedAuthor, setEditedAuthor] = useState<Author | null>(null);

    const handleEdit = (author: Author) => {
        setEditingId(author.id);
        setEditedAuthor({ ...author });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedAuthor) return;
        const { name, value } = e.target;

        setEditedAuthor({
            ...editedAuthor,
            [name]: name === "birth" ? new Date(value) : value,
        });
    };

    const handleSave = async () => {
        if (!editedAuthor) return;

        try {
            const response = await AuthorService.updateAuthor(editedAuthor);
            if (!response.ok) {
                setStatusMessage("Failed to save changes.");
                return;
            }
            setStatusMessage("Changes saved successfully.");
            setEditingId(null);
            setEditedAuthor(null);
        } catch (err) {
            setStatusMessage("Error updating author.");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await AuthorService.deleteAuthor(id);

            if (!response.ok) {
                setStatusMessage("Failed to delete author.");
                return;
            }

            setStatusMessage("Author deleted successfully.");
            mutate("authors");
        } catch (err) {
            setStatusMessage("Error deleting author.");
        }
    };

    return (
        <>
            {statusMessage && <p className="mt-5">{statusMessage}</p>}
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Fullname</th>
                        <th>Birth</th>
                        <th>age</th>
                        <th>img</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>
                                {editingId === author.id ? (
                                    <input type="text" name="firstname" value={editedAuthor?.firstname || ""} onChange={handleChange}/>
                                ) : (author.firstname)}
                            </td>
                            <td>
                                {editingId === author.id ? (
                                    <input type="text" name="lastname" value={editedAuthor?.lastname || ""} onChange={handleChange}/>
                                ) : (author.lastname)}
                            </td>
                            <td>{author.fullname}</td>
                            <td>
                                {editingId === author.id ? (
                                    <input type="date" name="birth" value={editedAuthor?.birth ? new Date(editedAuthor.birth).toISOString().split("T")[0] : ""} onChange={handleChange}/>
                                ) : (new Date(author.birth).toLocaleDateString())}                                
                            </td>
                            <td>{author.age}</td>
                            <td>
                                {editingId === author.id ? (
                                    <input type="text" name="img" value={editedAuthor?.img || ""} onChange={handleChange}/>
                                ) : (author.img)}
                            </td>
                            <td>
                                {editingId === author.id ? (
                                    <button onClick={handleSave}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(author)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(author.id)}>
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

export default AuthorOverview