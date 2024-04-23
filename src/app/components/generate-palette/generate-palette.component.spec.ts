import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePaletteComponent } from './generate-palette.component';

describe('GeneratePaletteComponent', () => {
  let component: GeneratePaletteComponent;
  let fixture: ComponentFixture<GeneratePaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePaletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratePaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
