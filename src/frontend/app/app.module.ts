import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
@NgModule({
    declarations: [AppComponent, TopMenuComponent],
    imports: [BrowserModule, AppRoutingModule, TabMenuModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
