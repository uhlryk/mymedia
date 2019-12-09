import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagListComponent } from "./components/tag-list/tag-list.component";
import { TagModule } from "../tag/tag.module";
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [TagListComponent],
    imports: [CommonModule, TagModule, ButtonModule],
    exports: [TagListComponent]
})
export class TagListModule {}
