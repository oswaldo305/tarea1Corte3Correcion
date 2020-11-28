import { DigimonI } from "../interfaces/DigimonInterfaces";
const db = require("../db/Digimons.json");
import { Request, Response } from "express";
const fs = require("fs");
const json_books = fs.readFileSync("src/db/Digimons.json", "utf-8");
const dbJ: any = JSON.parse(json_books);

module DigimonsService {
  export function getAll(): Array<DigimonI> {
    const digimons: Array<DigimonI> = db;
    return digimons;
  }
  export function get(id: number): DigimonI {
    const digimons: Array<DigimonI> = db;
    const digimon: Array<DigimonI> = digimons.filter((e) => e.id === id);
    if (digimon.length < 1) {
      throw "Not found";
    }
    return digimon[0];
  }
  export function getByName(name: string): Array<DigimonI> {
    const digimons: Array<DigimonI> = db;
    const matches: Array<DigimonI> = digimons.filter(function (el) {
      return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
    if (matches.length < 1) {
      throw "Not found";
    }
    return matches;
  }
  export function getByType(type: string): Array<DigimonI> {
    const digimons: Array<DigimonI> = db;
    let matches: Array<DigimonI> = [];
    digimons.forEach((digimon) => {
      const found = digimon.type.filter((e) => e.name === type);
      if (found.length > 0) {
        matches.push(digimon);
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

    let digi1_strongAgainst:any= DigimonsService.get(digimon1).type[0].strongAgainst[0];
    let digi2_strongAgainst:any= DigimonsService.get(digimon2).type[0].strongAgainst[0];

    let digi1_name:any = DigimonsService.get(digimon1).name;
    let digi2_name:any = DigimonsService.get(digimon2).name;

    if ( digi1_strongAgainst == digi2_name) {
        fuerte =DigimonsService.get(digimon1).name+ " es mas fuerte que  "+DigimonsService.get(digimon2).name;
    } else if (digi2_strongAgainst == digi1_name){
        fuerte =DigimonsService.get(digimon2).name+ " es mas fuerte que  "+DigimonsService.get(digimon1).name;
    } else {
        fuerte ="Empate ambos tienen la misma resistencia";
    }
    return fuerte
}

  
  export function createDigimon(id: number,name: string,tName: string,tStrongAgainst: string,tWeakAgainst: string,img: string) {
    let type = [
      { name: tName, strongAgainst: tStrongAgainst, weakAgainst: tWeakAgainst },
    ];
    let nDigimon = { id, name, type, img };
    dbJ.push(nDigimon);
    const json_books = JSON.stringify(dbJ);
    fs.writeFileSync("src/db/Digimons.json", json_books, "utf-8");
    return "Digimon Succefully Created";
  }
}

export default DigimonsService;
