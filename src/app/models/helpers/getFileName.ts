import * as path from "path";

export default function getFileName(filePath) {
    return path.parse(filePath).name;
}
