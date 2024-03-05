const express = require('express');
const router = express.Router();
const path = require('path')

const characters = [
    { id: 1, name: 'Tyrion Lannister', house: 'Lannister' },
    { id: 2, name: 'Jon Snow', house: 'Stark' },
    { id: 3, name: 'Daenerys Targaryen', house: 'Targaryen' }
  ];


/*   const { getCharacters } = require('./database'); 

router.get('/index', async (req, res) => {
    try {
        const characters = await getCharacters(); 
        res.render('index', { characters }); 
    } catch (error) {
        console.error("Error fetching characters:", error);
        res.status(500).send("Error fetching characters");
    }
});
 */
router.get('/index', (req, res) => {
    res.render('index', {characters});

    
});
router.get('/create', (req, res, next) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    //adding to database...
    res.redirect('/');
  });

router.use('/update/:id', (req, res, next) => {
    const character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).send('Character not found');
  res.render('update', { character });
});

router.post('/update/:id', (req, res) => {
    //modifying to datbase
    res.redirect('/');
  });

router.post('/delete/:id', (req, res, next) => {
    //delete from database
    res.redirect('/');
});
router.get('/show/:id', (req, res, next) => {
    const character = characters.find(x => x.id === parseInt(req.params.id));
  if (!character) return res.status(404).send('Character not found');
  res.render('show', { character });
})
module.exports = router;