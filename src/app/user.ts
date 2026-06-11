import { SearchFile } from './search-file';

export interface User {
  id: string;
  name: string;
  domainName: string;
  searchFiles: SearchFile[];
}
