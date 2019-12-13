import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "./modules/shared/shared.module";
import { ListComponent } from "./components/list/list.component";
import { DetailsModalModule } from "./modules/details-modal/details-modal.module";
import { ThumbnailsModalModule } from "./modules/thumbnails-modal/thumbnails-modal.module";
import { TagsModalModule } from "./modules/tags-modal/tags-modal.module";

import { CardModule } from "./modules/card/card.module";
import { ResultManipulationService } from "../../services/result-manipulation.service";
import { SearchComponent } from "./components/search/search.component";
import { OrderComponent } from "./components/order/order.component";
import { ButtonModule } from "primeng/button";
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DetailsModalModule,
        SharedModule,
        ThumbnailsModalModule,
        TagsModalModule,
        CardModule
    ],
    providers: [ResultManipulationService],
    declarations: [FilesComponent, ListComponent, SearchComponent, OrderComponent, SideMenuComponent]
})
export class FilesModule {}
