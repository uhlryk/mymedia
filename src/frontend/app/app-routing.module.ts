import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectListComponent } from "./modules/project/views/project-list/project-list.component";
import { LoadProjectListResolverService } from "./modules/project/routes/load-project-list-resolver.service";
import { ProjectModule } from "./modules/project/project.module";
import { FilesComponent } from "./modules/files/views/files/files.component";
import { FilesModule } from "./modules/files/files.module";
import { LoadResourceListResolverService } from "./modules/files/routes/load-resource-list-resolver.service";
import { LoadTagListResolverService } from "./modules/files/routes/load-tag-list-resolver.service";

const routes: Routes = [
    {
        path: "",
        component: ProjectListComponent,
        resolve: { projectList: LoadProjectListResolverService }
    },
    {
        path: "files",
        component: FilesComponent,
        resolve: {
            resourceList: LoadResourceListResolverService,
            tagList: LoadTagListResolverService
        }
    }
];

@NgModule({
    imports: [ProjectModule, FilesModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
