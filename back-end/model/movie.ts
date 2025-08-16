import { Movie as MoviePrisma, Author as AuthorPrisma } from '@prisma/client';
import { Author } from './author';

export class Movie {
    private id?: number;
    private name: string;
    private year: number;
    private img?: string;
    private author: Author

    constructor(movie: { id?: number; name: string; year: number; img?: string; author: Author }) {
        this.id = movie.id;
        this.name = movie.name;
        this.year = movie.year;
        this.img = movie.img;
        this.author = movie.author;
    }

    validate(movie: { name: string; year: number; img: string; author: Author }) {
        if (!movie.name.trim()) {
            throw new Error('Movie has to have a name');
        }
        if (!movie.year) {
            throw new Error('Year of release is required');
        }
        if (!movie.img.trim()) {
            throw new Error('Image is required');
        }
        if (!movie.author) {
            throw new Error('Author is required');
        }
    }

    setId(id: number) {
        this.id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setYear(year: number) {
        this.year = year;
    }
    setFullname(img: string) {
        this.img = img;
    }
    setAuthor(author: Author) {
        this.author = author;
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
    getImg(): string | undefined {
        return this.img;
    }
    getAuthor(): Author {
        return this.author;
    }

    equals(movie: Movie): boolean {
        return (
            this.id === movie.getId() &&
            this.name === movie.getName() &&
            this.year === movie.getYear() &&
            this.img === movie.getImg() &&
            this.author === movie.getAuthor()
        )
    }

    static from({ id, name, year, img, author }: MoviePrisma & {
        author: AuthorPrisma;
    }) {
        return new Movie({
            id,
            name,
            year,
            img: img || undefined,
            author: Author.from(author)
        });
    }
}

// ctrl A + ctrl KF