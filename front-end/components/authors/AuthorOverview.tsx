import AuthorService from "@/services/AuthorService";
import { Component, useEffect, useState } from 'react';
import { Author } from "@/types";

type Props = {
    authors: Author[];
}

const AuthorOverview: React.FC<Props> = ({
    authors
}: Props) => {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    return (
        <>
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
                    {statusMessage && <p className="mt-5">{statusMessage}</p>}
                    {authors.map((author, index) => (
                        <tr key={index}>
                            <td>{author.id}</td>
                            <td>{author.firstname}</td>
                            <td>{author.lastname}</td>
                            <td>{author.fullname}</td>
                            <td>{new Date(author.birth).toLocaleDateString()}</td>
                            <td>{author.age}</td>
                            <td>{author.img}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AuthorOverview