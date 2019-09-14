import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectPathComponent } from "./modules/project/pages/project-path/project-path.component";
import { ProjectModule } from "./modules/project/project.module";
import { FilesComponent } from "./modules/files/pages/file-list/files.component";
import { FilesModule } from "./modules/files/files.module";
import { DetailsComponent } from "./modules/details/details.component";
import { DetailsModule } from "./modules/details/details.module";
import { TagsModule } from "./modules/tags/tags.module";
import { TagsComponent } from "./modules/tags/tags.component";

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
    },
    {
        path: "tags",
        component: TagsComponent
    }
];

@NgModule({
    imports: [ProjectModule, FilesModule, DetailsModule, TagsModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
