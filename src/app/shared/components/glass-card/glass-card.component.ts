import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  templateUrl: './glass-card.component.html',
  styleUrls: ['./glass-card.component.scss'],
})
export class GlassCardComponent {

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent) {
    const card = this.el.nativeElement.querySelector('.glass-card');
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 12;
    const rotateY = (x - rect.width / 2) / 12;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }

  @HostListener('mouseleave')
  reset() {
    const card = this.el.nativeElement.querySelector('.glass-card');
    card.style.transform = '';
  }
}
