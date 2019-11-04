import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VideoLengthComponent } from "./video-length.component";

describe("VideoLengthComponent", () => {
    let component: VideoLengthComponent;
    let fixture: ComponentFixture<VideoLengthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VideoLengthComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoLengthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
