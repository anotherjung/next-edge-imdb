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
            acted_in: { id: true, title: true, types: true },
            directed: { id: true, title: true, types: true },
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
    console.log(2, props)
    return (
        <main >
            <article key={props.person.id} >
                <div className="bg-gray-600 py-12 ">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mx-auto max-w-2xl">
                            <h1 >{props.person.name}</h1>
                            <h3>Acted in:</h3>
                            {props.person.acted_in.map((content) => (
                                <article key={content.id}>
                                    <Link href={`/movie/${content.id}`} key={content.id} >
                                        {content.title}</Link>
                                </article>
                            ))}
                            {/* <h3 >Directed:</h3>
                            {props.person.directed.map((content) => (
                                <Link href={`/${content.types}/${content.id}`} key={content.id} >
                                    {content.title}</Link>
                            ))} */}
                        </div>
                    </div>
                </div>
            </article>
        </main>
    )
}

export default Person;