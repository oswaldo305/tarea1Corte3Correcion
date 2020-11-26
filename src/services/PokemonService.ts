import { PokemonI } from "../interfaces/PokemonInterfaces";

const db = require('../db/Pokemons.json');
const idDefect=3;
const idRandom = idDefect+1;
const fs = require("fs");
const json_books = fs.readFileSync('src/db/Pokemons.json', 'utf-8');
const datos: any = JSON.parse(json_books);

module PokemonService{

    export function getAll(): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        return pokemons
    }
    export function get(id: number): PokemonI {
        const pokemons: Array<PokemonI> = db;
        const pokemon: Array<PokemonI> = pokemons.filter(e => e.id === id);
        if (pokemon.length < 1) {
            throw "Not found"
        }
        return pokemon[0];
    }

    export function getByName(name: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        const matches: Array<PokemonI> = pokemons.filter(function (item) {
          return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        });
        if (matches.length < 1) {
          throw "Not found";
        }
        return matches;
      }

      export function getByType(type: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        let matches: Array<PokemonI> = [];
        pokemons.forEach((pokemon) => {
          const found = pokemon.type.filter((e) => e.name === type);
          if (found.length > 0) {
            matches.push(pokemon);
          }
        });
    
        if (matches.length < 1) {
          throw "No exists";
        }
        return matches;
      }

      export function createPokemon(
        name: string,
        tName: string,
        tStrongAgainst: string,
        tWeakAgainst: string,
        img: string
      ) {
        let type = {
          name: tName,
          strongAgainst: tStrongAgainst,
          weakAgainst: tWeakAgainst,
        };
        let newPoke = {
          id: idRandom, name, type, img,
        };
        datos.save(newPoke);
    
        const json_books = JSON.stringify(datos);
        fs.writeFileSync("src/db/Pokemons.json", json_books, "utf-8");
    
        return "Poke created";
      }
      export function getStrong(): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        let matches: Array<PokemonI> = [];
        let found;
        pokemons.forEach((pokemon) => {
           found = pokemon.type.filter((e) => e.strongAgainst);
          if (found.length > 0) {
            matches.push(pokemon);
          }
        });
    
        if (matches.length < 1) {
          throw "No exists";
        }
        return matches;
      }
      export function getWeak(): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        let matches: Array<PokemonI> = [];
        let found;
        pokemons.forEach((pokemon) => {
           found = pokemon.type.filter((e) => e.weakAgainst);
          if (found.length > 0) {
            matches.push(pokemon);
          }
        });
    
        if (matches.length < 1) {
          throw "No exists";
        }
        return matches;
      }

}
export default PokemonService;
