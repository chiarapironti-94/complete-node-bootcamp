import { loadJSONData, readCss } from './Functions';
import { StaticFiles } from './Types';

export const staticFiles: StaticFiles = {
  data: loadJSONData(),
  css: readCss(),
};
