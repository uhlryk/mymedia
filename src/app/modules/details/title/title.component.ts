import {Component, EventEmitter, OnInit, Output, Input} from "@angular/core";

@Component({
    selector: "app-title",
    template: "<input [(ngModel)]='title' (change)='isChanged()' (blur)='saveChanges()'/>",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
    @Input() title: string;
    @Output() changed = new EventEmitter<string>();
    needSave = false;
    constructor() {
    }

    ngOnInit() {
    }

    isChanged(){
        this.needSave = true;
    }

    saveChanges() {
        if(this.needSave) {
            this.needSave = false;
            this.changed.emit(this.title);
        }
    }
}
