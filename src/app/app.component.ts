import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayPaletteComponent } from './components/display-palette/display-palette.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DisplayPaletteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'palette-generator';
}
