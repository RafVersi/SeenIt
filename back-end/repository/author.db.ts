import database from '../util/database';
import { Author } from '../model/author';

const getAllAuthors = async (): Promise<Author[]> => {
    try {
        const authorPrisma = await database.author.findMany();
        return authorPrisma.map((authorPrisma) => Author.from(authorPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAuthorById = async ({ id }: { id: number }): Promise<Author | null> => {
    try {
        const authorPrisma = await database.author.findUnique({
            where: { id },
        });

        return authorPrisma ? Author.from(authorPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByFullname = async ({ fullname }: { fullname: string }): Promise<Author | null> => {
    try {
        const authorPrisma = await database.author.findFirst({
            where: { fullname },
        });

        return authorPrisma ? Author.from(authorPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createAuthor = async (author: Author): Promise<Author> => {
    try {
        const authorPrisma = await database.author.create({
            data: {
                firstname: author.getFisrtname(),
                lastname: author.getLastname(),
                fullname: author.getFullname(),
                birth: author.getBirth(),
                age: author.getAge(),
                img: author.getImg()
            },
        });

        return Author.from(authorPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const updateAuthor = async (id: number, updates: Partial<{firstname: string; lastname: string; fullname: string; birth: Date; age: number; img: string}>): Promise<Author> => {
    try {
        const authorPrisma = await database.author.update({
            where: { id },
            data: updates,
        });

        return Author.from(authorPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteAuthor = async (id: number): Promise<void> => {
    try {
        await database.author.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllAuthors,
    getAuthorById,
    getUserByFullname,
    createAuthor,
    updateAuthor,
    deleteAuthor
}