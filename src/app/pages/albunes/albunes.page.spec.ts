import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbunesPage } from './albunes.page';

describe('AlbunesPage', () => {
  let component: AlbunesPage;
  let fixture: ComponentFixture<AlbunesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbunesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
