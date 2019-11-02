import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileSizeComponent } from "./components/file-size/file-size.component";
import { RankingComponent } from "./components/ranking/ranking.component";

@NgModule({
    declarations: [FileSizeComponent, RankingComponent],
    imports: [CommonModule],
    exports: [FileSizeComponent, RankingComponent]
})
export class SharedModule {}
