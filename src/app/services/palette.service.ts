import { Injectable } from '@angular/core';
import { Palette } from '../models/palette.model';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  constructor() { }

  palettes: Palette[] = [
    {
      id: 0,
      name: "Louisette",
      colours: [
        {
          hexCode: "FFB8D1",
          rValue: 255,
          gValue: 184,
          bValue: 209
        },
        {
          hexCode: "E4B4C2",
          rValue: 228,
          gValue: 180,
          bValue: 194
        },
        {
          hexCode: "1D1E2C",
          rValue: 29,
          gValue: 30,
          bValue: 44
        }
      ]
    },
    {
      id: 1,
      name: "Durandal",
      colours: [
        {
          hexCode: "226F54",
          rValue: 34, 
          gValue: 111,
          bValue: 84
        },
        {
          hexCode: "87C38F",
          rValue: 135,
          gValue: 195,
          bValue: 143
        },
        {
          hexCode: "F8BD4F",
          rValue: 248,
          gValue: 189,
          bValue: 79
        }
      ]
    }
  ];

  getPalettes() {
    return this.palettes;
  }

  getPalette(id: number) {
    var foundPalette;
    this.palettes.forEach(palette => {
      if (palette.id == id)
        foundPalette = palette;
    });

    return foundPalette;
  }

  addPalette(palette: Palette): void {
    var tempPalettes = new Array();
    tempPalettes.push(palette);
    this.palettes.forEach(aPalette => {
      tempPalettes.push(aPalette);
    });

    this.palettes = new Array();
    this.palettes = tempPalettes;
  }
}
