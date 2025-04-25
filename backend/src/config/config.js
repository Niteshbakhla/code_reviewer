import { config } from "dotenv";
config();

const _config = {
            PORT: process.env.PORT,
            GEMINI_KEY: process.env.GEMINI_KEY,
            MONGO_URI: process.env.MONGO_URI
}

export default Object.freeze(_config)