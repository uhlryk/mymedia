import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectPathComponent } from "./features/projectPath/projectPath.component";
import { ProjectPathModule } from "./features/projectPath/projectPath.module";
import { FilesComponent } from "./features/files/files.component";
import { FilesModule } from "./features/files/files.module";

const routes: Routes = [
    {
        path: "",
        component: ProjectPathComponent
    },
    {
        path: "files",
        component: FilesComponent
    }
];

@NgModule({
    imports: [ProjectPathModule, FilesModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
