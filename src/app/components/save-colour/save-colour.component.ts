import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';

@Component({
  selector: 'app-save-colour',
  standalone: true,
  imports: [],
  templateUrl: './save-colour.component.html',
  styleUrl: './save-colour.component.css'
})
export class SaveColourComponent implements OnInit {
  palette: Palette = new Palette;

  ngOnInit(): void {

  }
}
