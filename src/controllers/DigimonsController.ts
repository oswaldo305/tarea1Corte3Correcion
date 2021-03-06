import { Request, Response } from "express";
import DigimonsService from "../services/DigimonsService";

export function getAll(_: any, res: Response) {
    const digimons = DigimonsService.getAll();
    res.status(200).json(digimons);
}

export function get(req: Request, res: Response) {
    try {
        const id = req.params.id && +req.params.id || undefined;
        if(!id){ throw "Se requiere el idd del digimon."}
        const digimon = DigimonsService.get(id);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}
export function getByName(req: Request, res: Response) {
    try {
      const name = (req.params.name && req.params.name) || undefined;
      if (!name) {
        throw "Se requiere el name del digimon.";
      }
      const digimons = DigimonsService.getByName(name);
      res.status(200).json(digimons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  export function getByType(req: Request, res: Response) {
    try {
      const type = (req.params.type && req.params.type) || undefined;
      if (!type) {
        throw "Se requiere el Tipo del digimon.";
      }
      const digimons = DigimonsService.getByType(type);
      res.status(200).json(digimons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  export function getstrongOrWeak(req: Request, res: Response) {
    try {

        // else if (DigimonsService.get(digimon2).type[0].strongAgainst+" VS "+DigimonsService.get(digimon1).name){
        //     fuerte =DigimonsService.get(digimon2).name+ " es mas fuerte que  "+DigimonsService.get(digimon1).name;
        // }
        // DigimonsService.get(digimon1).type[0].strongAgainst+" VS "+DigimonsService.get(digimon2).name
        
        res.status(200).send( DigimonsService.getstrongOrWeak(req));
    } catch (error) {
        res.status(400).send(error);
    }
}
 
  
  export function createDigimon(req: Request, res: Response) {
    try {
      const {id, name, tName, tStrongAgainst, tWeakAgainst, img} = req.body;
      if (!id ||!name || !tName || !tStrongAgainst || !tWeakAgainst || !img) {
        throw "Error, Missing Data";
      }
      const digimons = DigimonsService.createDigimon(id,name, tName, tStrongAgainst, tWeakAgainst, img);
      console.log(digimons);
      res.status(200).json(digimons);
    } catch (error) {
      res.status(400).send(error);
    }
  }
