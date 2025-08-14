import { Movie as MoviePrisma, Author as AuthorPrisma } from '@prisma/client';
import { Author } from './author';

export class Movie{
    private id?: number;
    private name: string;
    private year: number;
    private img: string;
    private authorId: Author

    constructor(movie: { id?: number; name: string; year: number; img: string; authorId: Author}){
        this.id = movie.id;
        this.name = movie.name;
        this.year = movie.year;
        this.img = movie.img;
        this.authorId = movie.authorId;
    }

    validate(movie: {name: string; year: number; img: string; authorId: Author}) {
        if(!movie.name.trim()){
            throw new Error('Movie has to have a name');
        }
        if(!movie.year){
            throw new Error('Year of release is required');
        }
        if(!movie.img.trim()){
            throw new Error('Image is required');
        }
        if(!movie.authorId){
            throw new Error('Author is required');
        }
    }

    setId(id: number){
        this.id = id;
    }
    setName(name: string){
        this.name = name;
    }
    setYear(year: number){
        this.year = year;
    }
    setFullname(img: string){
        this.img = img;
    }
    setAuthorId(author: Author){
        this.authorId = author;
    }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getYear(): number {
        return this.year;
    }
    getImg(): string {
        return this.img;
    }
    getAuthorId(): Author {
        return this.authorId;
    }

    equals(movie: Movie): boolean {
        return (
            this.id === movie.getId() &&
            this.name === movie.getName() &&
            this.year === movie.getYear() &&
            this.img === movie.getImg() &&
            this.authorId === movie.getAuthorId()
        )
    }

    static from({id, name, year, img, authorId}: MoviePrisma & {
        authorId: AuthorPrisma;
    }){
            return new Movie({
                id,
                name,
                year,
                img,
                authorId: Author.from(authorId)
            });
        }
}