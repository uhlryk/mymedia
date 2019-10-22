import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
    private showLoader = false;
    constructor(private loaderService: LoaderService) {}

    ngOnInit() {
        this.loaderService.waitForStatus().subscribe(showLoader => {
            this.showLoader = showLoader
        })
    }
}
