import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagsModalComponent } from "./tags-modal.component";
import { SharedModule } from "../shared/shared.module";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";
import { ContentComponent } from "./components/content/content.component";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
@NgModule({
    declarations: [TagsModalComponent, ContentComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        DynamicDialogModule,
        ButtonModule,
        TableModule,
        InputTextModule
    ],
    providers: [DialogService],
    exports: [TagsModalComponent],
    entryComponents: [ContentComponent]
})
export class TagsModalModule {}
