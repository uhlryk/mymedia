import fs from "fs";

export default function fileSave(dir, content, done) {
  console.log(content);
  fs.writeFile(dir, content, (err) => {
    if (err) done(err);
    done();
  });
}
