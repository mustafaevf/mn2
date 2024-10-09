const {Platform} = require('../associations');


exports.getPlatforms = async(req, res) => {
    try {
        const platforms = await Platform.findAll();
        res.status(200).json(platforms);
    } catch(error) {
        res.status(500).json({message: error});
    }
};

exports.createPlatform = async(req, res) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Fill all fields' });
    }
  
    try {
        const newGame = await Platform.create({ title, status: 1 });
        res.status(201).json({ message: 'Game created', game: newGame });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: 'Error creating game', error });
    }
};

exports.getPlatform = async(req, res) => {
    const gameId = req.params.id;
    console.log(gameId)
    try {
        const game = await Platform.findByPk(gameId);
        if (!game) {
          return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game', error });
    }
};