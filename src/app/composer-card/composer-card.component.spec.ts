import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerCardComponent } from './composer-card.component';

describe('ComposerCardComponent', () => {
  let component: ComposerCardComponent;
  let fixture: ComponentFixture<ComposerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComposerCardComponent]
    });
    fixture = TestBed.createComponent(ComposerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
