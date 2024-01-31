import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, responsive, token, stylish, isDarkMode }) => ({
    container: css`
      position: relative;
      text-align: center;
      box-sizing: border-box;
      width: 100%;

      + * {
        position: relative;
      }

      > p {
        margin: 32px;
        color: ${token.colorTextSecondary};
        font-size: 20px;
        line-height: 1.6;

        ${responsive({
          mobile: { fontSize: 16 },
        })}
      }
    `,

    titleContainer: css`
      position: relative;
    `,
    title: css`
      font-size: 68px;
      z-index: 10;
      color: transparent;
      margin: 0;
      font-family: AliPuHui, ${token.fontFamily};

      ${responsive({
        mobile: { fontSize: 40 },
      })}

      b {
        position: relative;
        z-index: 5;
        ${stylish.heroGradient};
        ${stylish.heroGradientFlow}

        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `,
    titleShadow: css`
      position: absolute;
      z-index: 0;
      color: ${isDarkMode ? token.colorWhite : token.colorTextBase};

      top: 0;
      left: 0;
      font-size: 68px;
      font-family: AliPuHui, ${token.fontFamily};
      font-weight: bold;
      ${responsive({
        mobile: { fontSize: 40 },
      })}

      ${stylish.heroTextShadow}

    b {
        color: transparent;
      }
    `,

    desc: css`
      font-size: ${token.fontSizeHeading3}px;
      color: ${token.colorTextSecondary};

      ${responsive.mobile} {
        font-size: ${token.fontSizeHeading5}px;
        margin: 24px 16px;
      }
    `,

    actions: css`
      margin-top: 48px;
      display: flex;
      justify-content: center;

      ${responsive({
        mobile: { marginTop: 24 },
      })}
    `,
    canvas: css`
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -6;
      overflow: hidden;
      inset: 0;
      width: 100%;
      perspective: 1000px;
      transition: perspective 3s ${token.motionEaseInOutCirc} 0s;
    `,

    canvasInner: css`
      background: linear-gradient(to top, rgba(0, 0, 0, 0) 0px, #f8f8fa 70%);
      --gradient-stop-2: 50%;
      --gradient-stop-1: 0px;
      z-index: 100;
      position: absolute;
      --geist-foreground: #fff;
      inset: 0;
    `,
    bmask: css`
      background: rgb(254, 254, 254);
      background: linear-gradient(
        0deg,
        rgb(248 248 250) 0%,
        rgba(255, 255, 255, 0) 30%,
        rgba(255, 255, 255, 0) 100%
      );
      width: 100%;
      height: 12rem;
      left: 0;
      bottom: 0;
      position: absolute;
      --gradient-stop-2: 120px;
      --gradient-stop-1: 0px;
      --geist-foreground: #fff;
    `,

    canvasInnerDark: css`
      transform: rotateX(75deg);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 0 solid #e5e7eb;
      --gradient-stop-2: 120px;
      --gradient-stop-1: 0px;
      --geist-foreground: #fff;
    `,
    canvasInnerDarkInner: css`
      animation-duration: 30s;
      mask-size: 80px 80px;
      --right: #f8cde8;
      --left: #00a76f;
      position: absolute;
      width: 200vw;
      margin-left: -50%;
      transform: translateY(0);
      background-image: linear-gradient(
        to right,
        var(--left) 45%,
        transparent 50%,
        var(--right) 55%
      );
      -webkit-mask-image: linear-gradient(90deg, #000 2px, transparent 0),
        linear-gradient(180deg, #000 2px, transparent 0);
      mask-image: linear-gradient(90deg, #000 2px, transparent 0),
        linear-gradient(180deg, #000 2px, transparent 0);
      -webkit-mask-size: 60px 60px;
      mask-size: 60px 60px;
      overflow: hidden;
      -webkit-mask-repeat: repeat;
      mask-repeat: repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      inset: -100% 0;
      background-position-y: 100%;
      -webkit-mask-position: 50% 0;
      mask-position: 50% 0;
      animation: gradient 10s linear infinite;

      @keyframes gradient {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(calc(50% + 28px));
        }
      }
    `,
  }),
);
