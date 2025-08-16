import AuthorService from "@/services/AuthorService";
import AuthorOverview from '@/components/authors/AuthorOverview';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Authors: React.FC = () => {

    const fetch = async () => {
        const response = await AuthorService.getAllAuthors();
        if(!response.ok) return null;

        const authors = await response.json();
        return {authors};
    }

    const {error, isLoading, data} = useSWR("authors", fetch);
    useInterval(() => {
        mutate("authors", fetch());
    }, 1000)

    return  (
        <>
            <Head>
                <title>Auhtors</title>
            </Head>
            <main className="p-6 min-h-screen flex flex-col items-center">
                <section className="mt-5">
                    {error && <p className="text-danger">{error}</p>} 
                    {isLoading && <p>Loading...</p>}
                    {data && (<AuthorOverview authors={data.authors}/>)}
                </section>
            </main>
        </>
    )
}

export default Authors