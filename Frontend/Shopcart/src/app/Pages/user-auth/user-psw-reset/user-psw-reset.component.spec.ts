import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPswResetComponent } from './user-psw-reset.component';

describe('UserPswResetComponent', () => {
  let component: UserPswResetComponent;
  let fixture: ComponentFixture<UserPswResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPswResetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPswResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
