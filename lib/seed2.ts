import {createClient} from 'edgedb';
import e from '../dbschema/edgeql-js';
//import {titles} from './seed-titles';
import * as titles from './seed-titles.json';
//import {names} from './seed-names';
import * as names from './seed-names.json';
import { Movie } from '../dbschema/edgeql-js/modules/default';

const client = createClient();

async function run() {
try {

  for ( const n of names ){
    console.log(1)fd
    console.log(1,n)
    for (const k of n.knownForTitles) {
      console.log(2,k)
      let title = await e.select(e.Movie, (movie) => ({
        title: true,
        filter: e.op(movie.tconst, "=", k)
      }));
      const actors = await e.select(e.Person, person => ({
        filter: e.op(person.nconst, 'in', e.set(n.nconst))
      }));
      const query = await e.update(title, ()=>({
        set: { actors: actors }
      }));
      const result = await query.run(client);
       console.log(3,result.length)
      if (result.length > 0) {console.log(3,result)}
    }
  }

} catch (error) {
  console.log(0,error)
} console.log(9,"seed is done")
}
run();