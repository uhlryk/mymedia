import { Component } from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "mymedia";
    constructor(private router: Router,) {

    }
    clickHome():void {
      this.router.navigate([""]);
    }
    clickTags():void {
        this.router.navigate(["/tags"]);
    }
}
