import { AfterContentInit, Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Color, ColorService, VALID_HEX_COLOR_CODE } from './color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  randomColor!: Color;
  currentColor!: Color;
  customColorControl!: FormControl;
  useRandom = true;
  maxElements = 100;

  // this will be a pipe one of these days...
  numElements = [...Array(25).keys()];

  constructor(private colorService: ColorService) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.numElements.length <= this.maxElements && (document.body.clientHeight + window.scrollY + 200) >= document.body.scrollHeight) {
      this.numElements.push(...Array(10).keys());
    }
  }

  loadData() {
    const randomColor = this.colorService.getRandomColor();
    this.numElements = [...Array(25).keys()];
    this.randomColor = this.currentColor = randomColor;
    this.customColorControl = new FormControl('');
    this.customColorControl.setValue(randomColor.code);
    this.customColorControl.disable();
    this.useRandom = true;
  }
  
  toggleControls() {
    this.useRandom = !this.useRandom;
    this.customColorControl.disabled ? this.customColorControl.enable() : this.customColorControl.disable();
    this.updateColor();
  }

  ngAfterContentInit() {
    this.loadData();
  }

  updateColor() {
    const control = this.customColorControl;
    if (control.disabled || !control.value && control.dirty || !VALID_HEX_COLOR_CODE.test(control.value)) {
      this.currentColor = this.randomColor;
    } else {
      this.currentColor = this.colorService.buildColor(control.value);
    }
    control.setValue(this.currentColor.code);
  }
}
