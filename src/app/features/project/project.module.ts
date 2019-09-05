import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectComponent } from "./project.component";

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ProjectComponent]
})
export class ProjectModule {}
