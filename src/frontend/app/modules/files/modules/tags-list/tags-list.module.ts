import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagsListComponent } from "./components/tags-list/tags-list.component";
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [TagsListComponent],
    imports: [CommonModule, FormsModule, ButtonModule],
    exports: [TagsListComponent]
})
export class TagsListModule {}
