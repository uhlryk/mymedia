import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagComponent } from "./components/tag/tag.component";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
@NgModule({
    declarations: [TagComponent],
    imports: [CommonModule, ButtonModule, TooltipModule],
    exports: [TagComponent]
})
export class TagModule {}
