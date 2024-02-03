const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error reading file: ${err.code}: ${err.path} does not exist.`);
            } else {
                console.error(`Error reading file: ${err.message}`);
            }
        } else {
            console.log(`File Content:\n${data}`);
        }
    });
}

// Test Cases
readFileContent('test-file/file1.txt');
readFileContent('test-file/empty-file.txt');
readFileContent('test-file/nonexistent-file.txt');
