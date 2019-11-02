import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    Input,
    ViewChild,
    ElementRef
} from "@angular/core";
import { Inplace } from "primeng/inplace";

@Component({
    selector: "app-title",
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
    @Input() title: string;
    private editableTitle: string;
    @Output() changed = new EventEmitter<string>();
    constructor() {}
    @ViewChild(Inplace, { static: true }) titleInplace: Inplace;
    @ViewChild("editInput", { static: true }) editInput: ElementRef;

    ngOnInit() {
        this.editableTitle = this.title;
        this.titleInplace.onActivate.subscribe(() => {
            setTimeout(() => {
                this.editInput.nativeElement.focus();
            }, 0);
        });
    }
    saveChanges() {
        this.titleInplace.deactivate();
        this.changed.emit(this.editableTitle);
    }
}
