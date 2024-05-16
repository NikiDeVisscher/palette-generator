import { Component, OnInit } from '@angular/core';
import { Colour } from '../../models/colour.model';
import { Palette } from '../../models/palette.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PaletteService } from '../../services/palette.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-palettes',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, FormsModule],
  templateUrl: './view-palettes.component.html',
  styleUrl: './view-palettes.component.css'
})
export class ViewPalettesComponent implements OnInit {
  palettes: Palette[] = new Array;
  isVisible: boolean = false;
  editing: string = "";
  newName: string = "";

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

  setClass(palette: Palette): string {
    var num = Math.floor(12 / palette.colours.length);
    return "col-sm-" + num + " colour";
  }

  onView(index: string | undefined): void {
    if (this.editing)
      return;
    this.isVisible = true;
    index = index? index : "0";
    this.router.navigate(['view/' + index]);
  }

  onEdit(index: string | undefined, numIndex: number, event: Event): void {
    event.stopPropagation();
    if (this.editing)
      return;

    this.newName = this.palettes[numIndex].name!;
    index = index? index : "0";
    this.editing = index;
  }

  onSave(index: number, event: Event): void {
    event.stopPropagation();

    this.palettes[index].name = this.newName;
    this.newName = "";
    this.editing = "";

    this.paletteService.updatePalette(this.palettes[index]).subscribe(
      () => {
        this.router.navigate(['view']);
      }
    );
  }

  onDelete(index: string | undefined, event: Event): void {
    event.stopPropagation();
    index = index? index : "0";
    this.paletteService.deletePalette(index).subscribe(
      () => {
        this.paletteService.getPalettes().subscribe({
          next: (response: Palette[]) => {
            this.palettes = response;
          }
        });
        this.router.navigate(['view']);
      }
    )
  }

  onClose(): void {
    this.isVisible = false;
    this.router.navigate(['view']);
  }
}
