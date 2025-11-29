import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class GsapService {

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  revealCards(selector: string) {
    gsap.from(selector, {
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    });
  }
}
