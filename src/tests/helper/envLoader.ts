import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export function loadEnvVariables() {
    const rootDir = path.resolve(__dirname, '../../../');
    const envFilePath = path.join(rootDir, '.env.local');

    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
    } else {
        console.warn(`Env file ${envFilePath} not found. Skipping.`);
    }
}
