import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {
    items: MenuItem[];
    constructor() {}

    ngOnInit() {
        this.items = [
            {
                label: "Change Project",
                icon: "pi pi-fw pi-pencil",
                routerLink: ["/"]
            },
            {
                label: "Tags Manager",
                icon: "pi pi-fw pi-pencil"
            }
        ];
    }
}
