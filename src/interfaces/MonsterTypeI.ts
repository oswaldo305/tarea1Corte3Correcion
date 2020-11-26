
export interface MonsterTypeI{
    name: string
    strongAgainst: Array<MonsterTypeI>
    weakAgainst: Array<MonsterTypeI>
}
