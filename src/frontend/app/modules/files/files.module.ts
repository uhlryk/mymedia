import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { RowComponent } from "./components/row/row.component";
import { FormsModule } from "@angular/forms";

import { TitleComponent } from "./components/title/title.component";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { DescriptionComponent } from "./components/description/description.component";
import { ListComponent } from "./components/list/list.component";
import { DetailsModalComponent } from "./components/detailsModal/detailsModal.component";
import { ModalModule } from "ngx-bootstrap";
import { RankingComponent } from "./components/ranking/ranking.component";
import { ThumbnailService } from "../../services/thumbnail.service";
import { ResultManipulationService } from "../../services/result-manipulation.service";
import { SearchComponent } from './components/search/search.component';
import { OrderComponent } from './components/order/order.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
@NgModule({
    imports: [CommonModule, FormsModule, ModalModule.forRoot()],
    providers: [ThumbnailService, ResultManipulationService],
    declarations: [
        FilesComponent,
        RowComponent,
        TitleComponent,
        DescriptionComponent,
        FileSizeComponent,
        ListComponent,
        DetailsModalComponent,
        RankingComponent,
        SearchComponent,
        OrderComponent,
        ImageModalComponent
    ]
})
export class FilesModule {}
