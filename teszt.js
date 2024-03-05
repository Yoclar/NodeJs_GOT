const { getCharacters } = require('./database');
const { connectToDb } = require('./database');

async function testGetCharacters() {
    try {
        // Call connectToDb to ensure the connection is established
        await connectToDb();

        const characters = await getCharacters();
        console.log('Characters:', characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

testGetCharacters();