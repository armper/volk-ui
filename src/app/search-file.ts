import { User } from './user';

export class SearchFile {
    id: string;

    createdBy: User;

    size: number;

    createdDateTime: DateTimeFormat;

    lastModified: DateTimeFormat;

    fileName: string;

    path: string;

    extension: string;

    server: string;

    share: string;
}
