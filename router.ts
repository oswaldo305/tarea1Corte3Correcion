import express from 'express';
import * as DigimonsController from './src/controllers/DigimonsController';
import * as PokemonController from './src/controllers/PokemonController';

export const router = express.Router();

router.get("/cD", (req, res) => {
    res.send(
      '<form action="../../digimons/createD"   method="POST">    <label>name</label>    <input type="text" placeholder="name" name="name">   <br> <label>type</label>    <input type="text" placeholder="type name" name="type_name">  <br>  <label>Strong against:</label>    <input type="text" placeholder="type strongAgainst" name="type_strongAgainst">  <br>  <label>Weak against:</label>    <input type="text" placeholder="type weakAgainst" name="type_weakAgainst">  <br>  <label>Img</label>    <input type="text" placeholder="url" name="img">  <br>  <input type="submit" value="Submit">    </form>'
    );
  });router.get("/cP", (req, res) => {
    res.send(
      '<form action="../../pokemon/createP"   method="POST">    <label>name</label>    <input type="text" placeholder="name" name="name">   <br> <label>type</label>    <input type="text" placeholder="type name" name="type_name">  <br>  <label>Strong Against:</label>    <input type="text" placeholder="type strongAgainst" name="type_strongAgainst">  <br>  <label>weak against:</label>    <input type="text" placeholder="type weakAgainst" name="type_weakAgainst">  <br>  <label>Img</label>    <input type="text" placeholder="url" name="img">  <br>  <input type="submit" value="Submit">    </form>'
    );
  });
  
  router.get("/ts", (req, res) => {
    res.send("Typescript es lo máximo!");
  });

router.get('/digimons', DigimonsController.getAll);
router.get('/digimons/:id', DigimonsController.get);

router.post("/", (req, res) => {
    console.log("Cuerpo:", req.body);
    res.status(200).send(req.body);
});
router.get("/digimons/name/:name", DigimonsController.getByName);
router.get("/digimons/type/:type", DigimonsController.getByType);
router.get("/digimons/strong", DigimonsController.getStrong);
router.get("/digimons/weak", DigimonsController.getWeak);
router.post("/digimons/createD", DigimonsController.createDigimon);

router.get("/pokemon", PokemonController.getAll);
router.get("/pokemon/:id", PokemonController.get);
router.get("/pokemon/name/:name", PokemonController.getByName);
router.get("/pokemon/type/:type", PokemonController.getByType);
router.post("/pokemon/createP", PokemonController.createPokemon);
router.get("/pokemon/strong", PokemonController.getStrong);
router.get("/pokemon/weak", PokemonController.getWeak);

