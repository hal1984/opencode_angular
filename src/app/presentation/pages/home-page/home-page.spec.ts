import { TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { ActivatedRoute } from '@angular/router';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create the home page', () => {
    const fixture = TestBed.createComponent(HomePage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, opencode_angular');
  });

  it('should have Pokedex button', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    const pokedexLink = Array.from(links).find(l => l.textContent?.trim() === 'Pokedex');
    expect(pokedexLink).toBeTruthy();
  });
});
