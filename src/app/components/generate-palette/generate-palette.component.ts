import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { Colour } from '../../models/colour.model';

@Component({
  selector: 'app-generate-palette',
  standalone: true,
  imports: [],
  templateUrl: './generate-palette.component.html',
  styleUrl: './generate-palette.component.css'
})
export class GeneratePaletteComponent implements OnInit {
  palette: Palette = new Palette;
  coloursAmount: number = 3;

  constructor(private paletteService: PaletteService) {}

  ngOnInit(): void {
    //to add a palette, we need an id (get previous id), a name (empty string), and colours
    //to add a colour, we need a hexcode and rgb values
  }

  //algorithm based on https://shahriyarshahrabi.medium.com/procedural-color-algorithm-a37739f6dc1
  generatePalette(): Palette {
    var keyColours = new Array;
    for (var i = 0; i < this.coloursAmount; i++)
    {
      var now = Date.now();
      var keyColour = new Colour;
      keyColour.rValue = Math.abs(Math.sin(this.seededRandom(now) + 12) + Math.sin(this.seededRandom(now) * 0.7 + 71.124) * 0.5);
    }
    
    var newPalette = new Palette;
    return newPalette;
  }

  seededRandom(seed: number): number {
    let x = Math.sin(seed) * 10000;
    x += Math.sin(x);
    return x - Math.floor(x);
}
}
