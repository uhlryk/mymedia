import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DetailsComponent } from "./details.component";
import { TitleComponent } from './title/title.component';

@NgModule({
    declarations: [DetailsComponent, TitleComponent],
    imports: [CommonModule, FormsModule],
    exports: [DetailsComponent]
})
export class DetailsModule {}
