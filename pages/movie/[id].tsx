import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { client } from '../api/movies';
import e from '../../dbschema/edgeql-js';
import Link from 'next/link';

export const getServerSideProps = async (
    context?: GetServerSidePropsContext
) => {
    const movie = await e
        .select(e.Movie, (movie) => ({
            id: true,
            title: true,
            actors: { id: true, name: true },
            filter_single: e.op(
                movie.id,
                '=',
                e.uuid(context!.params!.id as string)
            ),
        }))
        .run(client);
    return { props: { movie: movie! } };
}

export type GetMovie = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie: React.FC<GetMovie> = (props) => {
    return (
        <article key={props.movie.id} >
            <div className="m-3 p-3 bg-gray-300">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl">
                        <h1 >{props.movie.title}</h1>
                        <h3>Actors:</h3>
                        <div className="mx-3">
                        {props.movie.actors.map((person) => (
                            <article key={person.id}>
                                <Link href={`/person/${person.id}`} key={person.id}>
                                    {person.name}</Link></article>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>

    )
}

export default Movie;