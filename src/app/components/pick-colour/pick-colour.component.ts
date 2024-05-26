import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { Colour } from '../../models/colour.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pick-colour',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, ColorPickerModule, UpperCasePipe, FormsModule],
  templateUrl: './pick-colour.component.html',
  styleUrl: './pick-colour.component.css'
})
export class PickColourComponent implements OnInit {
  @Output() cancelMessage = new EventEmitter<boolean>();
  @Output() colourMessage = new EventEmitter<Colour>();
  colour: Colour = new Colour;

  constructor() {}

  ngOnInit(): void {
    this.colour.hexCode = "#CA4D2D";
    this.onSlide();
  }

  onSlide(): void {
    var rgbValues = this.hexToRgb(this.colour.hexCode);
    this.colour.rValue = rgbValues.r.toString();
    this.colour.gValue = rgbValues.g.toString();
    this.colour.bValue = rgbValues.b.toString();
  }

  onRGBchange(): void {
    this.colour.hexCode = "#" + this.toHex(parseInt(this.colour.rValue)) + this.toHex(parseInt(this.colour.gValue)) + this.toHex(parseInt(this.colour.bValue));
  }

  toHex(num: number): string {
    var hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.replace('#', '');
  
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
  
    return { r, g, b };
  }

  onGenerate(): void {
    this.colour.hexCode = this.colour.hexCode.replace('#', '');
    this.colour.hexCode = this.colour.hexCode.toUpperCase();
    this.colourMessage.emit(this.colour);
  }

  onCancelPick(): void {
    this.cancelMessage.emit(true);
  }
}
