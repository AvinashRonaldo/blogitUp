import * as dotenv from "dotenv";


dotenv.config();

export const port = process.env.PORT;
export const mongoDBURI = process.env.MONGO_DB_URI;
export const tokenSecret = process.env.TOKEN_SECRET;