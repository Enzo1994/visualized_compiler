import {
  Options,
  Context,
  AdvOptions,
  KonvaContext,
  Color,
} from "./types/index";
import Konva from "konva";
import HTML2Canvas from "html2canvas";
import HTMLPrettify from "html-prettify";
import { sleep } from "./utils";
const html = `
  <section class="wrapper">
    <ul>
      <li
        v-for="(item, i) in list"
        :key="i"
      >
        <SomeVueComponent
          size="1.5rem"
          v-html="getIcon('tickIcon').html"
        />
        <span>{{ item }}</span>
      </li>
    </ul>
    <a
      class="some-link"
      href="#"
    >Link</a>
  </section>
`;

console.log(HTMLPrettify(html));

export class Visualizer {
  content: string;
  context: Context;
  range: Range;
  konvaContext: KonvaContext;
  constructor(opts: Options) {
    this.content = opts.content;
    this.context = {
      currentPos: 0,
      //   totalLen: 0,
      stat: "not start",
      nextRegExp: null,
      currentRow: 0,
      currentCol: 0,
      msg: "",
      htmlContent: null,
      totalNodeNumbers: 0,
    };
    this.range = document.createRange();
    this.context.htmlContent = this.compileStringToHTML(this.content);
    this.addKonva(opts.id);
    this.renderText();
  }
  init() {}

  nope() {
    console.log("后面内容不符合这个正则表达式");
  }

  addKonva(container) {
    const containerHTMLObject = document.getElementById(container);
    const stage = new Konva.Stage({
      container,
      width: containerHTMLObject.offsetWidth - 2,
      height: containerHTMLObject.offsetHeight - 2,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const shape = new Konva.Image({
      x: 0,
      y: 0,
      draggable: true,
      scaleX: 1 / window.devicePixelRatio,
      scaleY: 1 / window.devicePixelRatio,
      // width: containerHTMLObj.offsetWidth,
      image: null,
    });
    layer.add(shape);
    layer.draw();

    this.konvaContext = { shape, layer };
  }

  /**
   * 计算最大文本行长度
   * @param content 带换行符文本
   */
  calcFormattedContentMaxWidth(htmlObject, content) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = htmlObject.style.font;
    return content.split("\n").reduce((prev, cur) => {
      return Math.max(ctx.measureText(cur).width, prev);
    }, 0);

    //   console.log('maxWidth', maxWidth);
  }

  setRageColor(startIdx, endIdx, color) {
    const { htmlContent: htmlObject } = this.context;
    // const rangeNode = !totalNodeNumbers?htmlObject.firstChild:htmlObject.lastChild
    // this.range.setStart(rangeNode,startIdx)
    // this.range.setEnd(rangeNode,endIdx)

    // this.range.surroundContents(colorfulWrapper)
    this.content = this.surroundContents(startIdx, endIdx, color)
    console.log(htmlObject);
  }

  surroundContents(startIdx: number, endIdx: number, color: string) {
    const colorfulWrapperStartTag = `<div style="color:${color}">`;
    const colorfulWrapperEndTag = `</div>`;
    const firstHalf = this.content.substring(0, startIdx);
    const selected = this.content.substring(startIdx, endIdx);
    const secondHalf = this.content.substring(endIdx);
    return (
      firstHalf +
      colorfulWrapperStartTag +
      selected +
      colorfulWrapperEndTag +
      secondHalf
    );
  }

  async renderText() {
      const htmlObject = this.compileStringToHTML(this.content)
    document.body.appendChild(htmlObject);

    const maxWidth =
      this.calcFormattedContentMaxWidth(htmlObject, htmlObject.innerText) * 2;
    const canvas = await HTML2Canvas(htmlObject, {
      width: maxWidth,
    });
    this.konvaContext.shape.image(canvas);
    this.konvaContext.layer.draw();
    // document.body.removeChild(htmlObject);
  }

  async hint(msg: string) {
    await sleep(1000);
    console.log(msg);
  }

  async adv(opts: AdvOptions) {
    await this.hint(opts.msg);
    this.context.nextRegExp = opts.regExp;
    this.context.msg = opts.msg;
    this.context.stat = opts.type;

    console.log("this.context.currentPos", this.context.currentPos);

    this.setRageColor(
      this.context.currentPos,
      (this.context.currentPos += opts.steps),
      Color[opts.type]
    );
    console.log("this.context.currentPos", this.context.currentPos);
    this.renderText();
  }

  compileStringToHTML(htmlString) {
    console.log("htmlString", htmlString);
    var el = document.createElement("div");
    el.id = "_visualizerContainer";
    try {
      el.innerText = htmlString;
    } catch (e) {
      alert("html文本不符合规范");
    }

    return el;
  }
}
