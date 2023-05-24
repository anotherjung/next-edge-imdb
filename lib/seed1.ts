import {createClient} from 'edgedb';
import e from '../dbschema/edgeql-js';
import * as titles from './seed-titles.json';
import * as names from './seed-names.json';
import { Person } from '../dbschema/edgeql-js/modules/default';

const client = createClient();

async function run() {
try {
  for (const t of titles) {
    console.log(1,`inserting ${t.title}`);
    await e.insert(e.Movie, {
      title: t.title,
      tconst: t.tconst,
      startYear: parseInt(t.startYear),
    }).run(client);
  }

  for (const n of names) {
    console.log(2,`inserting ${n.name}`);
    await e.insert(e.Person,{
      name: n.name,
      nconst: n.nconst,
    }).run(client);
  }

} catch (error) {
  console.log(0,error)
} console.log(9,"seed is done")
}
run();