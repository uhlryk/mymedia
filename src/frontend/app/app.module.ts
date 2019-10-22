import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import { LoaderComponent } from './components/loader/loader.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
    declarations: [AppComponent, TopMenuComponent, LoaderComponent],
    imports: [BrowserModule, AppRoutingModule, TabMenuModule, BrowserAnimationsModule, ProgressSpinnerModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
