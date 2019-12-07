import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagComponent } from "./components/tag/tag.component";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { DropdownModule } from "primeng/dropdown";
@NgModule({
    declarations: [TagComponent],
    imports: [CommonModule, ButtonModule, TooltipModule, DropdownModule],
    exports: [TagComponent]
})
export class TagModule {}
