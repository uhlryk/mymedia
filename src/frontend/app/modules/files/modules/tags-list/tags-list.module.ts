import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagsListComponent } from "./components/tags-list/tags-list.component";

@NgModule({
    declarations: [TagsListComponent],
    imports: [CommonModule],
    exports: [TagsListComponent]
})
export class TagsListModule {}
