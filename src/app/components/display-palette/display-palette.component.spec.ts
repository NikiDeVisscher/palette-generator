import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPaletteComponent } from './display-palette.component';

describe('DisplayPaletteComponent', () => {
  let component: DisplayPaletteComponent;
  let fixture: ComponentFixture<DisplayPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPaletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
