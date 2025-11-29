import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  standalone: true,
  imports: [
    AboutComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('title') title?: ElementRef;
  @ViewChild('subtitle') subtitle?: ElementRef;
  @ViewChild('actions') actions?: ElementRef;
  @ViewChild('heroInner') heroInner?: ElementRef<HTMLElement>;

  private isBrowser: boolean;
  reduceMotion = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;

    this.reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ✅ Respect reduced motion (VERY important)
    if (this.reduceMotion) return;

    const { gsap } = await import('gsap');

    if (!this.title || !this.subtitle || !this.actions) return;

    gsap.timeline({ delay: 0.25 })
      .from(this.title.nativeElement, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      })
      .from(this.subtitle.nativeElement, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(this.actions.nativeElement, {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
      }, '-=0.4');
  }

  scrollTo(id: string) {
    if (!this.isBrowser) return;

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser || this.reduceMotion) return;
    if (!this.heroInner) return;
    if (window.innerWidth < 768) return;

    const translateY = window.scrollY * 0.15;
    this.heroInner.nativeElement.style.transform =
      `translateY(${translateY}px)`;
  }
}
