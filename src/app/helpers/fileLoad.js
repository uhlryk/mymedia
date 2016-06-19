import fs from "fs";
import path from "path";

export default function fileLoad(dir, name, done) {
  let dirName = path.join(dir, name);
  fs.readFile(dirName, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
}
