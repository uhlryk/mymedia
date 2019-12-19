import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectPathComponent } from "./modules/project/views/project-path/project-path.component";
import { CreateProjectComponent } from "./modules/project/views/create-project/create-project.component";
import { ProjectModule } from "./modules/project/project.module";
import { FilesComponent } from "./modules/files/views/files/files.component";
import { FilesModule } from "./modules/files/files.module";
// import { DetailsComponent } from "./modules/files/views/details/details.component";

const routes: Routes = [
    {
        path: "",
        component: ProjectPathComponent
    },
    {
        path: "create-project",
        component: CreateProjectComponent
    },
    // {
    //     path: "files/:fileId",
    //     component: DetailsComponent
    // },
    {
        path: "files",
        component: FilesComponent
    }
];

@NgModule({
    imports: [ProjectModule, FilesModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
