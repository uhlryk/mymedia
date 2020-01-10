import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./views/files/files.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "./modules/shared/shared.module";
import { ListComponent } from "./components/list/list.component";
import { DetailsModalModule } from "./modules/details-modal/details-modal.module";
import { TagsModalModule } from "./modules/tags-modal/tags-modal.module";
import { CardModule } from "./modules/card/card.module";
import { SearchComponent } from "./components/search/search.component";
import { OrderComponent } from "./components/order/order.component";
import { ButtonModule } from "primeng/button";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { TagSelectListModule } from "./modules/tag-select-list/tag-select-list.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        DetailsModalModule,
        SharedModule,
        TagsModalModule,
        CardModule,
        TagSelectListModule
    ],
    providers: [],
    declarations: [
        FilesComponent,
        ListComponent,
        SearchComponent,
        OrderComponent,
        SideMenuComponent
    ]
})
export class FilesModule {}
