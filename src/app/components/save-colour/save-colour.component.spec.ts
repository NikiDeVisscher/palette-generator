import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveColourComponent } from './save-colour.component';

describe('SaveColourComponent', () => {
  let component: SaveColourComponent;
  let fixture: ComponentFixture<SaveColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveColourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
