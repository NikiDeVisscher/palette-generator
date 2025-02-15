export class Colour {
    hexCode: string;
    rValue: string;
    gValue: string;
    bValue: string;

    constructor(hexCode: string = "", rValue: number = 0, gValue: number = 0, bValue: number = 0)
    {
        this.hexCode = hexCode;
        if (rValue >= 0 && rValue <= 255)
            this.rValue = rValue.toString();
        else if (rValue < 0)
            this.rValue = "0";
        else
            this.rValue = "255";

        if (gValue >= 0 && gValue <= 255)
            this.gValue = gValue.toString();
        else if (gValue < 0)
            this.gValue = "0";
        else
            this.gValue = "255";

        if (bValue >= 0 && bValue <= 255)
            this.bValue = bValue.toString();
        else if (bValue < 0)
            this.bValue = "0";
        else
            this.bValue = "255";
    }
}
