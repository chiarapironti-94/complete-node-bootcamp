import * as fs from 'fs';
import * as path from 'path';
import { Product } from './Types';

export const loadJSONData = (): Product[] => {
  // safe way to get paths cross-OS
  const dataPath = path.resolve(__dirname, '..', '..', 'dev-data', 'data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');

  return JSON.parse(rawData);
};

export const readCss = () => {
  // safe way to get paths cross-OS
  const cssPath = path.resolve(__dirname, '../public/styles.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  return css;
};

export const serveHtml = () => {
  return `<html>
            <head>
              <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
              <h1>Hello from the Node server!</h1>
            </body>
          </html>`;
};
