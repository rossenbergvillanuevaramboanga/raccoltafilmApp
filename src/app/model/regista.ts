import { Film } from "./film";
import { Sesso } from "./sesso";

export interface Regista {

    id?: number,
    nome: string,
    cognome: string,
    nickName: string,
    dataDiNascita: Date,
    sesso: Sesso,
    films?: Film[]
}
