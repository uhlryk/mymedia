import { MenuItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {
    constructor() {}

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            { label: "Stats", icon: "far fa-address-card" },
            { label: "Calendar", icon: "fa fa-fw fa-calendar" },
            { label: "Documentation", icon: "fa fa-fw fa-book" },
            { label: "Support", icon: "fa fa-fw fa-support" },
            { label: "Social", icon: "fa fa-fw fa-twitter" }
        ];
    }
}
