import * as fs from "fs";
import * as path from "path";
import { Product } from "./Types";

export const loadJSONData = (): Product[] => {
  // safe way to get paths cross-OS
  const dataPath = path.join(__dirname, "..", "..", "dev-data", "data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");

  return JSON.parse(rawData);
};
