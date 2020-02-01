import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "./reducers";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private router: Router, private store: Store<AppState>) {

    }
}
