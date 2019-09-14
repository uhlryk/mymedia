import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/file-list/files.component";
import { RowComponent } from "./components/row/row.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [FilesComponent, RowComponent]
})
export class FilesModule {}
