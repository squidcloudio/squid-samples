import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUsersComponent } from './read-users.component';

describe('ReadUsersComponent', () => {
  let component: ReadUsersComponent;
  let fixture: ComponentFixture<ReadUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadUsersComponent],
    });
    fixture = TestBed.createComponent(ReadUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
