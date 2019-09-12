import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./files.component";
import { RowComponent } from "./row/row.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [FilesComponent, RowComponent]
})
export class FilesModule {}
