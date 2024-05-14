import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { CommonModule } from '@angular/common';
import { Colour } from '../../models/colour.model';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-display-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule],
  templateUrl: './display-palette.component.html',
  styleUrl: './display-palette.component.css'
})
export class DisplayPaletteComponent implements OnInit{
  palette: Palette = new Palette();

  constructor(private paletteService: PaletteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.onLoadPalette(params['id']!);
    });
  }

  onLoadPalette(id: string): void {
    this.paletteService.getPalette(id).subscribe({
      next: (response: Palette) => {
        console.log('palette loaded: ', response);
        this.palette = response;
      },
      error: (error) => console.log('error: ', error)
    });
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue.toString() + ', ';
    value += colour.gValue.toString() + ', ';
    value += colour.bValue.toString() + ')';
    return value;
  }
}
