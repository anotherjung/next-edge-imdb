module default {
type Person {
    required property nconst -> str;
    required property name -> str;
    multi link actedIn := .<actors[is Movie];
    constraint exclusive on ((.name ,.nconst));
}

type Movie {
    required property tconst -> str;
    required property title -> str;
    property startYear -> int32;
    multi link actors -> Person;
    constraint exclusive on ((.title, .tconst));
}

}
