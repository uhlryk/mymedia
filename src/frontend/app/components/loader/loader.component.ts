import { Component, OnInit } from "@angular/core";
import { ILoaderStatus, LoaderService } from "../../services/loader.service";

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
    private showLoader = false;
    private showMessage = false;
    private message: string;
    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.loaderService.waitForStatus().subscribe((loaderStatus: ILoaderStatus) => {
            this.showLoader = loaderStatus.showLoader;
            this.showMessage = loaderStatus.showMessage;
            this.message = loaderStatus.message;
        });
    }
}
