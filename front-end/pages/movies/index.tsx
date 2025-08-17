import MovieService from "@/services/MovieService";
import MovieOverview from "@/components//movies/movieOverview"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Movies: React.FC = () => {
    const fetch = async () => {
        const response = await MovieService.getAllMovies();
        if(!response.ok) return null;

        const movies = await response.json();
        return {movies};
    }

    const {error, isLoading, data} = useSWR("movies", fetch);
    useInterval(() => {
        mutate("movies", fetch());
    }, 1000)

    return (
        <>
            <Head>
                <title>Movies</title>
            </Head>
            <main>
                <section>
                    {error && <p>{error}</p>} 
                    {isLoading && <p>Loading...</p>}
                    {data && (<MovieOverview movies={data.movies}/>)}
                </section>
            </main>
        </>
    )
}

export default Movies