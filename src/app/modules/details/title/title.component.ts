import {Component, EventEmitter, OnInit, Output, Input} from "@angular/core";

@Component({
    selector: "app-title",
    template: "<input [(ngModel)]='title' (dblclick)='makeItWritable()' (blur)='saveChanges()' [readonly]='isReadOnly'/>",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
    @Input() title: string;
    @Output() changed = new EventEmitter<string>();

    isReadOnly: boolean = true;
    constructor() {
    }

    ngOnInit() {
    }

    makeItWritable(){
        this.isReadOnly = false;
    }

    saveChanges() {
        this.isReadOnly = true;
        this.changed.emit(this.title);
    }
}
