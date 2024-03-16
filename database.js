const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

global.dbName = "GotRpg";

async function testingDb() {
    try {
      await client.connect();
      await createDb(client, dbName);
  
   
        let character_1 = {
        "id": 1,
        "name": "Cersei Lannister",
        "house": "Lannister",
        "attack" : 25,
        "defense": 12
      }
  
      
      
      let character_2 = {
        
          "id" : 2,
          "name" : "Arya Stark",
          "house" : "Stark",
          "attack": 23,
          "defense": 18
      };
  
      let character_3 = {
          "id" : 3,
          "name" : "Jaime Lannister",
          "house" : "Lannister",
          "attack" : 20,
          "defense": 15

      };
  
      // Create exactly ONE document
      await createDoc (client, dbName, "Characters", character_2);
      await createDoc (client, dbName, "Characters", character_3);
      await createDoc(client, dbName, "Characters", character_1);  
 
  
  

  
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
}

async function createDb(client, dbName) 
{
    const dbObject = await client.db(dbName);
    console.log(`${dbName} was created successfully.`);
}

async function createDoc(client, dbName, collectionName, doc) 
{
  const dbObject = await client.db(dbName);
  const collection = dbObject.collection(collectionName);
  const result = await collection.insertOne(doc);
  console.log(
    `The new document was created with the following id: ${result.insertedId}`
  );
}


async function getCharacters() {
    const db = await connectToDb();
    const collection = db.collection('Characters');
    return await collection.find({}).toArray(); 
}

async function insertCharacter(character) {
    const db = await connectToDb();
    const collection = db.collection('Characters');
    const lastCharacter = await collection.find().sort({id: -1}).limit(1).toArray();
    const lastId = lastCharacter.length > 0 ? lastCharacter[0].id : 0;
    character.id = lastId + 1;
    await collection.insertOne(character);

}
async function connectToDb() {
    await client.connect();
    return client.db(dbName); 
}

async function getCharactersById(id) {
      const db = await connectToDb();
      const collection = db.collection('Characters');
      const character = await collection.findOne({ id: parseInt(id) });
      return character;
  }

  async function deleteCharacterById(id) {
    const db = await connectToDb();
    const collection = db.collection('Characters');
    await collection.deleteOne({ id: parseInt(id) });
  }

  async function fetchCharacterStats(characterId) {
    const response = await fetch(`/characters/${characterId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character stats');
    }
    return await response.json();
  }
/*  testingDb();   */ 

module.exports = {
    getCharacters,
    insertCharacter,
    connectToDb,
    getCharactersById,
    deleteCharacterById,
    fetchCharacterStats
 

};