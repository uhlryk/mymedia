import fs from "fs";
import path from "path";

export default function findFile(dir, name, done) {

  let result = false;
  let dirName = path.join(dir, name);
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isFile() && file === dirName) {
          result = true;
        }
        if (!--pending) done(null, result);
      });
    });
  });
}
