import { DigimonI } from "../interfaces/DigimonInterfaces";
const db = require("../db/Digimons.json");
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

  export function getVersus(digimona: string, digimonb: string) {
    const digimons: Array<DigimonI> = db;
    const digimonaa:any[] = [];
    const digimonbb:any[] = [];
    const digimon2: Array<DigimonI> = digimons.filter(function (item) {
      if(item.name.toLowerCase().indexOf(digimonb.toLowerCase()) > -1){
        digimonbb.push(item.name);
      }
      return item.name.toLowerCase().indexOf(digimonb.toLowerCase()) > -1;
    });
    
    const digimon1: Array<DigimonI> = digimons.filter(function (item) {
      if(item.name.toLowerCase().indexOf(digimona.toLowerCase()) > -1){
        digimonaa.push(item.name);
      }
      return item.name.toLowerCase().indexOf(digimona.toLowerCase()) > -1;
    });
    if (digimon1.length < 1 && digimon2.length < 1) {
      throw "Digimon not found";
    }
    const fuerte:any[] = [];
    const debil:any[] = [];
    const types:any[] = [];
    const respuesta:any[] = [];
    digimon1.forEach(digi=>{
      digi.type.forEach(tipo=>{
        fuerte.push(tipo.strongAgainst);
      });
    });
    digimon1.forEach(digi=>{
      digi.type.forEach(tipo=>{
        debil.push(tipo.weakAgainst);
      });
    });
    digimon2.forEach(digi=>{
      digi.type.forEach(tipo=>{
        types.push(tipo.name.toLowerCase());
      });
    });
    if(types[0]==fuerte[0]){
      respuesta.push(digimonaa+" is strong against: "+digimonbb);
    }else if(types[0]==debil[0]){
      respuesta.push(digimonaa+" is weak against: "+digimonbb);
    }
    return respuesta[0].toString();
    
 
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
