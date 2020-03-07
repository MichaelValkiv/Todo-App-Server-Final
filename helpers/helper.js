const fs = require('fs');
const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
};

const newDate = () => new Date();
function deadlineDate() {
    let currentDate = new Date();
    let changedDate = currentDate.setMinutes(currentDate.getMinutes() + 1);
    return new Date(changedDate);
};

function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id);
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFile(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}
module.exports = {
    getNewId,
    newDate,
    deadlineDate,
    mustBeInArray,
    writeJSONFile
};