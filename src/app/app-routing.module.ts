import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectPathComponent } from "./modules/projectPath/projectPath.component";
import { ProjectPathModule } from "./modules/projectPath/projectPath.module";
import { FilesComponent } from "./modules/files/files.component";
import { FilesModule } from "./modules/files/files.module";
import { DetailsComponent } from "./modules/details/details.component";
import { DetailsModule } from "./modules/details/details.module";

const routes: Routes = [
    {
        path: "",
        component: ProjectPathComponent
    },
    {
        path: "files/:fileId",
        component: DetailsComponent
    },
    {
        path: "files",
        component: FilesComponent
    }
];

@NgModule({
    imports: [ProjectPathModule, FilesModule, DetailsModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
