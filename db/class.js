const fs = require("fs");
const util = require("util");
const uuid = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    readNote(){
        return readFileAsync("db/db.json", "utf-8");
    }
    writeNote(note){
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNote(){
        return this.readNote().then((data) => {
            let addedNotes;
            try {
                addedNotes = [].concat(JSON.parse(data));
            } catch (error) {
             addedNotes = [];   
            }
            return addedNotes;
        });
    }

    addNote(note){
        const {title, text} = note;

        if (!title || !text) {
            throw err;
        }

        const finalNote = {title, text, id: uuid()}
        return this.getNote().then((data) => [...data, finalNote]).then((updatedData)=> this.writeNote(updatedData)).then(() => finalNote);
    }

    deleteNote(id){
        return this.getNote().then((data) => data.filter(note => note.id !== id)).then((filteredData)=> this.writeNote(filteredData));
    }
}

module.exports = new Notes();