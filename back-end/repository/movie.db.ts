import database from '../util/database';
import { Movie } from '../model/movie';

const getAllmovies = async (): Promise<Movie[]> => {
    try {
        const moviePrisma = await database.movie.findMany({
            include: {
                author: true
            }
        });
        return moviePrisma.map((moviePrisma) => Movie.from(moviePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getMovieById = async ({ id }: { id: number }): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.findUnique({
            where: { id },
            include: {
                author: true
            }
        });

        return moviePrisma ? Movie.from(moviePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createMovie = async (movie: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.create({
            data: {
                name: movie.getName(),
                year: movie.getYear(),
                img: movie.getImg(),
                author: {
                    connect: { id: movie.getAuthor().getId() }
                }
            },
            include: {
                author: true
            }
        });

        return Movie.from(moviePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const updateMovie = async (movie: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.update({
            where: { id: movie.getId() },
            data: {
                name: movie.getName(),
                year: movie.getYear(),
                img: movie.getImg(),
                author: {
                    connect: { id: movie.getAuthor().getId() }
                }
            },
            include: {
                author: true
            }
        });

        return Movie.from(moviePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteMovie = async (id: number): Promise<void> => {
    try {
        await database.movie.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllmovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}