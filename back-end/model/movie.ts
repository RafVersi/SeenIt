import { Movie as MoviePrisma } from '@prisma/client';

export class Movie{
    private id?: number;
    private name: string;
    private year: number;
    private img: string;

    constructor(movie: { id?: number; name: string; year: number; img: string}){
        this.id = movie.id;
        this.name = movie.name;
        this.year = movie.year;
        this.img = movie.img;
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

    equals(movie: Movie): boolean {
        return (
            this.id === movie.getId() &&
            this.name === movie.getName() &&
            this.year === movie.getYear() &&
            this.img === movie.getImg() 
        )
    }

    static from({id, name, year, img}: MoviePrisma){
            return new Movie({
                id,
                name,
                year,
                img
            });
        }
}