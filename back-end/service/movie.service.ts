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

const createMovie = async (movieInput: MovieInput): Promise<Movie> => {
    const { id, name, year, img, authorId } = movieInput
    const author = await authorDb.getAuthorById({ id: authorId });
    if (!author) {
        throw new Error(`Author with ID ${movieInput.authorId} not found`);
    };

    const newMovie = new Movie({
        name: name,
        year: year,
        img: img,
        author
    });

    return await movieDb.createMovie(newMovie);
}

const updateMovie = async (movieInput: MovieInput): Promise<Movie | null> => {
    const { id, name, year, img, authorId } = movieInput

    if (!id) {
        throw new Error('Movie ID is required for update');
    }

    const existingMovie = await getMovieById({ id });

    const author = await authorDb.getAuthorById({ id: authorId });
    if (!author) {
        throw new Error('Author does not exist');
    }

    const updateMovie = new Movie({
        id: existingMovie.getId(),
        name: name,
        year: year,
        img: img,
        author
    });

    return await movieDb.updateMovie(updateMovie);
}

const deleteMovie = async (movieId: number): Promise<void> => {
    const movie = await getMovieById({ id: movieId });
    await movieDb.deleteMovie(movie.getId()!);
}

export default {
    getmovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}