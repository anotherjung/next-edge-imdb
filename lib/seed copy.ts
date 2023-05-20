import { createClient } from "edgedb";
import e from "./dbschema/edgeql-js";
import {names} from './seedn.js';
import {titles} from './seedt.js';

const client = createClient();

async function run() {
try {
  await e.delete(e.Content).run(client);
  await e.delete(e.Person).run(client);

//names
for (const n of names) {
  console.log(1,`Creating ${n.name}...`);
  await e.insert(e.Person, { 
    name: n.name,
    nconst: n.nconst
  }).run(client);
}

  //movies
  for (const movie of titles) {
    console.log(3,`Creating ${movie.title}...`);
    
    const newMovie = await e
      .insert(e.Movie, {
        title: movie.title,
        types: "movie",
        startYear: movie.startYear,
        tconst: movie.tconst
      })
      .run(client);

    for (const actor of names) {

      await query.run(client);
    }

  }


}
catch (err){
  console.log(0,err)
}
  console.log("seed is done");
}

run();