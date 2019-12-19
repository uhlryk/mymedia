import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-tag",
    templateUrl: "./tag.component.html",
    styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
    @Input("name") _name: string;

    constructor() {}

    ngOnInit() {}

    get name(): string {
        return this._name;
    }
}
