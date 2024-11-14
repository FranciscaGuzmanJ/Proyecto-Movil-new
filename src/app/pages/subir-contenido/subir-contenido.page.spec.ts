import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirContenidoPage } from './subir-contenido.page';

describe('SubirContenidoPage', () => {
  let component: SubirContenidoPage;
  let fixture: ComponentFixture<SubirContenidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
