import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectComponent } from "./features/project/project.component";
import { ProjectModule } from "./features/project/project.module";
import { FilesComponent } from "./features/files/files.component";
import { FilesModule } from "./features/files/files.module";

const routes: Routes = [
    {
        path: "",
        component: ProjectComponent
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
