import { DigimonI } from "../interfaces/DigimonInterfaces";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
const db = require('../db/Digimons.json');
const idDefect=3;
const idRandom = idDefect+1;
const fs = require("fs");
const json_books = fs.readFileSync('src/db/Digimons.json', 'utf-8');
const datos: any = JSON.parse(json_books);

module DigimonsService { 
    export function getAll(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        return digimons
    }
    export function get(id: number): DigimonI {
        const digimons: Array<DigimonI> = db;
        const digimon: Array<DigimonI> = digimons.filter(e => e.id === id);
        if (digimon.length < 1) {
            throw "Not found"
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
      export function getStrong(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matches: Array<DigimonI> = [];
        let found;
        digimons.forEach((digimon) => {
           found = digimon.type.filter((e) => e.strongAgainst);
          if (found.length > 0) {
            matches.push(digimon);
          }
        });
    
        if (matches.length < 1) {
          throw "No exists";
        }
        return matches;
      }
      export function getWeak(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matches: Array<DigimonI> = [];
        let found;
        digimons.forEach((digimon) => {
           found = digimon.type.filter((e) => e.weakAgainst);
          if (found.length > 0) {
            matches.push(digimon);
          }
        });
    
        if (matches.length < 1) {
          throw "No exists";
        }
        return matches;
      }

      export function createDigimon(
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
        let newDigi = {
          id: idRandom, name, type, img,
        };
        datos.save(newDigi);
    
        const json_books = JSON.stringify(datos);
        fs.writeFileSync("src/db/Digimons.json", json_books, "utf-8");
    
        return "Digi created";
      }
    
    
}

export default DigimonsService;
