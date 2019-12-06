import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagComponent } from "./components/tag/tag.component";
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [TagComponent],
    imports: [CommonModule, ButtonModule],
    exports: [TagComponent]
})
export class TagModule {}
