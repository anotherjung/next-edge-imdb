// pages/api/person.ts

import type {NextApiRequest, NextApiResponse} from 'next';
import {createClient} from 'edgedb';
import e, {$infer} from '../../dbschema/edgeql-js';

export const client = createClient();

const selectPersons = e.select(e.Person, () => ({
  id: true,
  name: true,
  acted_in: {
    id: true,
    title: true,
    types: true
  },
  directed: {
    id: true,
    title: true,
    types: true
  },
}));

export type Persons = $infer<typeof selectPersons>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const persons = await selectPersons.run(client);
  res.status(200).json(persons);
}
