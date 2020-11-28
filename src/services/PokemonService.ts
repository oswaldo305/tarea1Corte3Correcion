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
        const digimon1 = req.params.digimon1 && +req.params.digimon1 || undefined;
        const digimon2 = req.params.digimon2 && +req.params.digimon2 || undefined;
        if(!digimon1 || !digimon2){ throw "Se requiere el codigo del digimon."}
    
        let digi1_strongAgainst:any= PokemonService.get(digimon1).type[0].strongAgainst[0];
        let digi2_strongAgainst:any= PokemonService.get(digimon2).type[0].strongAgainst[0];
    
        let digi1_name:any = PokemonService.get(digimon1).name;
        let digi2_name:any = PokemonService.get(digimon2).name;
    
        if ( digi1_strongAgainst == digi2_name) {
            fuerte =PokemonService.get(digimon1).name+ " es mas fuerte que  "+PokemonService.get(digimon2).name;
        } else if (digi2_strongAgainst == digi1_name){
            fuerte =PokemonService.get(digimon2).name+ " es mas fuerte que  "+PokemonService.get(digimon1).name;
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

