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
    return (
        <main>
            {persons.map((person) => (
                <article key={person.id} >
                    <div className="m-3 p-3 bg-gray-300">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <h1>{person.name}</h1>
                                <Link href={`/person/${person.id}`} key={person.id}><p>{person.name}</p></Link>
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