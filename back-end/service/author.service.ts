import { Author } from '../model/author';
import authorDb from '../repository/author.db';
import { AuthorInput } from '../types';

const getAuthors = async (authorInput?: AuthorInput): Promise<Author[]> => authorDb.getAllAuthors();

const getAuthorById = async ({ id }: { id: number }): Promise<Author> => {
    const author = await authorDb.getAuthorById({ id });
    if (!author) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    return author;
};

const createAuthor = async (authorInput: AuthorInput): Promise<Author> => {
    const now = new Date();
    const date = new Date(authorInput.birth);
        
    if (isNaN(date.getTime())) {
        throw new Error("Not valid date");
    }
    
    const age = now.getFullYear() - date.getFullYear();

    const newAuthor = new Author({
        firstname: authorInput.firstname,
        lastname: authorInput.lastname,
        fullname: `${authorInput.firstname} ${authorInput.lastname}`,
        birth: authorInput.birth,
        age,
        img: authorInput.img
    })

    return await authorDb.createAuthor(newAuthor);
}

const updateAuthor = async (authorInput: AuthorInput): Promise<Author> => {
    const { id, firstname, lastname, birth, img } = authorInput

    const now = new Date();
    const date = new Date(authorInput.birth);

    if (!id) {
        throw new Error('Author ID is required for update');
    }

    const existingAuthor = await getAuthorById({ id });
    const age = now.getFullYear() - date.getFullYear();

    const updatedAuthor = new Author({
        id: existingAuthor.getId(),
        firstname,
        lastname,
        fullname: `${authorInput.firstname} ${authorInput.lastname}`,
        birth,
        age,
        img,
    });

    return await authorDb.updateAuthor(updatedAuthor);
}

const deleteAuthor = async (authorId: number): Promise<void> => {
    const existingAuthor = await getAuthorById({ id: authorId });
    await authorDb.deleteAuthor(existingAuthor.getId()!);
}


export default {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}