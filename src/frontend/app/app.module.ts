import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ProjectContextService } from "./services/projectContext.service";
import { AppMenuService } from "./services/app-menu.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ProgressBarModule } from "primeng/progressbar";
import { LoaderService } from "./services/loader.service";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
@NgModule({
    declarations: [AppComponent, LoaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TabMenuModule,
        BrowserAnimationsModule,
        ProgressSpinnerModule,
        ProgressBarModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([])
    ],
    providers: [LoaderService, ProjectContextService, AppMenuService],
    bootstrap: [AppComponent]
})
export class AppModule {}
