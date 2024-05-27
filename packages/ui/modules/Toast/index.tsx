/**
 * 提示组件
 */
import './index.less';

const closerPng = require('./closer.png');

let i = 0; // 多个toast的index
const closeTime = 2; // 默认关闭时间 单位 s

const toast = {
  appendToDom(html: string) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.outerHTML = html;
  },
  close(selector: string, time: number) {
    const node = document.querySelector(selector) as HTMLElement;
    return setTimeout(() => {
      document.body.removeChild(node);
    }, time);
  },
  generateHtml(
    msg: string,
    index: number,
    zIndex?: number,
    styles: Record<string, any> = {},
    html?: string,
    className?: string,
    type: 'correct' | 'error' = 'error'
  ) {
    let cssText = Object.entries(styles).reduce(
      (styleString, [propName, propValue]) => {
        return `${styleString}${propName}:${propValue};`;
      },
      ''
    );
    if (typeof zIndex !== 'undefined') {
      cssText += `;z-index: ${zIndex};`;
    }
    return `
    <div class="b-toast b-toast-${index} ${className ||
      ''} b-toast-${type}" style="${cssText}">
        ${html || ''}
        <p>${msg}</p>
        <div class="b-toast-closer b-toast-closer-${index}">
          <img>
        </div>
    </div>
  `;
  },
};

interface IMessage {
  time?: number;
  zIndex?: number;
  html?: string;
  styles?: Record<string, any>;
  className?: string;
  type?: 'correct' | 'error';
}

export default {
  message(msg: string, options: IMessage = {}) {
    const index = ++i;
    const time = (options.time || closeTime) * 1000;
    const html = toast.generateHtml(
      msg,
      index,
      options.zIndex,
      options.styles,
      options.html,
      options.className,
      options.type
    );
    toast.appendToDom(html);

    const timer = toast.close(`.b-toast-${index}`, time);

    const closerNode = document.querySelector(
      `.b-toast-closer-${index} img`
    ) as HTMLImageElement;

    closerNode.src = closerPng;
    closerNode.onclick = () => {
      clearTimeout(timer);
      toast.close(`.b-toast-${index}`, 0);
    };
  },
};
