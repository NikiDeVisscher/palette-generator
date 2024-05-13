import { Injectable } from '@angular/core';
import { Colour } from '../models/colour.model';

@Injectable({
  providedIn: 'root'
})
export class ColoursService {
  colours: Colour[] = new Array;
  locks: boolean[] = new Array;

  constructor() { }

  getColours(): Colour[] {
    return this.colours;
  }

  setColours(colours: Colour[]): void {
    this.colours = new Array;
    this.colours = colours;
  }

  addColour(colour: Colour): void {
    this.colours.push(colour);
  }

  getColour(index: number): Colour {
    return this.colours[index];
  }

  resetColours(): void {
    this.colours = new Array;
  }

  saveLocks(locks: boolean[]): void {
    this.locks = new Array;
    this.locks = locks;
  }

  getLocks(): boolean[] | null {
    if (this.locks.length == 0)
      return null;
    else
      return this.locks;
  }
}
