import { Component, Input, OnInit, input } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { Colour } from '../../models/colour.model';
import { CommonModule } from '@angular/common';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColoursService } from '../../services/colours.service';
import { Router } from '@angular/router';
import { PickColourComponent } from '../pick-colour/pick-colour.component';

@Component({
  selector: 'app-generate-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, MatButtonModule, MatIconModule, PickColourComponent],
  templateUrl: './generate-palette.component.html',
  styleUrl: './generate-palette.component.css'
})
export class GeneratePaletteComponent implements OnInit {
  @Input() pickedColour: Colour = new Colour;
  pick: boolean = false;
  hasPicked: boolean = false;
  palette: Palette = new Palette;
  colours: Colour[] = new Array;
  locks: boolean[] = new Array;
  hoveredLock: number = -1;
  coloursAmount: number = 3;
  colourOptions: number[] = new Array;
  min: number = 3;
  max: number = 6;

  constructor(private colourService: ColoursService, private router: Router) {}

  ngOnInit(): void {
    for (var i = this.min; i <= this.max; i++)
      this.colourOptions.push(i);

    for (var i = 0; i < this.min; i++)
      this.locks.push(false);

    if (this.colourService.getLocks() == null)
      this.generatePalette();
    else
    {
      this.colours = this.colourService.getColours();
      this.locks = this.colourService.getLocks()!;
    }
  }

  onLockColour(index: number): void {
    if (this.locks[index])
      this.locks[index] = false;
    else 
      this.locks[index] = true;
  }

  onDeleteColour(index: number):void {
    this.coloursAmount--;

    this.colours.splice(index, 1);
    this.colourService.setColours(this.colours);
    this.locks.splice(index, 1);
  }

  onAddColour(prevIndex: number): void {
    this.coloursAmount++;
    
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

  generatePalette() { //to add: check if no double colours
    this.colourService.resetColours();

    for (var i = 0; i < this.coloursAmount; i++)
    {
      if (this.locks[i] == false)
        var newColour = this.generateColour();
      else 
        var newColour = this.colours[i];

      this.colourService.addColour(newColour);
    }

    this.colours = new Array;
    this.colours = this.colourService.getColours();
  }

  generateColour(): Colour {
    var colour = new Colour;
    colour.rValue = (Math.floor(Math.random() * 256)).toString();
    colour.gValue = (Math.floor(Math.random() * 256)).toString();
    colour.bValue = (Math.floor(Math.random() * 256)).toString();

    colour.hexCode = this.toHex(parseInt(colour.rValue)) + this.toHex(parseInt(colour.gValue)) + this.toHex(parseInt(colour.bValue));
    colour.hexCode = colour.hexCode.toUpperCase();

    return colour;
  }

  toHex(num: number): string {
    var hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  setColour(colour: Colour): string {
    var value = 'rgb(';
    value += colour.rValue + ', ';
    value += colour.gValue + ', ';
    value += colour.bValue + ')';
    return value;
  }

  setClass(): string {
    var num = Math.floor(12 / this.colours.length);
    return "col-sm-" + num + " text-center";
  }

  optionButtonColor(option: number): string {
    if (this.coloursAmount == option)
      return "#70B8A2";
    return "#06373E";
  }

  onSelectOption(option: number): void {
    if (option < this.coloursAmount)
    {
      var lockCount = 0;
      this.locks.forEach(lock => {
        if (lock)
          lockCount++;
      });
      if (option < lockCount)
        return;
    }
    if (option > this.coloursAmount)
    {
      for (var i = 0; i < option - this.coloursAmount; i++)
        this.locks.push(false);
    }
    this.coloursAmount = option;
    this.generatePalette();
  }

  onStartFromColour(): void {
    this.pick = true;
  }

  onSave(): void {
    this.colourService.saveLocks(this.locks);
    this.router.navigate(['/save']);
  }

  onCancelMessage(cancelPick: boolean): void {
    if (cancelPick)
      this.pick = false;
  }

  onColourMessage(newColour: Colour): void {
    this.colours[0] = newColour;
    this.coloursAmount = this.min;
    this.locks = new Array;
    this.locks.push(true);
    for (var i = 1; i < this.coloursAmount; i++)
    {
      this.locks.push(false);
    }
    this.generatePalette();
    this.pick = false;
    this.hasPicked = true;
  }
}
