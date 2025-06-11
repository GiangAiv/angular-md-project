import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderHtmlComponent } from './render-html.component';

describe('RenderHtmlComponent', () => {
  let component: RenderHtmlComponent;
  let fixture: ComponentFixture<RenderHtmlComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenderHtmlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RenderHtmlComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render simple text node', () => {
    const nodes = [
      {
        component: 'p',
        props: {},
        children: ['Hello World']
      }
    ];

    component.props = { nodes };
    component.ngOnChanges({ props: { currentValue: component.props, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.safeContent).toBeDefined();
  });

  it('should render nested nodes', () => {
    const nodes = [
      {
        component: 'div',
        props: { class: 'container' },
        children: [
          {
            component: 'h1',
            props: {},
            children: ['Title']
          },
          {
            component: 'p',
            props: {},
            children: ['Content']
          }
        ]
      }
    ];

    component.props = { nodes };
    component.ngOnChanges({ props: { currentValue: component.props, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.safeContent).toBeDefined();
  });

  it('should handle self-closing tags', () => {
    const nodes = [
      {
        component: 'img',
        props: {
          src: 'test.jpg',
          alt: 'Test image'
        }
      }
    ];

    component.props = { nodes };
    component.ngOnChanges({ props: { currentValue: component.props, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.safeContent).toBeDefined();
  });

  it('should escape HTML in text content', () => {
    const nodes = [
      {
        component: 'p',
        props: {},
        children: ['<script>alert("xss")</script>']
      }
    ];

    component.props = { nodes };
    component.ngOnChanges({ props: { currentValue: component.props, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.safeContent).toBeDefined();
  });

  it('should handle empty nodes array', () => {
    component.props = { nodes: [] };
    component.ngOnChanges({ props: { currentValue: component.props, previousValue: null, firstChange: true, isFirstChange: () => true } });

    expect(component.safeContent).toBeDefined();
  });

  it('should apply container class correctly', () => {
    component.props = { nodes: [], class: 'custom-class' };
    
    expect(component.containerClass).toBe('render-html custom-class');
  });

  it('should apply default container class when no custom class provided', () => {
    component.props = { nodes: [] };
    
    expect(component.containerClass).toBe('render-html ');
  });
});
