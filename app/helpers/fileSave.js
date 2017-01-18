import fs from "fs";

export default function fileSave(dir, content, done) {
  fs.writeFile(dir, content, (err) => {
    if (err) done(err);
    done();
  });
}
