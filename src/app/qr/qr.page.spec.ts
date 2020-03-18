import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRPage } from './qr.page';

describe('QRPage', () => {
  let component: QRPage;
  let fixture: ComponentFixture<QRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
