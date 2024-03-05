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
      };
  
      
      
      let character_2 = {
        
          "id" : 2,
          "name" : "Arya Stark",
          "house" : "Stark",
      };
  
      let character_3 = {
          "id" : 3,
          "name" : "Jaime Lannister",
          "house" : "Lannister",

      };
  
      // Create exactly ONE document
      await createDoc (client, dbName, "Characters", character_2);
      await createDoc (client, dbName, "Characters", character_3);
      await createDoc(client, dbName, "Characters", character_1); 
      await getCharacters();
  
  

  
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
    return await collection.find({}).toArray(); // Fetch all characters
}

async function insertCharacter(character) {
    const db = await connectToDb();
    const collection = db.collection('Characters');
    await collection.insertOne(character);
}
async function connectToDb() {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(dbName); // return the database instance
}

testingDb();

module.exports = {
    getCharacters,
    insertCharacter,
    connectToDb
};