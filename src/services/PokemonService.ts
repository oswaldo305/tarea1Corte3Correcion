import { PokemonI } from "../interfaces/PokemonInterfaces";
const db = require('../db/Pokemons.json');
const fs = require("fs");
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

      export function getVersus(pokemona:string,pokemonb:string){
          const pokemons: Array<PokemonI> = db;
          const pokemonaa:any[] = [];
          const pokemonbb:any[] = [];
        
          const pokemon1: Array<PokemonI> = pokemons.filter(function (item) {
            if(item.name.toLowerCase().indexOf(pokemona.toLowerCase()) > -1){
              pokemonaa.push(item.name);
            }
            return item.name.toLowerCase().indexOf(pokemona.toLowerCase()) > -1;
          });

          const pokemon2: Array<PokemonI> = pokemons.filter(function (item) {
            if(item.name.toLowerCase().indexOf(pokemonb.toLowerCase()) > -1){
              pokemonbb.push(item.name);
            }
            return item.name.toLowerCase().indexOf(pokemonb.toLowerCase()) > -1;
          });
          if (pokemon1.length < 1 && pokemon2.length < 1) {
            throw "Pokemons Not found";
          }
          const fuerte:any[] = [];
          const debil:any[] = [];
          const types:any[] = [];
          const respuesta:any[] = [];
          pokemon1.forEach(digi=>{
            digi.type.forEach(tipo=>{
              fuerte.push(tipo.strongAgainst);
            });
          });
          pokemon1.forEach(digi=>{
            digi.type.forEach(tipo=>{
              debil.push(tipo.weakAgainst);
            });
          });
          pokemon2.forEach(digi=>{
            digi.type.forEach(tipo=>{
              types.push(tipo.name.toLowerCase());
            });
          });
          if(types[0]==fuerte[0]){
            respuesta.push(pokemonaa+" is strong against: "+pokemonbb);
          }else if(types[0]==debil[0]){
            respuesta.push(pokemonaa+" is weak against: "+pokemonbb);
          }else{
            respuesta.push(pokemonaa+" is same against: "+pokemonbb);
          }
          return respuesta[0].toString();
       
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

