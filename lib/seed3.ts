import {createClient} from 'edgedb';
import e from '../dbschema/edgeql-js';
import { Movie } from '../dbschema/edgeql-js/modules/default';

const client = createClient();

async function run() {
try {

  const title = e.select(e.Movie, (movie) => ({
    title: true,
    filter: e.op(movie.tconst, "=", 'tt0006581')
  }));

  const actors = e.select(e.Person, person => ({
    filter: e.op(person.nconst, 'in', e.set('nm0023199', 'nm0023198'))
  }));

  const query = e.update(title, ()=>({
    set: { actors: actors }
  }));
    
  const result = await query.run(client);
  console.log(3,result)

} catch (error) {
  console.log(0,error)
} console.log(9,"seed is done")
}
run();