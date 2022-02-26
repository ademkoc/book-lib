import knexInit from "knex";
import knexFile from "./knexfile.js";

export const knex = knexInit(knexFile.development);
export default knex;
