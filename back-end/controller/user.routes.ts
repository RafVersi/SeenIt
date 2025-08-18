/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            firstname:
 *              type: string
 *              description: First name of the user.
 *            lastname:
 *              type: string
 *              description: Last name of the user.
 *            username:
 *              type: string
 *              description: Username of the user.
 *            email:
 *              type: string
 *              description: Email.
 *            img:
 *              type: string
 *              description: Img of the user.
 *            password:
 *              type: string
 *              description: Password of the user.
 *            role:
 *              type: string
 *              description: Role of the User.
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/index';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object.
 */
userRouter.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await userService.getUserById({id});

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: log in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: new username
 *               password:
 *                 type: string
 *                 description: new password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: user logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: adding a user
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
 *               username:
 *                 type: string
 *                 description: new username
 *               email:
 *                 type: string
 *                 description: new email
 *               img:
 *                 type: string
 *                 description: new image
 *               password:
 *                 type: string
 *                 description: new password
 *               role:
 *                 type: string
 *                 description: new image
 *             required:
 *               - firstname
 *               - lastname
 *               - username
 *               - email
 *               - img
 *               - password
 *               - role 
 *     responses:
 *       201:
 *         description: created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update the user
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
 *                 description: new firstname
 *               firstname:
 *                 type: string
 *                 description: new firstname
 *               lastname:
 *                 type: string
 *                 description: new lastname
 *               username:
 *                 type: string
 *                 description: new username
 *               email:
 *                 type: string
 *                 description: new email
 *               img:
 *                 type: string
 *                 description: new image
 *               password:
 *                 type: string
 *                 description: new password
 *               role:
 *                 type: string
 *                 description: new image
 *             required:
 *               - id
 *     responses:
 *       201:
 *         description: User has succesfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput = <UserInput>req.body;
            const response = await userService.updateUser(userInput);

        res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to delete
 *     responses:
 *       204:
 *         description: User successfully deleted.
 *       400:
 *         description: Bad request or validation error.
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await userService.deleteUser(id);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

export { userRouter }