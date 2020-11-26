import { MonsterTypeI } from "./MonsterTypeI";

export interface PokemonI {
    id: number
    name: string
    type: Array<MonsterTypeI>
    img: string
}
