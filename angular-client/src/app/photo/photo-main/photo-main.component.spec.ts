import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoMainComponent } from './photo-main.component';

describe('PhotoMainComponent', () => {
  let component: PhotoMainComponent;
  let fixture: ComponentFixture<PhotoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
