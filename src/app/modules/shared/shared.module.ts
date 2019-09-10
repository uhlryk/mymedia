import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileSizeComponent } from "./file-size/file-size.component";

@NgModule({
    exports: [FileSizeComponent],
    declarations: [FileSizeComponent],
    imports: [CommonModule]
})
export class SharedModule {}
