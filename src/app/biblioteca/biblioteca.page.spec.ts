import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BibliotecaPage } from './biblioteca.page';

describe('Tab3Page', () => {
  let component: BibliotecaPage;
  let fixture: ComponentFixture<BibliotecaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
