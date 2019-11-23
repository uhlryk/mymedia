import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ProjectContextService } from "./services/projectContext.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ProgressBarModule } from "primeng/progressbar";
import { LoaderService } from "./services/loader.service";
@NgModule({
    declarations: [AppComponent, TopMenuComponent, LoaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TabMenuModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        ProgressBarModule
    ],
    providers: [LoaderService, ProjectContextService],
    bootstrap: [AppComponent]
})
export class AppModule {}
