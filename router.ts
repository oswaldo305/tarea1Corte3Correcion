import express from 'express';
import * as DigimonsController from './src/controllers/DigimonsController';
import * as PokemonController from './src/controllers/PokemonController';

export const router = express.Router();


  router.get("/", (req, res) => {
    res.send("Typescript es lo máximo!");
  });



router.post("/", (req, res) => {
    console.log("Cuerpo:", req.body);
    res.status(200).send(req.body);
});
//Form To Create New Digi
router.get("/cD", (req, res) => {
  res.send('<form action="../../digimons/createD"   method="POST"> <p>ID: <input type="number" name="id"></p> <p>Digimons Name: <input type="text" name="name"></p> <p>Type--> Name: <input type="text" name="tName"></p> <p>Type--> Strong Against: <input type="text" name="tStrongAgainst"></p> <p>Type--> Weak Against: <input type="text" name="tWeakAgainst"></p><p>Img: <input type="text" name="img"></p><p> <input type="submit" value="Send"> <input type="reset" value="Erase"> </p> </form>');
});
router.get('/digimons', DigimonsController.getAll);
router.get('/digimons/:id', DigimonsController.get);
router.get("/digimons/name/:name", DigimonsController.getByName);
router.get("/digimons/type/:type", DigimonsController.getByType);
router.get("/digimons/strongorWeak/:digimon1/:digimon2", DigimonsController.getstrongOrWeak);
router.post("/digimons/createD", DigimonsController.createDigimon);


//Form To Create New Poke
router.get("/cP", (req, res) => {
  res.send('<form action="../../pokemon/createP"   method="POST"> <p>ID: <input type="number" name="id"></p> <p>Pokemons Name: <input type="text" name="name"><p>Number: <input type="number" name="number"></p> <p>Type--> Name: <input type="text" name="tName"></p> <p>Type--> Strong Against: <input type="text" name="tStrongAgainst"></p> <p>Type--> Weak Against: <input type="text" name="tWeakAgainst"></p><p>Img: <input type="text" name="img"></p><p> <input type="submit" value="Send"> <input type="reset" value="Erase"> </p> </form>');
});
router.get("/pokemon", PokemonController.getAll);
router.get("/pokemon/:id", PokemonController.get);
router.get("/pokemon/name/:name", PokemonController.getByName);
router.get("/pokemon/type/:type", PokemonController.getByType);
router.get("/pokemon/strongorWeak/:pokemona/:pokemonb", PokemonController.getstrongOrWeak);
router.post("/pokemon/createP", PokemonController.createPokemon);

