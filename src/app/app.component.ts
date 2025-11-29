import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  active = 'hero';
  progressTransform = 'scaleX(0)';
  private isBrowser: boolean;
  navHidden = false;
  private lastScroll = 0;
  reduceMotion = false;
  currentTheme: 'light' | 'dark' = 'light';

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // ✅ Read current theme from <html>
      const theme = this.document.documentElement.getAttribute('data-theme');
      this.currentTheme = (theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
    }
  }



  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const sections = ['hero', 'about', 'projects', 'contact'];

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // ✅ NAVBAR SHOW / HIDE
      if (!this.reduceMotion) {
        if (currentScroll > this.lastScroll && currentScroll > 120) {
          this.navHidden = true;
        } else {
          this.navHidden = false;
        }
      } else {
        this.navHidden = false;
      }

      this.lastScroll = currentScroll;

      // ✅ ACTIVE NAV LOGIC
      let current = 'hero';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }

      this.active = current;

      // ✅ SCROLL PROGRESS
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0
        ? currentScroll / docHeight
        : 0;

      if (this.reduceMotion) {
        this.progressTransform = 'scaleX(1)';
      } else {
        this.progressTransform = `scaleX(${progress})`;
      }

    });

  }

  scroll(id: string) {
    if (!this.isBrowser) return;

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
  toggleTheme() {
    if (!this.isBrowser) return;

    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';

    this.document.documentElement.setAttribute(
      'data-theme',
      this.currentTheme
    );

    localStorage.setItem('theme', this.currentTheme);
  }

}
