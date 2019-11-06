import getThumbnail from "./fs/getThumbnail";
import * as path from "path";
import generateThumbnail from "./fs/generateThumbnail";

export default class ThumbnailManager {
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";

    static async getThumbnail(
        projectPath: string,
        projectFolder: string,
        resourceFilePath: string,
        resourceId: string
    ) {
        // const thumbnail: string = await getThumbnail(
        //     path.resolve(
        //         projectPath,
        //         projectFolder,
        //         ThumbnailManager.PROJECT_THUMBNAIL_FOLDER,
        //         resourceId,
        //         ThumbnailManager.PROJECT_THUMBNAIL_FILE
        //     )
        // );
        // if (thumbnail) {
        //     return thumbnail;
        // } else {
            const newThumbnail: string = await generateThumbnail(
                path.resolve(projectPath, resourceFilePath),
                path.resolve(
                    projectPath,
                    projectFolder,
                    ThumbnailManager.PROJECT_THUMBNAIL_FOLDER,
                    resourceId
                ),
                ThumbnailManager.PROJECT_THUMBNAIL_FILE
            );
            if (newThumbnail) {
                return newThumbnail;
            } else {
                return null;
            }
        // }
    }
}
