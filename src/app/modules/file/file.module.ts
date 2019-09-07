import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileComponent } from "./file.component";

@NgModule({
    declarations: [FileComponent],
    imports: [CommonModule],
    exports: [FileComponent]
})
export class FileModule {}
