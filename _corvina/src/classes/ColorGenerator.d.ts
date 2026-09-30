export default class ColorGenerator {
    private defaultDataColors;
    private defaultDataIndex;
    constructor(colors: string[]);
    setColorScheme(colors: string[]): void;
    notifyDataColor(color: string): void;
    getDataColor(): string;
}
