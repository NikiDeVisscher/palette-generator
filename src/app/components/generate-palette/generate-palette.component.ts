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
    //to add a palette, we need a name (empty string), and colours
    //to add a colour, we need a hexcode and rgb values
  }

  onIncrementColours(): boolean {
    this.coloursAmount++;
    if (this.coloursAmount == 6)
    {
      return false;
    }
    else 
    {
      return true;
    }
  }

  onDecrementColours(): boolean {
    this.coloursAmount--;
    if (this.coloursAmount == 3)
    {
      return false;
    }
    else 
    {
      return true;
    }
  }

  generatePalette() {
    var newPalette = new Palette;

    for (var i = 0; i < this.coloursAmount; i++)
    {
      var newColour = new Colour;
      newColour.rValue = Math.floor(Math.random() * 256);
      newColour.gValue = Math.floor(Math.random() * 256);
      newColour.bValue = Math.floor(Math.random() * 256);

      newColour.hexCode = this.toHex(newColour.rValue) + this.toHex(newColour.gValue) + this.toHex(newColour.bValue);

      newPalette.colours.push(newColour);
    }

    this.palette = newPalette;
  }

  toHex(num: number): string {
    var hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
