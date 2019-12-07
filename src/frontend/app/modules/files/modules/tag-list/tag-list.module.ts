import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagListComponent } from "./components/tag-list/tag-list.component";
import { TagModule } from "../tag/tag.module";

@NgModule({
    declarations: [TagListComponent],
    imports: [CommonModule, TagModule],
    exports: [TagListComponent]
})
export class TagListModule {}
