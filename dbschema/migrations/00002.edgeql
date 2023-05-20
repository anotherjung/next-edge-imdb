CREATE MIGRATION m1dlqicj3bxb2s5n2act7nbtd7nofsr4xfolxn2dg74lv6plzpf5nq
    ONTO m1hg2u3y73lzhpqydt2kx3sydl3iwarqcnc7fd3j5jf5ebmv65gjaa
{
  ALTER TYPE default::Movie {
      DROP PROPERTY titleType;
  };
  ALTER TYPE default::Person {
      DROP PROPERTY birthYear;
      DROP PROPERTY deathYear;
  };
};
