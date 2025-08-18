import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private firstname: string;
    private lastname: string;
    private username: string;
    private email: string;
    private img: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        img: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        this.email = user.email;
        this.img = user.img;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }


    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getImg(): string {
        return this.img;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        img: string;
        password: string;
        role: Role;
    }) {
        if (!user.firstname?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastname?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.img?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.firstname === user.getFirstname() &&
            this.lastname === user.getLastname() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.img === user.getImg() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    static from({ id, username, firstname, lastname, email, img, password, role }: UserPrisma) {
        return new User({
            id,
            firstname,
            lastname,
            username,
            email,
            img,
            password,
            role: role as Role,
        });
    }
}