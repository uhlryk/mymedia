import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { RowComponent } from "./components/row/row.component";
import { FormsModule } from "@angular/forms";

import { DetailsComponent } from "./pages/details/details.component";
import { TitleComponent } from "./components/title/title.component";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { DescriptionComponent } from "./components/description/description.component";
import { ListComponent } from './components/list/list.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [
        FilesComponent,
        RowComponent,
        DetailsComponent,
        TitleComponent,
        DescriptionComponent,
        FileSizeComponent,
        ListComponent
    ]
})
export class FilesModule {}
