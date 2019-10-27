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
import { RankingComponent } from "./components/ranking/ranking.component";
import { ResultManipulationService } from "../../services/result-manipulation.service";
import { SearchComponent } from "./components/search/search.component";
import { OrderComponent } from "./components/order/order.component";
import { ImageModalComponent } from "./components/image-modal/image-modal.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";
import { SidebarModule } from "primeng/sidebar";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        DynamicDialogModule,
        SidebarModule
    ],
    providers: [ResultManipulationService, DialogService],
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
    ],
    entryComponents: [ImageModalComponent]
})
export class FilesModule {}
