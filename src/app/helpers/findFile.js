import fs from "fs";
import path from "path";

export default function findFile(dir, name, done) {

  var result = false;
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isFile() && file === name) {
          result = true;
        }
        if (!--pending) done(null, result);
      });
    });
  });
}
