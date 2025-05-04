import * as path from 'path';
import dotenv from 'dotenv';

const configEnvPath = path.resolve(__dirname, '../config.env');
console.log('configEnvPath is ', configEnvPath);

dotenv.config({ path: configEnvPath });
