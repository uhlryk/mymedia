import {
    Component,
    EventEmitter,
    Output,
    Input,
    ViewChild,
    ElementRef,
    OnChanges
} from "@angular/core";
import { Inplace } from "primeng/inplace";

@Component({
    selector: "app-title",
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnChanges {
    @Input() text: string;
    private editableText: string;
    @Output() changed = new EventEmitter<string>();
    constructor() {}
    @ViewChild(Inplace, { static: true }) inplace: Inplace;
    @ViewChild("editInput", { static: true }) editInput: ElementRef;

    ngOnChanges() {
        this.editableText = this.text;
        this.inplace.onActivate.subscribe(() => {
            setTimeout(() => {
                this.editInput.nativeElement.focus();
            }, 0);
        });
    }

    saveChanges() {
        this.inplace.deactivate();
        this.changed.emit(this.editableText);
    }
}
