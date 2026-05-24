import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexPage } from './pokedex-page';

describe('PokedexPage', () => {
  let component: PokedexPage;
  let fixture: ComponentFixture<PokedexPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render heading "Pokedex"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toContain('Pokedex');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
