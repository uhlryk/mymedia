import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from "@angular/core";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-ranking",
    templateUrl: "./ranking.component.html",
    styleUrls: ["./ranking.component.scss"]
})
export class RankingComponent implements OnInit, OnChanges {
    @Input() value: number = 0;
    @Input() editable: boolean = false;
    @Output() clickChange = new EventEmitter<number>();

    stars: Array<Star> = [];
    constructor() {}

    ngOnInit() {
        this.setStars();
    }

    ngOnChanges() {
        this.setStars();
    }

    private setStars() {
        for (let i = 0; i < 5; i++) {
            if (!this.stars[i]) {
                this.stars[i] = new Star();
                this.stars[i].value = i + 1;
            }
            if (i < this.value) {
                this.stars[i].type = "★";
            } else {
                this.stars[i].type = "☆";
            }
        }
    }

    clickChangeValue(value) {
        if (this.editable) {
            this.value = value;
            this.setStars();
            this.clickChange.emit(value);
        }
    }
}

class Star {
    value: number;
    type: string;
}
