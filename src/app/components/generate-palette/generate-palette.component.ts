import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { Colour } from '../../models/colour.model';
import { CommonModule } from '@angular/common';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColoursService } from '../../services/colours.service';

@Component({
  selector: 'app-generate-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule, MatIconModule],
  templateUrl: './generate-palette.component.html',
  styleUrl: './generate-palette.component.css'
})
export class GeneratePaletteComponent implements OnInit {
  palette: Palette = new Palette;
  colours: Colour[] = new Array;
  locks: boolean[] = new Array(false, false, false);
  hoveredLock: number = -1;
  coloursAmount: number = 3;
  colourOptions: number[] = new Array;
  min: number = 3;
  max: number = 6;

  constructor(private paletteService: PaletteService, private colourService: ColoursService) {}

  ngOnInit(): void {
    for (var i = this.min; i <= this.max; i++)
    {
      this.colourOptions.push(i);
    }
    this.generatePalette();
  }

  onLockColour(index: number): void {
    if (this.locks[index])
      this.locks[index] = false;
    else 
      this.locks[index] = true;
  }

  onDeleteColour(index: number):void {
    if (this.decrementColours())
    {
      /*var tempColours = new Array;
      var tempLocks = new Array;
      for (var i = 0; i <= this.coloursAmount; i++)
      {
        if (i != index)
        {
          tempColours.push(this.colourService.getColour(i));
          tempLocks.push(this.locks[i]);
        }
      }*/
      //var tempColours = this.colours;
      //var tempLocks = this.locks;
      //tempColours.splice(index, 1);
      //tempLocks.splice(index, 1);

      //this.colours = new Array;
      //this.colours = tempColours;
      //this.colourService.setColours(tempColours);
      //this.colours = this.colourService.getColours();
      //this.locks = new Array;
      //this.locks = tempLocks;

      this.colours.splice(index, 1);
      this.locks.splice(index, 1);
    }
  }

  onAddColour(prevIndex: number): void {
    if (this.incrementColours())
    {
      var prevColours = this.colourService.getColours();
      var prevLocks = this.locks;
      this.colourService.resetColours();
      this.locks = new Array;
      for (var i = 0; i < this.coloursAmount; i++)
      {
        if (i < prevIndex + 1)
        {
          this.colourService.addColour(prevColours[i]);
          this.locks.push(prevLocks[i]);
        }
        else if (i == prevIndex + 1)
        {
          this.colourService.addColour(this.generateColour());
          this.locks.push(false);
        }
        else 
        {
          this.colourService.addColour(prevColours[i-1]);
          this.locks.push(prevLocks[i-1]);
        }
      }
    }
    this.colours = this.colourService.getColours();
  }

  toggleLock(index: number): void {
    if (this.hoveredLock < 0)
      this.hoveredLock = index;
    else if (this.hoveredLock == index)
      this.hoveredLock = -1;
  }

  checkLock(index: number): string {
    if (this.locks[index]) //als lock gelocked is
    {
        return '#06373E'; //donkere kleur
    }
    else //als lock niet gelocked is
    {
      if (this.hoveredLock == index) //als gehovered wordt
        return '#06373E'; //donkere kleur
      else //als niet gehovered wordt
        return '#C1CBCC'; //lichte kleur
    }
  }

  incrementColours(): boolean {
    this.coloursAmount++;
    if (this.coloursAmount == this.max)
      return false;
    else 
      return true;
  }

  decrementColours(): boolean {
    this.coloursAmount--;
    if (this.coloursAmount == this.min)
      return false;
    else 
      return true;
  }

  generatePalette() { //to add: check if no double colours
    //var tempColours = new Array;
    this.colourService.resetColours();

    for (var i = 0; i < this.coloursAmount; i++)
    {
      if (this.locks[i] == false)
        var newColour = this.generateColour();
      else 
        var newColour = this.colourService.getColour(i);

      //tempColours.push(newColour);
      this.colourService.addColour(newColour);
    }

    this.colours = this.colourService.getColours();
  }

  generateColour(): Colour {
    var colour = new Colour;
    colour.rValue = Math.floor(Math.random() * 256);
    colour.gValue = Math.floor(Math.random() * 256);
    colour.bValue = Math.floor(Math.random() * 256);

    colour.hexCode = this.toHex(colour.rValue) + this.toHex(colour.gValue) + this.toHex(colour.bValue);
    colour.hexCode = colour.hexCode.toUpperCase();

    return colour;
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

  optionButtonColor(option: number): string {
    if (this.coloursAmount == option)
      return "#70B8A2";
    return "#06373E";
  }

  onSelectOption(option: number): void {
    this.coloursAmount = option;
    this.locks.push(false);
    this.generatePalette();
  }
}
