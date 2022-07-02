const express = require('express');
const app = express();
app.use(express.json());


app.get('/', function(req, res) {
    res.send('App Corriendo')
})

const { User, File, Folder } = require('./src/db/models');
const res = require('express/lib/response');

// get all folders
app.get('/folders', async function(req, res) {
    try {

        let folders = await Folder.findAll();
        return res.status(201).send(folders);

    } catch (error) {
        res.status(400).send(error.error);
    }

});


app.get('/folders/:id', async function(req, res) {
    try {
        let id = req.params.id;
        let folder = await Folder.findByPk(id);
        res.status(201).json(folder);

    } catch (error) {
        res.status(400).send(error.error);
    }
});


// crear una carpeta
app.post('/folders', async function(req, res) {
    try {
        const { name, userId } = req.body;
        if (name != "") {
            let folder = await Folder.create({
                name: name,
                userId: userId,
                createdAt: new Date(),
            });

            res.status(201).json(folder);
        } else {
            res.status(201).send("empty name");
        }

    } catch (error) {
        res.status(400).send(error.error);
    }
});

app.delete('/folders/:id', async function(req, res) {
    try {
        let folderId = req.params.id;
        // let folder = Folder.findByPk(folderId);
        await Folder.destroy({ where: { id: folderId } });

        res.status(201).send('Deleted');

    } catch (error) {
        res.status(400).send(error.error);
    }

});

// same as PUT
app.patch('/folders/:id', async function(req, res) {
    try {
        let folderId = req.params.id;
        let { name } = req.body;
        let { userId } = req.body;

        let folder = await Folder.findOne({ where: { id: folderId } });

        await folder.update({
            name: name,
            userId: userId,
            updatedAt: new Date(),
        });

        return res.status(201).send('Carpeta Actualizada');
    } catch (err) {
        res.status(400).send('No Se pudo realizar la operacion');
    }
});



// crear un usuario
app.post('/users/', async function(req, res) {
    try {
        const { name, email } = req.body;

        await User.create({
            name: name,
            email: email,
            createdAt: new Date(),
        });

        return res.status(201).send('Usuario Creado');
    } catch (err) {
        res.status(400).send('No Se pudo realizar la operacion')
    }
});


app.post('/users/addfiles', async function(req, res) {
    try {
        let { userId, fileId } = req.body;

        let user = await User.findByPk(userId);
        let file = await File.findByPk(fileId);

        await user.addFile(file);
        let userFiles = await user.getFiles();
        return res.status(200).json(userFiles);
    } catch (error) {
        return res.status(400).json(error.error);
    }
});

app.get('/users/:userid/files', async function(req, res) {
    try {
        let userId = req.params.userid;
        let user = await User.findByPk(userId);
        let userFiles = await user.getFiles();

        return res.status(200).json(userFiles);
    } catch (error) {
        return res.status(400).json(error.error);
    }

});


// app.listen(process.env.APP_PORT);

require('dotenv').config()
app.listen(process.env.APP_PORT, function(err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.APP_PORT);
});