DROP DATABASE IF EXISTS "boyfriendr-dev";
CREATE DATABASE "boyfriendr-dev";
DROP DATABASE IF EXISTS "boyfriendr-test";
CREATE DATABASE "boyfriendr-test";

knex migrate:latest;
knex seed:run;
