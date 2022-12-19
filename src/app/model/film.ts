import { Regista } from "./regista";

export class Film {
    constructor(
        public id?: number,
        public titolo?: string,
        public genere?: string,
        public dataPubblicazione?: Date,
        public minutiDurata?: number,
        public regista?: Regista
    ) { }
}
