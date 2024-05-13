import { Colour } from "./colour.model";

export class Palette {
    id?: string;
    name?: string;
    colours: Colour[];

    constructor(id: number = -1, name: string = "", colours: Colour[] = new Array)
    {
        this.id = id.toString();
        this.name = name;
        this.colours = colours;
    }
}
