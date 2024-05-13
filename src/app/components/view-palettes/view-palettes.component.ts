import { Component, OnInit } from '@angular/core';
import { Colour } from '../../models/colour.model';
import { Palette } from '../../models/palette.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PaletteService } from '../../services/palette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-palettes',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './view-palettes.component.html',
  styleUrl: './view-palettes.component.css'
})
export class ViewPalettesComponent implements OnInit {
  palettes: Palette[] = new Array;

  constructor(private paletteService: PaletteService, private router: Router) {}

  ngOnInit(): void {
    this.paletteService.getPalettes().subscribe({
      next: (response: Palette[]) => {
        this.palettes = response;
      }
    });
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue + ', ';
    value += colour.gValue + ', ';
    value += colour.bValue + ')';
    return value;
  }
}
