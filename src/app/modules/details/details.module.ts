import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DetailsComponent } from "./details.component";
import { TitleComponent } from "./title/title.component";
import { SharedModule } from "../shared/shared.module"

@NgModule({
    declarations: [DetailsComponent, TitleComponent],
    imports: [CommonModule, FormsModule, SharedModule],
    exports: [DetailsComponent]
})
export class DetailsModule {}
