
import { Movie } from '../model/movie';
import movieDb from '../repository/movie.db';
import authorDb from '../repository/author.db';
import { MovieInput } from '../types';

const getmovies = async (movieInput?: MovieInput): Promise<Movie[]> => movieDb.getAllmovies();

const getMovieById = async ({ id }: { id: number }): Promise<Movie> => {
    const movie = await movieDb.getMovieById({ id });
    if (!movie) {
        throw new Error(`User with id: ${id} does not exist.`);
    };

    return movie;
};

const getMovieByName = async ({ name }: { name: string }): Promise<Movie> => {
    const movie = await movieDb.getMovieByName({ name });
    if (!movie) {
        throw new Error(`User with username: ${name} does not exist.`);
    };

    return movie;
};

const createMovie = async (movieInput: MovieInput): Promise<Movie> => {
    try {
        if (!movieInput.name?.trim() || !movieInput.year || !movieInput.img?.trim() || !movieInput.author?.id) {
            throw new Error('input is required');
        };

        const author = await authorDb.getAuthorById({id: movieInput.author.id});
        if (!author){
            throw new Error(`Author with ID ${movieInput.author.id} not found`);
        };
    
        const newMovie = new Movie({
            name: movieInput.name,
            year: movieInput.year,
            img: movieInput.img,
            author
        });

        return await movieDb.createMovie(newMovie);
        } catch (error) {
            console.error(error);
            throw new Error('Service error. See server log for details.');
        }
}

const updateMovie = async (movieInput: MovieInput): Promise<Movie | null> => {
    if (!movieInput.id) {
        throw new Error('Movie ID is required for update');
    }

    const existingMovie = await getMovieById({ id: movieInput.id });
    if (!existingMovie){
        throw new Error('Movie doesnt exist');
    }

    if (movieInput.author?.id) {
        const author = await authorDb.getAuthorById({ id: movieInput.author.id });
        if (!author) {
            throw new Error('Author does not exist');
        }
    }

    const updates: Partial<{ name: string; year: number; img: string; authorId: number }> = {};
    if (movieInput.name) {
        updates.name = movieInput.name;
    }
    if (movieInput.year) {
        updates.year = movieInput.year;
    }
    if (movieInput.img) {
        updates.img = movieInput.img;
    }
    if (movieInput.author?.id) {
        updates.authorId = movieInput.author.id;
    }

    const updatedMovie = await movieDb.updateMovie(movieInput.id, updates);
    return updatedMovie;
}

const deleteMovie = async (movieInput: MovieInput): Promise<void> => {
    if (!movieInput.id) {
        throw new Error('Author ID is required to delete an author.');
    }
    
    try {
        await authorDb.deleteAuthor(movieInput.id);
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting author from the database.');
    }
}

export default {
    getmovies,
    getMovieById,
    getMovieByName,
    createMovie,
    updateMovie,
    deleteMovie
}