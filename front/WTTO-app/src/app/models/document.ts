import { Address } from './address';

export class Document {
    public id: number;
    public firstName: string;
    public lastName: string;
    public addresses: Address[];
}
