import fs from "fs";
import path from "path";

export default function fileList(dir, done) {
  function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function (file) {
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else if (stat && stat.isFile()){
            results.push({
              name: path.basename(file),
              path: path.relative(dir, file),
              size: stat.size,
              birthtime: stat.birthtime
            });
            if (!--pending) done(null, results);
          } else {
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };
  walk(dir, done);
}
