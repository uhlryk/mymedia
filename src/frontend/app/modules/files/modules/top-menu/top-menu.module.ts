import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import { MenubarModule } from "primeng/menubar";
@NgModule({
    declarations: [TopMenuComponent],
    imports: [CommonModule, MenubarModule],
    exports: [TopMenuComponent]
})
export class TopMenuModule {}
