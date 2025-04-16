import Server from "./Server/Server";
import { staticFiles } from './Utils/Static';

const application = new Server(staticFiles);
application.listen(8000);
