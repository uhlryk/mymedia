import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagsListComponent } from "./components/tags-list/tags-list.component";
import { ButtonModule } from "primeng/button";
import { TagModule } from "../tag/tag.module";
@NgModule({
    declarations: [TagsListComponent],
    imports: [CommonModule, FormsModule, ButtonModule, TagModule],
    exports: [TagsListComponent]
})
export class TagsListModule {}
