import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit {

  @ViewChild('aboutSection') section?: ElementRef<HTMLElement>;
  @ViewChildren('item', { read: ElementRef }) items!: QueryList<ElementRef>;

  private isBrowser = false;
  private reduceMotion = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser || !this.section) return;

    this.reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (this.reduceMotion) return;

    const { gsap } = await import('gsap');

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;

        gsap.from(
          this.items.map(i => i.nativeElement),
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
          }
        );

        obs.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section.nativeElement);
  }
}
