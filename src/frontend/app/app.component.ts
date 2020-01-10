import { Component } from "@angular/core";
import { Router } from "@angular/router";
import IpcProvider from "./providers/ipc.provider";
import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    constructor(private router: Router) {
        IpcProvider.listen(IpcProviderResourceEnums.TRIGGER_SET_PROJECT, () => {
            this.router.navigate(["/"]);
        });
    }
}
