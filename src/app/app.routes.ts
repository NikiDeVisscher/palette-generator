import { Routes } from '@angular/router';
import { GeneratePaletteComponent } from './components/generate-palette/generate-palette.component';
import { SaveColourComponent } from './components/save-colour/save-colour.component';

export const routes: Routes = [
    {path: '', component: GeneratePaletteComponent},
    {path: 'save', component: SaveColourComponent}
];
