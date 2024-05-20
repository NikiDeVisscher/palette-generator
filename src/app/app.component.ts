import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GeneratePaletteComponent } from './components/generate-palette/generate-palette.component';
import { SaveColourComponent } from './components/save-colour/save-colour.component';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
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
