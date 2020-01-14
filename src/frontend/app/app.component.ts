import { Component } from "@angular/core";
import { Router } from "@angular/router";
import IpcProvider from "./providers/ipc.provider";
import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";
import { AppMenuService } from "./services/app-menu.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private appMenu: AppMenuService, private router: Router) {
        this.appMenu.setProjectButton().subscribe(() => {
            this.router.navigate(["/"]);
        });
    }
}
