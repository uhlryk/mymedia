import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DetailsComponent } from "./details.component";

@NgModule({
    declarations: [DetailsComponent],
    imports: [CommonModule, FormsModule],
    exports: [DetailsComponent]
})
export class DetailsModule {}
