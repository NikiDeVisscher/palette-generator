import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickColourComponent } from './pick-colour.component';

describe('PickColourComponent', () => {
  let component: PickColourComponent;
  let fixture: ComponentFixture<PickColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickColourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
