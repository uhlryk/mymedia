import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TagsModalComponent } from "./tags-modal.component";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";
import {ContentComponent} from "./components/content/content.component";
import { ButtonModule } from "primeng/button";
@NgModule({
    declarations: [TagsModalComponent, ContentComponent],
    imports: [CommonModule, FormsModule, DynamicDialogModule, ButtonModule],
    providers: [DialogService],
    exports: [TagsModalComponent],
    entryComponents: [ContentComponent]
})
export class TagsModalModule {}
