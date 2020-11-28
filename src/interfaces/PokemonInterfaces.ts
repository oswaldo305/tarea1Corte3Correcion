import { MonsterTypeI } from "./MonsterTypeI";

export interface PokemonI {
    id: number
    name: string
    number: number
    type: Array<MonsterTypeI>
    img: string
}
