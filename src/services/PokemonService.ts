import { PokemonI } from "../interfaces/PokemonInterfaces";
const db = require('../db/Pokemons.json');
const fs = require("fs");
import { Request, Response } from "express";
const json_books = fs.readFileSync('src/db/Pokemons.json', 'utf-8');
const dbJ: any = JSON.parse(json_books);

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

      export function getstrongOrWeak(req: Request): string {
        let fuerte="";
        const pokemon1 = req.params.digimon1 && +req.params.pokemon1 || undefined;
        const pokemon2 = req.params.digimon2 && +req.params.pokemon2 || undefined;
        if(!pokemon1 || !pokemon2){ throw "Se requiere el codigo del pokemon."}
    
        let poke1_strongAgainst:any= PokemonService.get(pokemon1).type[0].strongAgainst[0];
        let poke2_strongAgainst:any= PokemonService.get(pokemon2).type[0].strongAgainst[0];
    
        let poke1_name:any = PokemonService.get(pokemon1).name;
        let poke2_name:any = PokemonService.get(pokemon2).name;
    
        if ( poke1_strongAgainst == poke2_name) {
            fuerte =PokemonService.get(pokemon1).name+ " es mas fuerte que  "+PokemonService.get(pokemon2).name;
        } else if (poke2_strongAgainst == poke1_name){
            fuerte =PokemonService.get(pokemon2).name+ " es mas fuerte que  "+PokemonService.get(pokemon1).name;
        } else {
            fuerte ="Empate ambos tienen la misma resistencia";
        }
        return fuerte
    }
    
      
      export function createPokemon(id:number,name: string,number:number,tName: string,tStrongAgainst: string,tWeakAgainst: string,img: string) {
        let type = [{name: tName,strongAgainst: tStrongAgainst,weakAgainst: tWeakAgainst}];
        let cPokemon = {id,name,number,type, img};
        dbJ.push(cPokemon);
        const json_books = JSON.stringify(dbJ);
        fs.writeFileSync("src/db/Pokemons.json", json_books, "utf-8");
        return "Poke Succefully Created";
      }
  
    
    }
    export default PokemonService;

