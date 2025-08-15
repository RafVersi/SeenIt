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

const getAuthorByFullname = async ({ fullname }: { fullname: string }): Promise<Author> => {
    const author = await authorDb.getAuthorByFullname({ fullname });
    if (!author) {
        throw new Error(`User with username: ${fullname} does not exist.`);
    }
    return author;
};

const createAuthor = async (authorInput: AuthorInput): Promise<Author> => {
    try {
        if (!authorInput.firstname?.trim() || !authorInput.lastname?.trim() || !authorInput.birth || !authorInput.img?.trim()) {
            throw new Error('input is required');
        }
        
        const fullname = authorInput.fullname?.trim() ? authorInput.fullname : `${authorInput.firstname} ${authorInput.lastname}`
        
        const now = new Date();
        let age = now.getFullYear() - authorInput.birth.getFullYear();

        const hasHadBirthday = now.getMonth() > authorInput.birth.getMonth() || (now.getMonth() === authorInput.birth.getMonth() && now.getDate() >= authorInput.birth.getDate());
        if (!hasHadBirthday) age--;

        const newAuthor = new Author({
            firstname: authorInput.firstname,
            lastname: authorInput.lastname,
            fullname,
            birth: authorInput.birth,
            age,
            img: authorInput.img
        })

        return await authorDb.createAuthor(newAuthor);
    } catch (error) {
        console.error(error);
        throw new Error('Service error. See server log for details.');
    }
}

const updateAuthor = async (authorInput: AuthorInput): Promise<Author | null> => {
    if (!authorInput.id) {
        throw new Error('Author ID is required for update');
    }

    const existingAuthor = await getAuthorById({ id: authorInput.id });
    if (!existingAuthor){
        throw new Error('Author doesnt exist');
    }

    const firstname = authorInput.firstname ?? existingAuthor.getFisrtname();
    const lastname = authorInput.lastname ?? existingAuthor.getLastname();
    const birth = authorInput.birth ?? existingAuthor.getBirth();
    const img = authorInput.img ?? existingAuthor.getImg();
    const fullname = `${firstname} ${lastname}`;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const hasHadBirthday = now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
    if (!hasHadBirthday) age--;

    const updatedAuthor = new Author({
        id: existingAuthor.getId(),
        firstname,
        lastname,
        fullname,
        birth,
        age,
        img,
    });

    const updatedFields = {
        firstname: updatedAuthor.getFisrtname(),
        lastname: updatedAuthor.getLastname(),
        fullname: updatedAuthor.getFullname(),
        birth: updatedAuthor.getBirth(),
        age: updatedAuthor.getAge(),
        img: updatedAuthor.getImg(),
    };

    return await authorDb.updateAuthor(existingAuthor.getId()!, updatedFields);
}

const deleteAuthor = async (authorInput: AuthorInput): Promise<void> => {
    if (!authorInput.id) {
        throw new Error('Author ID is required to delete an author.');
    }
    
    try {
        await authorDb.deleteAuthor(authorInput.id);
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting author from the database.');
    }
}

export default {
    getAuthors,
    getAuthorById,
    getAuthorByFullname,
    createAuthor,
    updateAuthor,
    deleteAuthor
}