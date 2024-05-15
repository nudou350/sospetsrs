import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarAnimalComponent } from './procurar-animal.component';

describe('ProcurarAnimalComponent', () => {
  let component: ProcurarAnimalComponent;
  let fixture: ComponentFixture<ProcurarAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurarAnimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcurarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
