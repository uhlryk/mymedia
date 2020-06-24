import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThumbnailComponent } from "./components/thumbnail/thumbnail.component";
import { PlayableThumbnailComponent } from "./components/playable-thumbnail/playable-thumbnail.component";
@NgModule({
    declarations: [ThumbnailComponent, PlayableThumbnailComponent, PlayableThumbnailComponent],
    imports: [CommonModule],
    exports: [ThumbnailComponent, PlayableThumbnailComponent]
})
export class ThumbnailModule {}
