import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Persons } from './api/persons';
import Link from 'next/link';

const Page: NextPage = () => {
    const [persons, setPersons] = useState<Persons[] | null>(null);
    useEffect(() => {
        fetch(`api/persons`)
            .then((result) => result.json())
            .then(setPersons);
    }, []);

    if (!persons) return <p>Loading...</p>;
    console.log(3,persons)
    return (
        <main>
            {persons.map((person) => (
                <article key={person.id} >
                    <div className="m-3 p-3 bg-gray-300">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <p>{person.nconst}</p>
                                <Link href={`/person/${person.id}`} key={person.id}><p>{person.name}</p></Link>
                                <div className='mx-3'><h3>Other Movies:</h3>
                                {person.actedIn.map((movie)=>(
                                    <Link key={movie.id} href={`/movie/${movie.id}`}><p>{movie.title}</p></Link>
                                ))}</div>
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