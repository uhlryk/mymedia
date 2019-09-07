import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectPathComponent } from "./modules/projectPath/projectPath.component";
import { ProjectPathModule } from "./modules/projectPath/projectPath.module";
import { FilesComponent } from "./modules/files/files.component";
import { FilesModule } from "./modules/files/files.module";
import { FileComponent } from "./modules/file/file.component";
import { FileModule } from "./modules/file/file.module";

const routes: Routes = [
    {
        path: "",
        component: ProjectPathComponent
    },
    {
        path: "files/:fileId",
        component: FileComponent
    },
    {
        path: "files",
        component: FilesComponent
    }
];

@NgModule({
    imports: [ProjectPathModule, FilesModule, FileModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
