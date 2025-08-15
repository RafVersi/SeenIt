/**
 * @swagger
 *   components:
 *    schemas:
 *      Author:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            firstname:
 *              type: string
 *              description: The first name of the author.
 *            lastname:
 *              type: string
 *              description: The last name of the author.
 *            fullname:
 *              type: string
 *              description: The full name of the author.
 *            birth:
 *              type: string
 *              format: date
 *              description: The birth date of the author.
 *            age:
 *              type: number
 *              description: The current age of the author.
 *            img:
 *              type: string
 *              description: URL to the author’s image.
 */

import express, { NextFunction, Request, Response } from 'express';
import authorService from '../service/author.service';
import { AuthorInput } from '../types';

const authorRouter = express.Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get the list of authors
 *     responses:
 *       200:
 *         description: The list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Author'
 */
authorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await authorService.getAuthors();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the author.
 *               lastname:
 *                 type: string
 *                 description: Last name of the author.
 *               fullname:
 *                 type: string
 *                 description: Full name of the author (optional, will be generated if missing).
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: Birth date of the author.
 *               img:
 *                 type: string
 *                 description: URL to the author’s image.
 *             required:
 *               - firstname
 *               - lastname
 *               - birth
 *               - img
 *     responses:
 *       201:
 *         description: The created author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */
authorRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorInput = req.body as AuthorInput;
        const newAuthor = await authorService.createAuthor(authorInput);
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
});

export { authorRouter };
