import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { VideoLengthComponent } from "./components/video-length/video-length.component";
import { TextComponent } from "./components/text/text.component";
import { InplaceModule } from "primeng/inplace";
import { InputTextModule } from "primeng/inputtext";
@NgModule({
    declarations: [FileSizeComponent, VideoLengthComponent, TextComponent],
    imports: [CommonModule, FormsModule, InplaceModule, InputTextModule],
    exports: [FileSizeComponent, VideoLengthComponent, TextComponent]
})
export class SharedModule {}
