import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { CommonModule } from '@angular/common';
import { Colour } from '../../models/colour.model';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-display-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule],
  templateUrl: './display-palette.component.html',
  styleUrl: './display-palette.component.css'
})
export class DisplayPaletteComponent implements OnInit{
  palette: Palette = new Palette;
  id: number = 0; //change later

  constructor(private paletteService: PaletteService) {}

  ngOnInit(): void {
    this.palette = this.paletteService.getPalette(this.id)!;
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue.toString() + ', ';
    value += colour.gValue.toString() + ', ';
    value += colour.bValue.toString() + ')';
    return value;
  }
}
