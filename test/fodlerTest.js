const axios = require('axios');
const { use } = require('chai');
const chai = require('chai');

const { DESCRIBE } = require('sequelize');
const { assert } = chai;
const { Folder, File } = require('../src/db/models');

describe('New Folder Should be created', function() {


    before('Create New Folder and Insert', async function() {
        this.currentTest.folder = await axios({
            method: 'post',
            url: 'http://localhost:5555/folders',
            data: {
                name: "New_Folder_Test_Last",
                userId: 1
            },
        });
    });

    it('Folder should be created', async function() {
        let id = this.test.folder.data.id;
        let getFolder = await axios.get('http://localhost:5555/folders/' + id);
        let getId = getFolder.data.id;
        assert.equal(getId, id);
    });

    /*
    it('Folder should not be created', async function() {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:5555/folders',
            data: {
                name: "",
                userId: 1
            },
        });
        console.log(res.data);
        // assert.equal(res, 400);

    });
*/
    after('Delete Created Folder', async function() {
        let deleteId = this.currentTest.folder.data.id;
        await axios.delete('http://localhost:5555/folders/' + deleteId);
    });

});