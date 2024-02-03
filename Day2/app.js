const fs = require('fs');

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
                console.error(`Error reading file: ${err.message}`);
        }else {
            console.log(`Data written to ${filePath}`);
        } 
    });
}

writeToFile('Day2/FILES/output1.txt', 'Sample content.');
writeToFile('FILES/nonexisting-folder/output1.txt', 'content in a non-existing folder')