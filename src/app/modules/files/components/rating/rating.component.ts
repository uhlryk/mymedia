import { Component, OnInit, Input } from "@angular/core";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-rating",
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.scss"]
})
export class RatingComponent implements OnInit {
    @Input() value: number = 1;
    filledStars = Array(this.value).fill(0);
    emptyStars = Array(5 - this.value).fill(0);
    constructor() {}

    ngOnInit() {}
}
