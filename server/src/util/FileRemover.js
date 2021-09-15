const fs = require('fs');
const path = require('path');

const FileRemover = async () => {
  let directory = path.join(process.cwd(), '../uploads');
  fs.readdir(directory, (err, loadedFiles) => {
    if (err) {
      console.log("Error: "+ err.message );
      throw err;
    }
    for ( const file of loadedFiles ) {
      console.log(`Removing ${file}`);
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          console.log("Error: " + err.message);
          throw err;
        }
      })
    } 
  });
}

FileRemover();
