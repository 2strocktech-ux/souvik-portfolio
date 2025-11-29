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
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit {

  @ViewChild('contactSection') section?: ElementRef<HTMLElement>;
  @ViewChildren('item', { read: ElementRef }) items!: QueryList<ElementRef>;

  private isBrowser = false;
  private reduceMotion = false;

  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';

  form = {
    name: '',
    email: '',
    message: '',
  };

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
            y: 30,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
          }
        );

        obs.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(this.section.nativeElement);
  }

  async sendMail() {
    if (this.loading) return;

    this.loading = true;
    this.status = 'idle';

    try {
      await emailjs.send(
        'service_s52xlcs',   // ✅ replace
        'template_sgg2rwf',  // ✅ replace
        {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
        },
        'w4WKClcb7W0efMn2k'    // ✅ replace
      );

      this.status = 'success';
      this.form = { name: '', email: '', message: '' };

    } catch (err) {
      console.error(err);
      this.status = 'error';
    }

    this.loading = false;
  }
}
