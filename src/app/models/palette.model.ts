import { Colour } from "./colour.model";

export class Palette {
    id?: string;
    name?: string;
    colours: Colour[];

    constructor(name: string = "", colours: Colour[] = new Array)
    {
        this.name = name;
        this.colours = colours;
    }
}
