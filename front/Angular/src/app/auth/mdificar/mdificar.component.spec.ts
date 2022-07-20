import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdificarComponent } from './mdificar.component';

describe('MdificarComponent', () => {
  let component: MdificarComponent;
  let fixture: ComponentFixture<MdificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
