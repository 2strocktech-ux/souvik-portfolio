import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [GlassCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit {

  @ViewChild('projectsSection', { read: ElementRef })
  section!: ElementRef;

  @ViewChildren('card', { read: ElementRef })
  cards!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {

          gsap.from(
            this.cards.map(c => c.nativeElement),
            {
              opacity: 0,
              y: 50,
              scale: 0.96,
              stagger: 0.15,
              duration: 0.9,
              ease: 'power3.out',
            }
          );

          obs.disconnect(); // ✅ run only once
        }
      },
      {
        threshold: 0.3, // 30% visible
      }
    );

    observer.observe(this.section.nativeElement);
  }
}
