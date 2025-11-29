import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[magnetic]',
  standalone: true,
})
export class MagneticDirective {

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform =
      `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const element = this.el.nativeElement;
    element.style.transform = 'translate(0, 0)';
  }
}
