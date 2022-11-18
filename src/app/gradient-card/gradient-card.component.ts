import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gradient-card',
  templateUrl: './gradient-card.component.html',
  styleUrls: ['./gradient-card.component.scss']
})
export class GradientCardComponent {
  @Input()
  baseColor!: string;
  gradientColor: string = this.getColor();

  getColor() {
    return "#000000".replace(/0/g, () => { 
      return (Math.floor(Math.random() * 16)).toString(16); 
    });
  }

  getGradient() {
    return `linear-gradient(45deg, ${this.baseColor} 25%, ${this.gradientColor} 100%)`;
  }

}
