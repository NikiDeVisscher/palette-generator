import { Component, OnInit } from '@angular/core';
import { Palette } from '../../models/palette.model';
import { PaletteService } from '../../services/palette.service';
import { CommonModule } from '@angular/common';
import { HexPipe } from '../../pipes/hex.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { SetRGBpipePipe } from '../../pipes/set-rgbpipe.pipe';

@Component({
  selector: 'app-display-palette',
  standalone: true,
  imports: [CommonModule, HexPipe, SetRGBpipePipe, MatButtonModule, MatIconModule],
  templateUrl: './display-palette.component.html',
  styleUrl: './display-palette.component.css'
})
export class DisplayPaletteComponent implements OnInit{
  palette: Palette = new Palette();
  copied: boolean = false;
  fadeOut: boolean = false;

  constructor(
    private paletteService: PaletteService, 
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.onLoadPalette(params['id']!);
    });
  }

  onLoadPalette(id: string): void {
    this.paletteService.getPalette(id).subscribe({
      next: (response: Palette) => {
        console.log('palette loaded: ', response);
        this.palette = response;
      },
      error: (error) => console.log('error: ', error)
    });
  }

  dump(): string
  {
    this.copied = true;
      var str = '"' + this.palette.name! + '": [\n ';
      this.palette.colours.forEach(colour => {
          str += '{\n  "hex": "#' + colour.hexCode + '",\n  ';
          str += '"rValue": "' + colour.rValue + '",\n  ';
          str += '"gValue": "' + colour.gValue + '",\n  ';
          str += '"bValue": "' + colour.bValue + '"\n },\n ';
      });
      return str + ']';
  }

  onCopy(): void {
    var text = this.dump();
    this.clipboard.copy(text);
    this.fadeOut = false;

    setTimeout(() => {
      this.fadeOut = true;
    }, 3000);

    setTimeout(() => {
      this.copied = false;
      this.fadeOut = false;
    }, 2000);
  }
}
