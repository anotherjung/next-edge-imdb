import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Movies } from './api/movies';
import Link from 'next/link';

const Page: NextPage = () => {
    const [movies, setMovies] = useState<Movies[] | null>(null);
    useEffect(() => {
        fetch(`api/movies`)
            .then((result) => result.json())
            .then(setMovies);
    }, []);

    if (!movies) return <p>Loading...</p>;
    return (
        <main >
            {movies.map((movie) => (
                <article key={movie.id}>
                    <div className="m-3 p-3 bg-gray-300">
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="mx-auto max-w-2xl">
                                <h2 >{movie.title}</h2>
                                <Link href={`/movie/${movie.id}`} key={movie.id}  >
                                    {movie.title}</Link>
                                <h3>Cast:</h3>
                                {movie.actors.map((person) => (
                                    <article key={person.id}>
                                        <Link href={`/person/${person.id}`} key={person.id} >
                                            {person.name}</Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </main>
    )
    //ends
}

export default Page;