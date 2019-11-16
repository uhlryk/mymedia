import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { VideoLengthComponent } from "./components/video-length/video-length.component";

@NgModule({
    declarations: [FileSizeComponent, VideoLengthComponent],
    imports: [CommonModule],
    exports: [FileSizeComponent, VideoLengthComponent]
})
export class SharedModule {}
