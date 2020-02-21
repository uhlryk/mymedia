import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectListComponent } from "./modules/project/views/project-list/project-list.component";
import { LoadProjectsResolverService } from "./modules/project/routes/load-projects-resolver.service";
import { ProjectModule } from "./modules/project/project.module";
import { FilesComponent } from "./modules/files/views/files/files.component";
import { FilesModule } from "./modules/files/files.module";
// import { DetailsComponent } from "./modules/files/views/details/details.component";

const routes: Routes = [
    {
        path: "",
        component: ProjectListComponent,
        resolve: { projectList: LoadProjectsResolverService }
    },
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
