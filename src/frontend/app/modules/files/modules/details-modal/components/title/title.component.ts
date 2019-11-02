import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from "@angular/core";
import { Inplace } from "primeng/inplace";

@Component({
    selector: "app-title",
    template: `
        <p-inplace>
            <span pInplaceDisplay>
                {{ editableTitle }}
            </span>
            <span pInplaceContent>
                <div class="ui-inputgroup">
                    <button
                        pButton
                        type="button"
                        icon="pi pi-times"
                        class="ui-button-danger"
                        (click)="deactivate()"
                    ></button>
                    <input type="text" value="PrimeNG" pInputText [(ngModel)]="editableTitle" />
                    <button
                        pButton
                        type="button"
                        icon="pi pi-check"
                        class="ui-button-success"
                        (click)="saveChanges()"
                    ></button>
                </div>
            </span>
        </p-inplace>
    `,
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
    @Input() title: string;
    private editableTitle: string;
    @Output() changed = new EventEmitter<string>();
    constructor() {}
    @ViewChild(Inplace, { static: true }) titleInplace: Inplace;

    ngOnInit() {
        this.editableTitle = this.title;
    }

    deactivate() {
        this.editableTitle = this.title;
        this.titleInplace.deactivate();
    }
    saveChanges() {
        this.titleInplace.deactivate();
        this.changed.emit(this.editableTitle);
    }
}
