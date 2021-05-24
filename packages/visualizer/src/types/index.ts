import { Layer } from "konva/lib/Layer";
import { Image } from "konva/lib/shapes/Image";

export interface Options {
    content: string;
    id: string; 
}

export interface Context {
    currentPos: number;
    // totalLen: number;
    stat: string;
    currentRow: number;
    currentCol: number;
    nextRegExp: RegExp;
    msg: string;
    htmlContent: HTMLDivElement;
    totalNodeNumbers: number;
}

export interface HintOptions {
    msg: string;
    // context: Context
}
export interface AdvOptions {
    steps: number;
    msg: string;
    regExp: RegExp;
    type: string;
    // context: Context
}

export interface KonvaContext{
    shape: Image;
    layer: Layer
}

export enum Color {
    START_TAG = 'silver',
    ATTRIBUTE = 'green',
    END_TAG = 'yellow',
    PLAIN_TEXT = 'pink',
    MUSTACHE = 'yellowgreen',
    MARK = 'violet'
    // STARTTAG = 'silver'
}