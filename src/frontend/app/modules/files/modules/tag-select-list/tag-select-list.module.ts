import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagSelectListComponent } from "./components/tags-select-list/tag-select-list.component";
import { ButtonModule } from "primeng/button";
import { TagModule } from "../tag/tag.module";
@NgModule({
    declarations: [TagSelectListComponent],
    imports: [CommonModule, FormsModule, ButtonModule, TagModule],
    exports: [TagSelectListComponent]
})
export class TagSelectListModule {}
