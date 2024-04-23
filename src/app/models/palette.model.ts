import { Colour } from "./colour.model";

export class Palette {
    id: number;
    name: string;
    colours: Colour[];

    constructor(id: number = -1, name: string = "", colours: Colour[] = new Array)
    {
        this.id = id;
        this.name = name;
        this.colours = colours;
    }
}
