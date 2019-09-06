import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectPathComponent } from "./projectPath.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ProjectPathComponent]
})
export class ProjectPathModule {}
