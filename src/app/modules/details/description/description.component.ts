import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";

@Component({
    selector: "app-description",
    template:
        "<textarea [(ngModel)]='text' (change)='isChanged()' (blur)='saveChanges()'></textarea>",
    styleUrls: ["./description.component.scss"]
})
export class DescriptionComponent implements OnInit {
    @Input() text: string;
    @Output() changed = new EventEmitter<string>();
    needSave = false;
    constructor() {}

    ngOnInit() {}

    isChanged() {
        this.needSave = true;
    }

    saveChanges() {
        if (this.needSave) {
            this.needSave = false;
            this.changed.emit(this.text);
        }
    }
}
