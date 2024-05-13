import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DisplayPaletteComponent } from './components/display-palette/display-palette.component';
import { GeneratePaletteComponent } from './components/generate-palette/generate-palette.component';
import { SaveColourComponent } from './components/save-colour/save-colour.component';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    DisplayPaletteComponent, //needed?
    GeneratePaletteComponent, 
    SaveColourComponent,
    ViewPalettesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'palette-generator';
}
