import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { ColoursService } from '../../services/colours.service';
import { Colour } from '../../models/colour.model';
import { CommonModule } from '@angular/common';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PaletteService } from '../../services/palette.service';

@Component({
  selector: 'app-save-colour',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule],
  templateUrl: './save-colour.component.html',
  styleUrl: './save-colour.component.css'
})
export class SaveColourComponent implements OnInit {
  palette: Palette = new Palette;
  colours: Colour[] = new Array;
  warning: string = "";
  maxNameLength: number = 50;

  constructor(private colourService: ColoursService, private paletteService: PaletteService, private router: Router) {}

  ngOnInit(): void {
    this.colours = this.colourService.getColours();
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue + ', ';
    value += colour.gValue + ', ';
    value += colour.bValue + ')';
    return value;
  }

  setBorderLeft(index: number): string {
    var value = 'none';
    if (index == 0)
    {
      value = '5px solid #06373E';
    }

    return value;
  }

  setBorderRight(index: number): string {
    var value = 'none';
    if (index == this.colours.length -1)
    {
      value = '5px solid #06373E';
    }

    return value;
  }

  onEnterName(event: Event): void {
    this.palette.name = (event.target as HTMLInputElement).value;

    if (this.palette.name.length >= this.maxNameLength - 5)
    {
      this.warning = this.palette.name.length + "/" + this.maxNameLength;
    }
    else
      this.warning = "";
  }

  onSave(): void {
    if (this.palette.name?.length! > this.maxNameLength)
    {
      this.warning = "Name exceeds maximum character count";
    }
    else if (this.palette.name?.length! > 0)
    {
      this.warning = "";
      this.palette.colours = this.colours;
      this.paletteService.addPalette(this.palette).subscribe({});
      this.router.navigate(['/view']);
    }
    else
    {
      this.warning = "Enter a name";
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
