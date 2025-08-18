import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    return user;
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username: userInput.username });
    const existingemail = await userDB.getUserByEmail({ email: userInput.email });

    if (existingUser || existingemail) {
        throw new Error(`User or email is already occupied.`);
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const newUser = new User({
        firstname: userInput.firstname, 
        lastname: userInput.lastname,  
        username: userInput.username, 
        email: userInput.email,
        img: userInput.img,
        password: hashedPassword,  
        role: userInput.role
    });

    return await userDB.createUser(newUser);
};

const updateUser = async (userInput: UserInput): Promise<User> => {
    const { id, firstname, lastname, username, email, img, password, role} = userInput

    if (!id) {
        throw new Error('Author ID is required for update');
    }

    const existingUser = await getUserById({ id });

    const updatedUser = new User({
        id: existingUser.getId(),
        firstname,
        lastname,
        username,
        email,
        img,
        password,
        role,
    });

    return await userDB.updateAuthor(updatedUser);
}

const deleteUser = async (userId: number): Promise<void> => {
    const existingUser = await getUserById({ id: userId });
    await userDB.deleteUser(existingUser.getId()!);
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstname()} ${user.getLastname()}`,
        role: user.getRole(),
    };
};

export default { 
    getAllUsers,
    getUserById,
    getUserByUsername, 
    createUser,
    updateUser,
    deleteUser,
    authenticate
};