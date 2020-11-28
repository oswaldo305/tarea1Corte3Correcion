import { Request, Response } from "express";
import PokemonService from "../services/PokemonService";

export function getAll(_: any, res: Response) {
    const pokemons = PokemonService.getAll();
    res.status(200).json(pokemons);
}

export function get(req: Request, res: Response) {
    try {
        const id = req.params.id && +req.params.id || undefined;
        if(!id){ throw "Se requiere el ID del pokemon."}
        const pokemon = PokemonService.get(id);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByName(req: Request, res: Response) {
    try {
      const name = (req.params.name && req.params.name) || undefined;
      if (!name) {
        throw "Se requiere el name del pokemon.";
      }
      const pokemons = PokemonService.getByName(name);
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  export function getByType(req: Request, res: Response) {
    try {
      const type = (req.params.type && req.params.type) || undefined;
      if (!type) {
        throw "Se requiere el Tipo del pokemon.";
      }
      const pokemons = PokemonService.getByType(type);
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  export function getstrongOrWeak(req: Request, res: Response) {
    try {

        // else if (PokemonService.get(digimon2).type[0].strongAgainst+" VS "+PokemonService.get(digimon1).name){
        //     fuerte =PokemonService.get(digimon2).name+ " es mas fuerte que  "+PokemonService.get(digimon1).name;
        // }
        // PokemonService.get(digimon1).type[0].strongAgainst+" VS "+PokemonService.get(digimon2).name
        
        res.status(200).send( PokemonService.getstrongOrWeak(req));
    } catch (error) {
        res.status(400).send(error);
    }
}
  
 
  export function createPokemon(req: Request, res: Response) {
    try {
      const {id, name, number, tName, tStrongAgainst, tWeakAgainst, img} = req.body;
      if (!id || !name || !number ||!tName || !tStrongAgainst || !tWeakAgainst || !img) {
        throw "Error, Missing data";
      }
      const pokemons = PokemonService.createPokemon(id,name, number, tName, tStrongAgainst, tWeakAgainst, img);
  
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
