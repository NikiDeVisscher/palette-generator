import { Routes } from '@angular/router';
import { GeneratePaletteComponent } from './components/generate-palette/generate-palette.component';
import { SaveColourComponent } from './components/save-colour/save-colour.component';
import { ViewPalettesComponent } from './components/view-palettes/view-palettes.component';
import { DisplayPaletteComponent } from './components/display-palette/display-palette.component';

export const routes: Routes = [
    {path: '', component: GeneratePaletteComponent},
    {path: 'save', component: SaveColourComponent},
    {path: 'view', component: ViewPalettesComponent, children: [
        {path: ':id', component: DisplayPaletteComponent}
    ]}
];
