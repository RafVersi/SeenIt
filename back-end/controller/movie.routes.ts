/**
 * @swagger
 *   components:
 *    schemas:
 *      Movie:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name of the movie.
 *            year:
 *              type: number
 *              format: int64
 *              description: Year of release.
 *            img:
 *              type: string
 *              description: Image.
 *            authorId:
 *              type: number
 *              format: int64
 *              description: Id of the author.
 */

import express, { NextFunction, Request, Response } from 'express';
import movieService from '../service/movie.service';
import { MovieInput } from '../types';

const movieRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get the list of all movies
 *     responses:
 *       200:
 *         description: The list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Movie'
 */
movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getmovies();

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a specific movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An author object.
 */
movieRouter.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const movie = await movieService.getMovieById({id});

        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Movie name
 *               year:
 *                 type: integer
 *                 format: int32
 *                 description: Release year
 *               img:
 *                 type: string
 *                 description: Poster or image URL
 *               author:
 *                 type: object
 *                 description: Author of the movie
 *                 properties:
 *                   id:
 *                     type: integer
 *                     format: int64
 *                     description: Existing author ID
 *                 required:
 *                   - id
 *             required:
 *               - name
 *               - year
 *               - author
 *     responses:
 *       201:
 *         description: Movie created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */

movieRouter.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const movieInput = <MovieInput>req.body;
            const response = await movieService.createMovie(movieInput);

        res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /movies:
 *   put:
 *     summary: Update the movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 format: int32
 *                 description: id movie
 *               name:
 *                 type: string
 *                 description: Movie name
 *               year:
 *                 type: integer
 *                 format: int32
 *                 description: Release year
 *               img:
 *                 type: string
 *                 description: Poster or image URL
 *               author:
 *                 type: object
 *                 description: Author of the movie
 *                 properties:
 *                   id:
 *                     type: integer
 *                     format: int64
 *                     description: Existing author ID
 *                 required:
 *                   - id
 *             required:
 *               - name
 *               - year
 *               - author
 *     responses:
 *       201:
 *         description: Author has succesfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
movieRouter.put(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const movieInput = <MovieInput>req.body;
            const response = await movieService.updateMovie(movieInput);

        res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID to delete
 *     responses:
 *       204:
 *         description: User successfully deleted.
 *       400:
 *         description: Bad request or validation error.
 */
movieRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await movieService.deleteMovie(id);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

export { movieRouter }