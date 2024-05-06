import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { Colour } from '../../models/colour.model';
import { CommonModule } from '@angular/common';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-generate-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule],
  templateUrl: './generate-palette.component.html',
  styleUrl: './generate-palette.component.css'
})
export class GeneratePaletteComponent implements OnInit {
  palette: Palette = new Palette;
  colours: Colour[] = new Array;
  coloursAmount: number = 3;

  constructor(private paletteService: PaletteService) {}

  ngOnInit(): void {
    //to add a palette, we need a name (empty string), and colours
    //to add a colour, we need a hexcode and rgb values
    this.generatePalette();
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
    this.colours = new Array;

    for (var i = 0; i < this.coloursAmount; i++)
    {
      var newColour = new Colour;
      newColour.rValue = Math.floor(Math.random() * 256);
      newColour.gValue = Math.floor(Math.random() * 256);
      newColour.bValue = Math.floor(Math.random() * 256);

      newColour.hexCode = this.toHex(newColour.rValue) + this.toHex(newColour.gValue) + this.toHex(newColour.bValue);
      newColour.hexCode = newColour.hexCode.toUpperCase();

      this.colours.push(newColour);
    }
  }

  toHex(num: number): string {
    var hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue.toString() + ', ';
    value += colour.gValue.toString() + ', ';
    value += colour.bValue.toString() + ')';
    return value;
  }
}
