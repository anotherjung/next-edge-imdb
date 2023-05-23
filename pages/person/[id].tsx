import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { client } from '../api/movies';
import e from '../../dbschema/edgeql-js';
import Link from 'next/link';

export const getServerSideProps = async (
    context?: GetServerSidePropsContext
) => {
    const person = await e
        .select(e.Person, (person) => ({
            id: true,
            name: true,
            nconst: true,
            actedIn: {id:true, title:true},
            filter_single: e.op(
                person.id,
                '=',
                e.uuid(context!.params!.id as string)
            ),
        }))
        .run(client);
    return { props: { person: person! } };
}

export type GetMovie = InferGetServerSidePropsType<typeof getServerSideProps>;

const Person: React.FC<GetMovie> = (props) => {
    console.log(4,props.person)
    return (
        <main >
            <article key={props.person.id} >
            <div className="m-3 p-3 bg-gray-300">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl">
                            <h1 >{props.person.name}</h1>
                            <p>{props.person.nconst}</p>
                            <h3>Acted in:</h3>
                            <div className="mx-3">
                            {props.person.actedIn.map((content) => (
                                <article key={content.id}>
                                    <Link href={`/movie/${content.id}`} key={content.id} >
                                        {content.title}</Link>
                                </article>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    )
}

export default Person;