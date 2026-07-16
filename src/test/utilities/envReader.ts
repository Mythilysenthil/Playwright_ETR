import * as dotenv from "dotenv";
import * as path from "path";

<<<<<<< HEAD:src/tests/utilities/envReader.ts
export const getEnv = () => {
=======
export const getEnv = (): string => {
>>>>>>> 7b92136 (Added reports and hooks and world):src/test/utilities/envReader.ts
    const envName = process.env.ENV || "qa";
    const envPath = path.resolve( "env", `.env.${envName}`);
    console.log(`Loading environment variables from: ${envPath}`);
    
    dotenv.config({
        path: envPath,
        override: true
    });
    const baseUrl = process.env.BASE_URL?.trim();
    if (!baseUrl) {
        throw new Error(`BASE_URL is not defined. Checked: ${envPath}`);
    }
    return baseUrl;
};