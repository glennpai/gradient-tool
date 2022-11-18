import { Injectable } from '@angular/core';

export type Color = {
  code: string;
  hex: string;
}

export const VALID_HEX_COLOR_CODE = new RegExp(/^[a-fA-F0-9]{6}$/);
export const DEFAULT_COLOR = {
  code: "FFFFFF",
  hex: "#FFFFFF"
};

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getRandomColor(): Color {
    const code = "000000".replace(/0/g, () => { 
      return (Math.floor(Math.random() * 16)).toString(16); 
    }).toUpperCase();
    const hex = `#${code}`;

    return {code, hex};
  }

  buildColor(code: string): Color {
    if (!VALID_HEX_COLOR_CODE.test(code)) {
      return DEFAULT_COLOR;
    } 

    return {
      code: `${code}`.toUpperCase(),
      hex: `#${code}`.toUpperCase(),
    }
  }

  buildGradient(initialColorHex: string, finalColorHex: string): string {
    return `linear-gradient(45deg, ${initialColorHex} 25%, ${finalColorHex} 100%)`;
  }
}
