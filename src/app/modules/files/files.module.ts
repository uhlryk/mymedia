import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./files.component";
import { RowComponent } from "./row/row.component";

@NgModule({
    imports: [CommonModule],
    declarations: [FilesComponent, RowComponent]
})
export class FilesModule {}
