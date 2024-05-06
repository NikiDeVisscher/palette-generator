import { Injectable } from '@angular/core';
import { Palette } from '../models/palette.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  constructor(private http: HttpClient) { }

  getPalettes(): Observable<Palette[]> {
    const url = 'http://localhost:3000/palettes';
    return this.http.get<Palette[]>(url);
  }

  getPalette(id: number): Observable<Palette> {
    const url = 'http://localhost:3000/palettes/' + id;
    return this.http.get<Palette>(url);
  }

  addPalette(palette: Palette): Observable<Palette> {
    /*var tempPalettes = new Array();
    tempPalettes.push(palette);
    this.palettes.forEach(aPalette => {
      tempPalettes.push(aPalette);
    });

    this.palettes = new Array();
    this.palettes = tempPalettes;*/
    const url = 'http://localhost:3000/palettes';
    return this.http.post<Palette>(url, palette);
  }

  //needed?
  changeName(newName: {name: string}, id: string): Observable<Palette> {
    const url = 'http://localhost:3000/palettes/' + id;
    return this.http.patch<Palette>(url, newName);
  }

  updatePalette(palette: Palette): Observable<Palette> {
    const url = 'http://localhost:3000/palettes/' + palette.id;
    return this.http.put<Palette>(url, palette);
  }

  deletePalette(id: string): Observable<any> {
    const url = 'http://localhost:3000/palettes/' + id;
    return this.http.delete(url);
  }
}
