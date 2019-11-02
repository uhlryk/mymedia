import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { RowComponent } from "./components/row/row.component";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { ListComponent } from "./components/list/list.component";
import { DetailsModalModule } from "./modules/details-modal/details-modal.module";
import { ResultManipulationService } from "../../services/result-manipulation.service";
import { SearchComponent } from "./components/search/search.component";
import { OrderComponent } from "./components/order/order.component";
import { ImageModalComponent } from "./components/image-modal/image-modal.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        DynamicDialogModule,
        DetailsModalModule,
        SharedModule
    ],
    providers: [ResultManipulationService, DialogService],
    declarations: [
        FilesComponent,
        RowComponent,
        ListComponent,
        SearchComponent,
        OrderComponent,
        ImageModalComponent
    ],
    entryComponents: [ImageModalComponent]
})
export class FilesModule {}
