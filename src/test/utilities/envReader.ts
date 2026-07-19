import * as dotenv from "dotenv";
import * as path from "path";

export const getEnv = (): string => {

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