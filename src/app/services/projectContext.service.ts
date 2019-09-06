import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ProjectContextService {
    private projectPath: string;
    constructor() {
      console.log("WWW");
    }

    setProjectPath(projectPath: string): void {
      console.log("==");
      console.log(projectPath);
        this.projectPath = projectPath;
    }

    getProjectPath(): string {
        return this.projectPath;
    }
}
