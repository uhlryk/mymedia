import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagsComponent } from "./tags.component";

@NgModule({
    declarations: [TagsComponent],
    imports: [CommonModule, FormsModule]
})
export class TagsModule {}
