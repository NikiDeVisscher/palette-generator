import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { Colour } from '../../models/colour.model';
import { ColoursService } from '../../services/colours.service';

@Component({
  selector: 'app-pick-colour',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, ColorPickerModule],
  templateUrl: './pick-colour.component.html',
  styleUrl: './pick-colour.component.css'
})
export class PickColourComponent implements OnInit {
  colour: Colour = new Colour;
  colourVal: string = "#CA4D2D";

  constructor(private colourservice: ColoursService, private router: Router) {}

  ngOnInit(): void {
    
  }
}
