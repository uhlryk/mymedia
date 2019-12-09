import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagListComponent } from "./components/tag-list/tag-list.component";
import { TagModule } from "../tag/tag.module";
import { ButtonModule } from "primeng/button";
import { OverlayPanelModule } from "primeng/overlaypanel";
@NgModule({
    declarations: [TagListComponent],
    imports: [CommonModule, TagModule, ButtonModule, OverlayPanelModule],
    exports: [TagListComponent]
})
export class TagListModule {}
