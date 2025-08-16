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
 *              description: First name of the author.
 *            lastname:
 *              type: string
 *              description: Last name of the author.
 *            fullname:
 *              type: string
 *              description: Full name of the author.
 *            birth:
 *              type: string
 *              format: date-time
 *              description: Date of birth.
 *            age:
 *              type: number
 *              format: int64
 *              description: Age of the author.
 *            img:
 *              type: string
 *              description: image of the author.
 */

import express, { NextFunction, Request, Response } from 'express';
import authorService from '../service/author.service';
import { AuthorInput } from '../types';

const authorRouter = express.Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get the list of all authors
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
 * /authors/{id}:
 *   get:
 *     summary: Get a specific author by ID
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
authorRouter.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const author = await authorService.getAuthorById({id});

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: adding an author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: new firstname
 *               lastname:
 *                 type: string
 *                 description: new lastname
 *               birth:
 *                 type: string
 *                 format: date-time
 *                 description: new date of birth
 *               img:
 *                 type: string
 *                 description: new image
 *             required:
 *               - firstname
 *               - lastname
 *               - birth
 *     responses:
 *       201:
 *         description: created author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */
authorRouter.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorInput = <AuthorInput>req.body;
            const response = await authorService.createAuthor(authorInput);

        res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /authors:
 *   put:
 *     summary: Update the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 format: int64
 *               firstname:
 *                 type: string
 *                 description: new firstname
 *               lastname:
 *                 type: string
 *                 description: new lastname
 *               birth:
 *                 type: string
 *                 format: date-time
 *                 description: new date of birth
 *               img:
 *                 type: string
 *                 description: new image
 *             required:
 *               - firstname
 *               - lastname
 *               - birth
 *     responses:
 *       201:
 *         description: Author has succesfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */
authorRouter.put(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorInput = <AuthorInput>req.body;
            const response = await authorService.updateAuthor(authorInput);

        res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Author ID to delete
 *     responses:
 *       204:
 *         description: User successfully deleted.
 *       400:
 *         description: Bad request or validation error.
 */
authorRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await authorService.deleteAuthor(id);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
  });

export { authorRouter }