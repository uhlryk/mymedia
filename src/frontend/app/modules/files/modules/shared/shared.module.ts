import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { RankingComponent } from "./components/ranking/ranking.component";
import { VideoLengthComponent } from "./components/video-length/video-length.component";

@NgModule({
    declarations: [FileSizeComponent, RankingComponent, VideoLengthComponent],
    imports: [CommonModule],
    exports: [FileSizeComponent, RankingComponent, VideoLengthComponent]
})
export class SharedModule {}
