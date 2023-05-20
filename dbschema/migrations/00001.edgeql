CREATE MIGRATION m1hg2u3y73lzhpqydt2kx3sydl3iwarqcnc7fd3j5jf5ebmv65gjaa
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Movie {
      CREATE REQUIRED PROPERTY tconst -> std::str;
      CREATE REQUIRED PROPERTY title -> std::str;
      CREATE CONSTRAINT std::exclusive ON ((.title, .tconst));
      CREATE PROPERTY startYear -> std::int32;
      CREATE PROPERTY titleType -> std::str;
  };
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY nconst -> std::str;
      CREATE CONSTRAINT std::exclusive ON ((.name, .nconst));
      CREATE PROPERTY birthYear -> std::int32;
      CREATE PROPERTY deathYear -> std::int32;
  };
  ALTER TYPE default::Movie {
      CREATE MULTI LINK actors -> default::Person;
  };
  ALTER TYPE default::Person {
      CREATE MULTI LINK actedIn := (.<actors[IS default::Movie]);
  };
};
