import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "app-playable-thumbnail",
    templateUrl: "./playable-thumbnail.component.html",
    styleUrls: ["./playable-thumbnail.component.scss"]
})
export class PlayableThumbnailComponent implements OnInit {
    @Input() thumbnailPath: string;
    @Output() play = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}

    onPlay() {
        this.play.emit();
    }
}
