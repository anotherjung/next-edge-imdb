import {createClient} from 'edgedb';
import e from '../dbschema/edgeql-js';

const client = createClient();

async function run() {
try {
    await e.delete(e.Movie).run(client);
    await e.delete(e.Person).run(client);  
} catch (error) {
  console.log(0,error)
} console.log(9,"seed delete is done")
}
run();