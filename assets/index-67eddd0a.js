import{r as i,N as dt,O as ee,b0 as ze,a$ as Ue,V as y,aj as ft,X as Z,bj as mt,bA as pt,aQ as le,e as F,a0 as We,bB as gt,aP as Ge,W as vt,bC as be,bD as bt,p as ht,q as St,bm as Nt,a5 as yt,t as he,bp as He,bE as Le,s as z,bF as It,bG as Et,bH as wt,w as $t,bx as xt,x as Ct,a7 as Rt,a9 as Dt,F as Ot,aa as _t,ab as At,y as Se,bI as ke,bJ as Ve,bK as Mt,D as Bt,E as kt}from"./index-17f935ee.js";var Vt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"}}]},name:"up",theme:"outlined"};const jt=Vt;var Ft=function(t,n){return i.createElement(dt,ee({},t,{ref:n,icon:jt}))};const Tt=i.forwardRef(Ft);function Ne(){return typeof BigInt=="function"}function qe(e){return!e&&e!==0&&!Number.isNaN(e)||!String(e).trim()}function W(e){var t=e.trim(),n=t.startsWith("-");n&&(t=t.slice(1)),t=t.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,""),t.startsWith(".")&&(t="0".concat(t));var r=t||"0",a=r.split("."),s=a[0]||"0",v=a[1]||"0";s==="0"&&v==="0"&&(n=!1);var c=n?"-":"";return{negative:n,negativeStr:c,trimStr:r,integerStr:s,decimalStr:v,fullStr:"".concat(c).concat(r)}}function ye(e){var t=String(e);return!Number.isNaN(Number(t))&&t.includes("e")}function U(e){var t=String(e);if(ye(e)){var n=Number(t.slice(t.indexOf("e-")+2)),r=t.match(/\.(\d+)/);return r!=null&&r[1]&&(n+=r[1].length),n}return t.includes(".")&&Ie(t)?t.length-t.indexOf(".")-1:0}function ce(e){var t=String(e);if(ye(e)){if(e>Number.MAX_SAFE_INTEGER)return String(Ne()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(Ne()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);t=e.toFixed(U(t))}return W(t).fullStr}function Ie(e){return typeof e=="number"?!Number.isNaN(e):e?/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e):!1}var Pt=function(){function e(t){if(Ue(this,e),y(this,"origin",""),y(this,"negative",void 0),y(this,"integer",void 0),y(this,"decimal",void 0),y(this,"decimalLen",void 0),y(this,"empty",void 0),y(this,"nan",void 0),qe(t)){this.empty=!0;return}if(this.origin=String(t),t==="-"||Number.isNaN(t)){this.nan=!0;return}var n=t;if(ye(n)&&(n=Number(n)),n=typeof n=="string"?n:ce(n),Ie(n)){var r=W(n);this.negative=r.negative;var a=r.trimStr.split(".");this.integer=BigInt(a[0]);var s=a[1]||"0";this.decimal=BigInt(s),this.decimalLen=s.length}else this.nan=!0}return ze(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(n){var r="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(n,"0"));return BigInt(r)}},{key:"negate",value:function(){var n=new e(this.toString());return n.negative=!n.negative,n}},{key:"cal",value:function(n,r,a){var s=Math.max(this.getDecimalStr().length,n.getDecimalStr().length),v=this.alignDecimal(s),c=n.alignDecimal(s),b=r(v,c).toString(),g=a(s),f=W(b),N=f.negativeStr,p=f.trimStr,h="".concat(N).concat(p.padStart(g+1,"0"));return new e("".concat(h.slice(0,-g),".").concat(h.slice(-g)))}},{key:"add",value:function(n){if(this.isInvalidate())return new e(n);var r=new e(n);return r.isInvalidate()?this:this.cal(r,function(a,s){return a+s},function(a){return a})}},{key:"multi",value:function(n){var r=new e(n);return this.isInvalidate()||r.isInvalidate()?new e(NaN):this.cal(r,function(a,s){return a*s},function(a){return a*2})}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(n){return this.toString()===(n==null?void 0:n.toString())}},{key:"lessEquals",value:function(n){return this.add(n.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return n?this.isInvalidate()?"":W("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}(),zt=function(){function e(t){if(Ue(this,e),y(this,"origin",""),y(this,"number",void 0),y(this,"empty",void 0),qe(t)){this.empty=!0;return}this.origin=String(t),this.number=Number(t)}return ze(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(n){if(this.isInvalidate())return new e(n);var r=Number(n);if(Number.isNaN(r))return this;var a=this.number+r;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var s=Math.max(U(this.number),U(r));return new e(a.toFixed(s))}},{key:"multi",value:function(n){var r=Number(n);if(this.isInvalidate()||Number.isNaN(r))return new e(NaN);var a=this.number*r;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var s=Math.max(U(this.number),U(r));return new e(a.toFixed(s))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(n){return this.toNumber()===(n==null?void 0:n.toNumber())}},{key:"lessEquals",value:function(n){return this.add(n.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return n?this.isInvalidate()?"":ce(this.number):this.origin}}]),e}();function D(e){return Ne()?new Pt(e):new zt(e)}function ue(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e==="")return"";var a=W(e),s=a.negativeStr,v=a.integerStr,c=a.decimalStr,b="".concat(t).concat(c),g="".concat(s).concat(v);if(n>=0){var f=Number(c[n]);if(f>=5&&!r){var N=D(e).add("".concat(s,"0.").concat("0".repeat(n)).concat(10-f));return ue(N.toString(),t,n,r)}return n===0?g:"".concat(g).concat(t).concat(c.padEnd(n,"0").slice(0,n))}return b===".0"?g:"".concat(g).concat(b)}function Ut(e,t){var n=i.useRef(null);function r(){try{var s=e.selectionStart,v=e.selectionEnd,c=e.value,b=c.substring(0,s),g=c.substring(v);n.current={start:s,end:v,value:c,beforeTxt:b,afterTxt:g}}catch(f){}}function a(){if(e&&n.current&&t)try{var s=e.value,v=n.current,c=v.beforeTxt,b=v.afterTxt,g=v.start,f=s.length;if(s.endsWith(b))f=s.length-n.current.afterTxt.length;else if(s.startsWith(c))f=c.length;else{var N=c[g-1],p=s.indexOf(N,g-1);p!==-1&&(f=p+1)}e.setSelectionRange(f,f)}catch(h){ft(!1,"Something warning of cursor restore. Please fire issue about this: ".concat(h.message))}}return[r,a]}var Wt=function(){var t=i.useState(!1),n=Z(t,2),r=n[0],a=n[1];return mt(function(){a(pt())},[]),r},Gt=200,Ht=600;function Lt(e){var t=e.prefixCls,n=e.upNode,r=e.downNode,a=e.upDisabled,s=e.downDisabled,v=e.onStep,c=i.useRef(),b=i.useRef([]),g=i.useRef();g.current=v;var f=function(){clearTimeout(c.current)},N=function($,C){$.preventDefault(),f(),g.current(C);function x(){g.current(C),c.current=setTimeout(x,Gt)}c.current=setTimeout(x,Ht)};i.useEffect(function(){return function(){f(),b.current.forEach(function(u){return le.cancel(u)})}},[]);var p=Wt();if(p)return null;var h="".concat(t,"-handler"),w=F(h,"".concat(h,"-up"),y({},"".concat(h,"-up-disabled"),a)),B=F(h,"".concat(h,"-down"),y({},"".concat(h,"-down-disabled"),s)),I=function(){return b.current.push(le(f))},O={unselectable:"on",role:"button",onMouseUp:I,onMouseLeave:I};return i.createElement("div",{className:"".concat(h,"-wrap")},i.createElement("span",ee({},O,{onMouseDown:function($){N($,!0)},"aria-label":"Increase Value","aria-disabled":a,className:w}),n||i.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-up-inner")})),i.createElement("span",ee({},O,{onMouseDown:function($){N($,!1)},"aria-label":"Decrease Value","aria-disabled":s,className:B}),r||i.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-down-inner")})))}function je(e){var t=typeof e=="number"?ce(e):W(e).fullStr,n=t.includes(".");return n?W(t.replace(/(\d)\.(\d)/g,"$1$2.")).fullStr:e+"0"}const qt=function(){var e=i.useRef(0),t=function(){le.cancel(e.current)};return i.useEffect(function(){return t},[]),function(n){t(),e.current=le(function(){n()})}};var Kt=["prefixCls","className","style","min","max","step","defaultValue","value","disabled","readOnly","upHandler","downHandler","keyboard","controls","classNames","stringMode","parser","formatter","precision","decimalSeparator","onChange","onInput","onPressEnter","onStep","changeOnBlur"],Xt=["disabled","style","prefixCls","value","prefix","suffix","addonBefore","addonAfter","classes","className","classNames"],Fe=function(t,n){return t||n.isEmpty()?n.toString():n.toNumber()},Te=function(t){var n=D(t);return n.isInvalidate()?null:n},Yt=i.forwardRef(function(e,t){var n,r=e.prefixCls,a=r===void 0?"rc-input-number":r,s=e.className,v=e.style,c=e.min,b=e.max,g=e.step,f=g===void 0?1:g,N=e.defaultValue,p=e.value,h=e.disabled,w=e.readOnly,B=e.upHandler,I=e.downHandler,O=e.keyboard,u=e.controls,$=u===void 0?!0:u,C=e.classNames,x=e.stringMode,V=e.parser,R=e.formatter,E=e.precision,_=e.decimalSeparator,L=e.onChange,T=e.onInput,q=e.onPressEnter,K=e.onStep,te=e.changeOnBlur,X=te===void 0?!0:te,j=We(e,Kt),ne="".concat(a,"-input"),P=i.useRef(null),de=i.useState(!1),re=Z(de,2),ae=re[0],ie=re[1],A=i.useRef(!1),k=i.useRef(!1),se=i.useRef(!1),Je=i.useState(function(){return D(p!=null?p:N)}),Ee=Z(Je,2),S=Ee[0],we=Ee[1];function Qe(l){p===void 0&&we(l)}var fe=i.useCallback(function(l,o){if(!o)return E>=0?E:Math.max(U(l),U(f))},[E,f]),me=i.useCallback(function(l){var o=String(l);if(V)return V(o);var m=o;return _&&(m=m.replace(_,".")),m.replace(/[^\w.-]+/g,"")},[V,_]),pe=i.useRef(""),$e=i.useCallback(function(l,o){if(R)return R(l,{userTyping:o,input:String(pe.current)});var m=typeof l=="number"?ce(l):l;if(!o){var d=fe(m,o);if(Ie(m)&&(_||d>=0)){var M=_||".";m=ue(m,M,d)}}return m},[R,fe,_]),Ze=i.useState(function(){var l=N!=null?N:p;return S.isInvalidate()&&["string","number"].includes(vt(l))?Number.isNaN(l)?"":l:$e(S.toString(),!1)}),xe=Z(Ze,2),Y=xe[0],Ce=xe[1];pe.current=Y;function J(l,o){Ce($e(l.isInvalidate()?l.toString(!1):l.toString(!o),o))}var G=i.useMemo(function(){return Te(b)},[b,E]),H=i.useMemo(function(){return Te(c)},[c,E]),Re=i.useMemo(function(){return!G||!S||S.isInvalidate()?!1:G.lessEquals(S)},[G,S]),De=i.useMemo(function(){return!H||!S||S.isInvalidate()?!1:S.lessEquals(H)},[H,S]),et=Ut(P.current,ae),Oe=Z(et,2),tt=Oe[0],nt=Oe[1],_e=function(o){return G&&!o.lessEquals(G)?G:H&&!H.lessEquals(o)?H:null},ge=function(o){return!_e(o)},oe=function(o,m){var d=o,M=ge(d)||d.isEmpty();if(!d.isEmpty()&&!m&&(d=_e(d)||d,M=!0),!w&&!h&&M){var Q=d.toString(),ve=fe(Q,m);return ve>=0&&(d=D(ue(Q,".",ve)),ge(d)||(d=D(ue(Q,".",ve,!0)))),d.equals(S)||(Qe(d),L==null||L(d.isEmpty()?null:Fe(x,d)),p===void 0&&J(d,m)),d}return S},rt=qt(),Ae=function l(o){if(tt(),pe.current=o,Ce(o),!k.current){var m=me(o),d=D(m);d.isNaN()||oe(d,!0)}T==null||T(o),rt(function(){var M=o;V||(M=o.replace(/。/g,".")),M!==o&&l(M)})},at=function(){k.current=!0},it=function(){k.current=!1,Ae(P.current.value)},st=function(o){Ae(o.target.value)},Me=function(o){var m;if(!(o&&Re||!o&&De)){A.current=!1;var d=D(se.current?je(f):f);o||(d=d.negate());var M=(S||D(0)).add(d.toString()),Q=oe(M,!1);K==null||K(Fe(x,Q),{offset:se.current?je(f):f,type:o?"up":"down"}),(m=P.current)===null||m===void 0||m.focus()}},Be=function(o){var m=D(me(Y)),d=m;m.isNaN()?d=oe(S,o):d=oe(m,o),p!==void 0?J(S,!1):d.isNaN()||J(d,!1)},ot=function(){A.current=!0},ut=function(o){var m=o.key,d=o.shiftKey;A.current=!0,se.current=d,m==="Enter"&&(k.current||(A.current=!1),Be(!1),q==null||q(o)),O!==!1&&!k.current&&["Up","ArrowUp","Down","ArrowDown"].includes(m)&&(Me(m==="Up"||m==="ArrowUp"),o.preventDefault())},lt=function(){A.current=!1,se.current=!1},ct=function(){X&&Be(!1),ie(!1),A.current=!1};return be(function(){S.isInvalidate()||J(S,!1)},[E,R]),be(function(){var l=D(p);we(l);var o=D(me(Y));(!l.equals(o)||!A.current||R)&&J(l,A.current)},[p]),be(function(){R&&nt()},[Y]),i.createElement("div",{className:F(a,C==null?void 0:C.input,s,(n={},y(n,"".concat(a,"-focused"),ae),y(n,"".concat(a,"-disabled"),h),y(n,"".concat(a,"-readonly"),w),y(n,"".concat(a,"-not-a-number"),S.isNaN()),y(n,"".concat(a,"-out-of-range"),!S.isInvalidate()&&!ge(S)),n)),style:v,onFocus:function(){ie(!0)},onBlur:ct,onKeyDown:ut,onKeyUp:lt,onCompositionStart:at,onCompositionEnd:it,onBeforeInput:ot},$&&i.createElement(Lt,{prefixCls:a,upNode:B,downNode:I,upDisabled:Re,downDisabled:De,onStep:Me}),i.createElement("div",{className:"".concat(ne,"-wrap")},i.createElement("input",ee({autoComplete:"off",role:"spinbutton","aria-valuemin":c,"aria-valuemax":b,"aria-valuenow":S.isInvalidate()?null:S.toString(),step:f},j,{ref:Ge(P,t),className:ne,value:Y,onChange:st,disabled:h,readOnly:w}))))}),Ke=i.forwardRef(function(e,t){var n=e.disabled,r=e.style,a=e.prefixCls,s=e.value,v=e.prefix,c=e.suffix,b=e.addonBefore,g=e.addonAfter,f=e.classes,N=e.className,p=e.classNames,h=We(e,Xt),w=i.useRef(null),B=function(O){w.current&&bt(w.current,O)};return i.createElement(gt,{inputElement:i.createElement(Yt,ee({prefixCls:a,disabled:n,classNames:p,ref:Ge(w,t)},h)),className:N,triggerFocus:B,prefixCls:a,value:s,disabled:n,style:r,prefix:v,suffix:c,addonAfter:g,addonBefore:b,classes:f,classNames:p,components:{affixWrapper:"div",groupWrapper:"div",wrapper:"div",groupAddon:"div"}})});Ke.displayName="InputNumber";const Pe=(e,t)=>{let{componentCls:n,borderRadiusSM:r,borderRadiusLG:a}=e;const s=t==="lg"?a:r;return{[`&-${t}`]:{[`${n}-handler-wrap`]:{borderStartEndRadius:s,borderEndEndRadius:s},[`${n}-handler-up`]:{borderStartEndRadius:s},[`${n}-handler-down`]:{borderEndEndRadius:s}}}},Jt=e=>{const{componentCls:t,lineWidth:n,lineType:r,colorBorder:a,borderRadius:s,fontSizeLG:v,controlHeightLG:c,controlHeightSM:b,colorError:g,paddingInlineSM:f,colorTextDescription:N,motionDurationMid:p,handleHoverColor:h,paddingInline:w,paddingBlock:B,handleBg:I,handleActiveBg:O,colorTextDisabled:u,borderRadiusSM:$,borderRadiusLG:C,controlWidth:x,handleOpacity:V,handleBorderColor:R,calc:E}=e;return[{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},he(e)),He(e)),Le(e,t)),{display:"inline-block",width:x,margin:0,padding:0,border:`${z(n)} ${r} ${a}`,borderRadius:s,"&-rtl":{direction:"rtl",[`${t}-input`]:{direction:"rtl"}},"&-lg":{padding:0,fontSize:v,borderRadius:C,[`input${t}-input`]:{height:E(c).sub(E(n).mul(2)).equal()}},"&-sm":{padding:0,borderRadius:$,[`input${t}-input`]:{height:E(b).sub(E(n).mul(2)).equal(),padding:`0 ${z(f)}`}},"&-out-of-range":{[`${t}-input-wrap`]:{input:{color:g}}},"&-group":Object.assign(Object.assign(Object.assign({},he(e)),It(e)),{"&-wrapper":{display:"inline-block",textAlign:"start",verticalAlign:"top",[`${t}-affix-wrapper`]:{width:"100%"},"&-lg":{[`${t}-group-addon`]:{borderRadius:C,fontSize:e.fontSizeLG}},"&-sm":{[`${t}-group-addon`]:{borderRadius:$}},[`${t}-wrapper-disabled > ${t}-group-addon`]:Object.assign({},Et(e)),[`&:not(${t}-compact-first-item):not(${t}-compact-last-item)${t}-compact-item`]:{[`${t}, ${t}-group-addon`]:{borderRadius:0}},[`&:not(${t}-compact-last-item)${t}-compact-first-item`]:{[`${t}, ${t}-group-addon`]:{borderStartEndRadius:0,borderEndEndRadius:0}},[`&:not(${t}-compact-first-item)${t}-compact-last-item`]:{[`${t}, ${t}-group-addon`]:{borderStartStartRadius:0,borderEndStartRadius:0}}}}),[`&-disabled ${t}-input`]:{cursor:"not-allowed"},[t]:{"&-input":Object.assign(Object.assign(Object.assign(Object.assign({},he(e)),{width:"100%",padding:`${z(B)} ${z(w)}`,textAlign:"start",backgroundColor:"transparent",border:0,borderRadius:s,outline:0,transition:`all ${p} linear`,appearance:"textfield",fontSize:"inherit"}),wt(e.colorTextPlaceholder)),{'&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':{margin:0,webkitAppearance:"none",appearance:"none"}})}})},{[t]:Object.assign(Object.assign(Object.assign({[`&:hover ${t}-handler-wrap, &-focused ${t}-handler-wrap`]:{opacity:1},[`${t}-handler-wrap`]:{position:"absolute",insetBlockStart:0,insetInlineEnd:0,width:e.handleWidth,height:"100%",background:I,borderStartStartRadius:0,borderStartEndRadius:s,borderEndEndRadius:s,borderEndStartRadius:0,opacity:V,display:"flex",flexDirection:"column",alignItems:"stretch",transition:`opacity ${p} linear ${p}`,[`${t}-handler`]:{display:"flex",alignItems:"center",justifyContent:"center",flex:"auto",height:"40%",[`
              ${t}-handler-up-inner,
              ${t}-handler-down-inner
            `]:{marginInlineEnd:0,fontSize:e.handleFontSize}}},[`${t}-handler`]:{height:"50%",overflow:"hidden",color:N,fontWeight:"bold",lineHeight:0,textAlign:"center",cursor:"pointer",borderInlineStart:`${z(n)} ${r} ${R}`,transition:`all ${p} linear`,"&:active":{background:O},"&:hover":{height:"60%",[`
              ${t}-handler-up-inner,
              ${t}-handler-down-inner
            `]:{color:h}},"&-up-inner, &-down-inner":Object.assign(Object.assign({},$t()),{color:N,transition:`all ${p} linear`,userSelect:"none"})},[`${t}-handler-up`]:{borderStartEndRadius:s},[`${t}-handler-down`]:{borderBlockStart:`${z(n)} ${r} ${R}`,borderEndEndRadius:s}},Pe(e,"lg")),Pe(e,"sm")),{"&-disabled, &-readonly":{[`${t}-handler-wrap`]:{display:"none"},[`${t}-input`]:{color:"inherit"}},[`
          ${t}-handler-up-disabled,
          ${t}-handler-down-disabled
        `]:{cursor:"not-allowed"},[`
          ${t}-handler-up-disabled:hover &-handler-up-inner,
          ${t}-handler-down-disabled:hover &-handler-down-inner
        `]:{color:u}})},{[`${t}-borderless`]:{borderColor:"transparent",boxShadow:"none",[`${t}-handler-down`]:{borderBlockStartWidth:0}}}]},Qt=e=>{const{componentCls:t,paddingBlock:n,paddingInline:r,inputAffixPadding:a,controlWidth:s,borderRadiusLG:v,borderRadiusSM:c}=e;return{[`${t}-affix-wrapper`]:Object.assign(Object.assign(Object.assign({},He(e)),Le(e,`${t}-affix-wrapper`)),{position:"relative",display:"inline-flex",width:s,padding:0,paddingInlineStart:r,"&-lg":{borderRadius:v},"&-sm":{borderRadius:c},[`&:not(${t}-affix-wrapper-disabled):hover`]:{zIndex:1},"&-focused, &:focus":{zIndex:1},[`&-disabled > ${t}-disabled`]:{background:"transparent"},[`> div${t}`]:{width:"100%",border:"none",outline:"none",[`&${t}-focused`]:{boxShadow:"none !important"}},[`input${t}-input`]:{padding:`${z(n)} 0`},"&::before":{display:"inline-block",width:0,visibility:"hidden",content:'"\\a0"'},[`${t}-handler-wrap`]:{zIndex:2},[t]:{"&-prefix, &-suffix":{display:"flex",flex:"none",alignItems:"center",pointerEvents:"none"},"&-prefix":{marginInlineEnd:a},"&-suffix":{position:"absolute",insetBlockStart:0,insetInlineEnd:0,zIndex:1,height:"100%",marginInlineEnd:r,marginInlineStart:a}}})}},Zt=e=>Object.assign(Object.assign({},xt(e)),{controlWidth:90,handleWidth:e.controlHeightSM-e.lineWidth*2,handleFontSize:e.fontSize/2,handleVisible:"auto",handleActiveBg:e.colorFillAlter,handleBg:e.colorBgContainer,handleHoverColor:e.colorPrimary,handleBorderColor:e.colorBorder,handleOpacity:0}),en=e=>Object.assign(Object.assign({},e),{handleOpacity:e.handleVisible===!0?1:0}),tn=ht("InputNumber",e=>{const t=St(e,Nt(e));return[Jt(t),Qt(t),yt(t)]},Zt,{format:en,unitless:{handleOpacity:!0}});var nn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n};const Xe=i.forwardRef((e,t)=>{const{getPrefixCls:n,direction:r}=i.useContext(Ct),a=i.useRef(null);i.useImperativeHandle(t,()=>a.current);const{className:s,rootClassName:v,size:c,disabled:b,prefixCls:g,addonBefore:f,addonAfter:N,prefix:p,bordered:h=!0,readOnly:w,status:B,controls:I}=e,O=nn(e,["className","rootClassName","size","disabled","prefixCls","addonBefore","addonAfter","prefix","bordered","readOnly","status","controls"]),u=n("input-number",g),$=Rt(u),[C,x]=tn(u,$),{compactSize:V,compactItemClassnames:R}=Dt(u,r);let E=i.createElement(Tt,{className:`${u}-handler-up-inner`}),_=i.createElement(Bt,{className:`${u}-handler-down-inner`});const L=typeof I=="boolean"?I:void 0;typeof I=="object"&&(E=typeof I.upIcon=="undefined"?E:i.createElement("span",{className:`${u}-handler-up-inner`},I.upIcon),_=typeof I.downIcon=="undefined"?_:i.createElement("span",{className:`${u}-handler-down-inner`},I.downIcon));const{hasFeedback:T,status:q,isFormItemInput:K,feedbackIcon:te}=i.useContext(Ot),X=kt(q,B),j=_t(A=>{var k;return(k=c!=null?c:V)!==null&&k!==void 0?k:A}),ne=i.useContext(At),P=b!=null?b:ne,de=F({[`${u}-lg`]:j==="large",[`${u}-sm`]:j==="small",[`${u}-rtl`]:r==="rtl",[`${u}-borderless`]:!h,[`${u}-in-form-item`]:K},Se(u,X),x),re=`${u}-group`,ae=T&&i.createElement(i.Fragment,null,te),ie=i.createElement(Ke,Object.assign({ref:a,disabled:P,className:F($,s,v,R),upHandler:E,downHandler:_,prefixCls:u,readOnly:w,controls:L,prefix:p,suffix:ae,addonAfter:N&&i.createElement(ke,null,i.createElement(Ve,{override:!0,status:!0},N)),addonBefore:f&&i.createElement(ke,null,i.createElement(Ve,{override:!0,status:!0},f)),classNames:{input:de},classes:{affixWrapper:F(Se(`${u}-affix-wrapper`,X,T),{[`${u}-affix-wrapper-sm`]:j==="small",[`${u}-affix-wrapper-lg`]:j==="large",[`${u}-affix-wrapper-rtl`]:r==="rtl",[`${u}-affix-wrapper-borderless`]:!h},x),wrapper:F({[`${re}-rtl`]:r==="rtl",[`${u}-wrapper-disabled`]:P},x),group:F({[`${u}-group-wrapper-sm`]:j==="small",[`${u}-group-wrapper-lg`]:j==="large",[`${u}-group-wrapper-rtl`]:r==="rtl"},Se(`${u}-group-wrapper`,X,T),x)}},O));return C(ie)}),Ye=Xe,rn=e=>i.createElement(Mt,{theme:{components:{InputNumber:{handleVisible:!0}}}},i.createElement(Xe,Object.assign({},e)));Ye._InternalPanelDoNotUseOrYouWillBeFired=rn;const sn=Ye;export{sn as I,Tt as U};