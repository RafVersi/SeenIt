import { Author as AuthorPrisma } from '@prisma/client';

export class Author {
    private id?: number;
    private firstname: string;
    private lastname: string;
    private fullname: string;
    private birth: Date;
    private age: number;

    constructor(author: {id?: number; firstname: string; lastname: string; fullname: string; birth: Date; age: number}){
        this.validate(author);

        this.id = author.id;
        this.firstname = author.firstname;
        this.lastname = author.lastname;
        this.fullname = author.fullname;
        this.birth = author.birth;
        this.age = author.age;
    }

    validate(author: {firstname: string; lastname: string; birth: Date}) {
        if(!author.firstname.trim()){
            throw new Error('firstname is required');
        }
        if(!author.lastname.trim()){
            throw new Error('lastname is required');
        }
        if(!author.birth){
            throw new Error('birthdate is required');
        }
    }

    setId(id: number){
        this.id = id;
    }
    setFirstname(firstname: string){
        this.firstname = firstname;
    }
    setLastname(lastname: string){
        this.lastname = lastname;
    }
    setFullname(fullname: string){
        this.fullname = fullname;
    }
    setBirth(birth: Date){
        this.birth = birth;
    }
    setAge(age: number){
        this.age = age;
    }

    getId(): number | undefined {
        return this.id;
    }
    getFisrtname(): string {
        return this.firstname;
    }
    getLastname(): string {
        return this.lastname;
    }
    getFullname(): string {
        return `${this.firstname} ${this.lastname}`;
    }
    getBirth(): Date {
        return this.birth;
    }
    getAge(): number {
        const now = new Date();
        let age = now.getFullYear() - this.birth.getFullYear();
        const hasHadBirthdayThisYear =
            now.getMonth() > this.birth.getMonth() ||
            (now.getMonth() === this.birth.getMonth() && now.getDate() >= this.birth.getDate());
        if (!hasHadBirthdayThisYear) age--;
        return age;
    }

    equals(author: Author): boolean {
        return (
            this.id === author.getId() &&
            this.firstname === author.getFisrtname() &&
            this.lastname === author.getLastname() &&
            this.fullname === author.getFullname() &&
            this.birth === author.getBirth() &&
            this.age === author.getAge()
        )
    }

    static from({id, firstname, lastname, fullname, birth, age}: AuthorPrisma){
        return new Author({
            id,
            firstname,
            lastname,
            fullname,
            birth,
            age
        });
    }
}