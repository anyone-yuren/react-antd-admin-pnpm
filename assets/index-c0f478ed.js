import{r as e,p as o,q as r,t,s as n,c3 as i,x as l,aP as a,F as d,a7 as s,ab as c,e as u,c4 as b,c5 as p,c6 as g,i as h,aa as C,aI as m}from"./index-0c334d78.js";const f=e.createContext(null),v=f.Provider,S=e.createContext(null),$=S.Provider,k=e=>{const{componentCls:o,antCls:r}=e,n=`${o}-group`;return{[n]:Object.assign(Object.assign({},t(e)),{display:"inline-block",fontSize:0,[`&${n}-rtl`]:{direction:"rtl"},[`${r}-badge ${r}-badge-count`]:{zIndex:1},[`> ${r}-badge:not(:first-child) > ${r}-button-wrapper`]:{borderInlineStart:"none"}})}},y=e=>{const{componentCls:o,wrapperMarginInlineEnd:r,colorPrimary:l,radioSize:a,motionDurationSlow:d,motionDurationMid:s,motionEaseInOutCirc:c,colorBgContainer:u,colorBorder:b,lineWidth:p,colorBgContainerDisabled:g,colorTextDisabled:h,paddingXS:C,dotColorDisabled:m,lineType:f,radioColor:v,radioBgColor:S,calc:$}=e,k=`${o}-inner`,y=$(a).sub($(4).mul(2)),x=$(1).mul(a).equal();return{[`${o}-wrapper`]:Object.assign(Object.assign({},t(e)),{display:"inline-flex",alignItems:"baseline",marginInlineStart:0,marginInlineEnd:r,cursor:"pointer",[`&${o}-wrapper-rtl`]:{direction:"rtl"},"&-disabled":{cursor:"not-allowed",color:e.colorTextDisabled},"&::after":{display:"inline-block",width:0,overflow:"hidden",content:'"\\a0"'},[`${o}-checked::after`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:"100%",height:"100%",border:`${n(p)} ${f} ${l}`,borderRadius:"50%",visibility:"hidden",content:'""'},[o]:Object.assign(Object.assign({},t(e)),{position:"relative",display:"inline-block",outline:"none",cursor:"pointer",alignSelf:"center",borderRadius:"50%"}),[`${o}-wrapper:hover &,\n        &:hover ${k}`]:{borderColor:l},[`${o}-input:focus-visible + ${k}`]:Object.assign({},i(e)),[`${o}:hover::after, ${o}-wrapper:hover &::after`]:{visibility:"visible"},[`${o}-inner`]:{"&::after":{boxSizing:"border-box",position:"absolute",insetBlockStart:"50%",insetInlineStart:"50%",display:"block",width:x,height:x,marginBlockStart:$(1).mul(a).div(-2).equal(),marginInlineStart:$(1).mul(a).div(-2).equal(),backgroundColor:v,borderBlockStart:0,borderInlineStart:0,borderRadius:x,transform:"scale(0)",opacity:0,transition:`all ${d} ${c}`,content:'""'},boxSizing:"border-box",position:"relative",insetBlockStart:0,insetInlineStart:0,display:"block",width:x,height:x,backgroundColor:u,borderColor:b,borderStyle:"solid",borderWidth:p,borderRadius:"50%",transition:`all ${s}`},[`${o}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0},[`${o}-checked`]:{[k]:{borderColor:l,backgroundColor:S,"&::after":{transform:`scale(${e.calc(e.dotSize).div(a).equal()})`,opacity:1,transition:`all ${d} ${c}`}}},[`${o}-disabled`]:{cursor:"not-allowed",[k]:{backgroundColor:g,borderColor:b,cursor:"not-allowed","&::after":{backgroundColor:m}},[`${o}-input`]:{cursor:"not-allowed"},[`${o}-disabled + span`]:{color:h,cursor:"not-allowed"},[`&${o}-checked`]:{[k]:{"&::after":{transform:`scale(${$(y).div(a).equal({unit:!1})})`}}}},[`span${o} + *`]:{paddingInlineStart:C,paddingInlineEnd:C}})}},x=e=>{const{buttonColor:o,controlHeight:r,componentCls:t,lineWidth:l,lineType:a,colorBorder:d,motionDurationSlow:s,motionDurationMid:c,buttonPaddingInline:u,fontSize:b,buttonBg:p,fontSizeLG:g,controlHeightLG:h,controlHeightSM:C,paddingXS:m,borderRadius:f,borderRadiusSM:v,borderRadiusLG:S,buttonCheckedBg:$,buttonSolidCheckedColor:k,colorTextDisabled:y,colorBgContainerDisabled:x,buttonCheckedBgDisabled:w,buttonCheckedColorDisabled:B,colorPrimary:O,colorPrimaryHover:E,colorPrimaryActive:I,buttonSolidCheckedBg:R,buttonSolidCheckedHoverBg:j,buttonSolidCheckedActiveBg:P,calc:z}=e;return{[`${t}-button-wrapper`]:{position:"relative",display:"inline-block",height:r,margin:0,paddingInline:u,paddingBlock:0,color:o,fontSize:b,lineHeight:n(z(r).sub(z(l).mul(2)).equal()),background:p,border:`${n(l)} ${a} ${d}`,borderBlockStartWidth:z(l).add(.02).equal(),borderInlineStartWidth:0,borderInlineEndWidth:l,cursor:"pointer",transition:[`color ${c}`,`background ${c}`,`box-shadow ${c}`].join(","),a:{color:o},[`> ${t}-button`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,zIndex:-1,width:"100%",height:"100%"},"&:not(:first-child)":{"&::before":{position:"absolute",insetBlockStart:z(l).mul(-1).equal(),insetInlineStart:z(l).mul(-1).equal(),display:"block",boxSizing:"content-box",width:1,height:"100%",paddingBlock:l,paddingInline:0,backgroundColor:d,transition:`background-color ${s}`,content:'""'}},"&:first-child":{borderInlineStart:`${n(l)} ${a} ${d}`,borderStartStartRadius:f,borderEndStartRadius:f},"&:last-child":{borderStartEndRadius:f,borderEndEndRadius:f},"&:first-child:last-child":{borderRadius:f},[`${t}-group-large &`]:{height:h,fontSize:g,lineHeight:n(z(h).sub(z(l).mul(2)).equal()),"&:first-child":{borderStartStartRadius:S,borderEndStartRadius:S},"&:last-child":{borderStartEndRadius:S,borderEndEndRadius:S}},[`${t}-group-small &`]:{height:C,paddingInline:z(m).sub(l).equal(),paddingBlock:0,lineHeight:n(z(C).sub(z(l).mul(2)).equal()),"&:first-child":{borderStartStartRadius:v,borderEndStartRadius:v},"&:last-child":{borderStartEndRadius:v,borderEndEndRadius:v}},"&:hover":{position:"relative",color:O},"&:has(:focus-visible)":Object.assign({},i(e)),[`${t}-inner, input[type='checkbox'], input[type='radio']`]:{width:0,height:0,opacity:0,pointerEvents:"none"},[`&-checked:not(${t}-button-wrapper-disabled)`]:{zIndex:1,color:O,background:$,borderColor:O,"&::before":{backgroundColor:O},"&:first-child":{borderColor:O},"&:hover":{color:E,borderColor:E,"&::before":{backgroundColor:E}},"&:active":{color:I,borderColor:I,"&::before":{backgroundColor:I}}},[`${t}-group-solid &-checked:not(${t}-button-wrapper-disabled)`]:{color:k,background:R,borderColor:R,"&:hover":{color:k,background:j,borderColor:j},"&:active":{color:k,background:P,borderColor:P}},"&-disabled":{color:y,backgroundColor:x,borderColor:d,cursor:"not-allowed","&:first-child, &:hover":{color:y,backgroundColor:x,borderColor:d}},[`&-disabled${t}-button-wrapper-checked`]:{color:B,backgroundColor:w,borderColor:d,boxShadow:"none"}}}},w=o("Radio",(e=>{const{controlOutline:o,controlOutlineWidth:t}=e,i=`0 0 0 ${n(t)} ${o}`,l=r(e,{radioFocusShadow:i,radioButtonFocusShadow:i});return[k(l),y(l),x(l)]}),(e=>{const{wireframe:o,padding:r,marginXS:t,lineWidth:n,fontSizeLG:i,colorText:l,colorBgContainer:a,colorTextDisabled:d,controlItemBgActiveDisabled:s,colorTextLightSolid:c,colorPrimary:u,colorPrimaryHover:b,colorPrimaryActive:p,colorWhite:g}=e;return{radioSize:i,dotSize:o?i-8:i-2*(4+n),dotColorDisabled:d,buttonSolidCheckedColor:c,buttonSolidCheckedBg:u,buttonSolidCheckedHoverBg:b,buttonSolidCheckedActiveBg:p,buttonBg:a,buttonCheckedBg:a,buttonColor:l,buttonCheckedBgDisabled:s,buttonCheckedColorDisabled:d,buttonPaddingInline:r-n,wrapperMarginInlineEnd:t,radioColor:o?u:g,radioBgColor:o?a:u}}),{unitless:{radioSize:!0,dotSize:!0}});var B=globalThis&&globalThis.__rest||function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]])}return r};const O=(o,r)=>{var t,n;const i=e.useContext(f),h=e.useContext(S),{getPrefixCls:C,direction:m,radio:v}=e.useContext(l),$=e.useRef(null),k=a(r,$),{isFormItemInput:y}=e.useContext(d),x=e=>{var r,t;null===(r=o.onChange)||void 0===r||r.call(o,e),null===(t=null==i?void 0:i.onChange)||void 0===t||t.call(i,e)},{prefixCls:O,className:E,rootClassName:I,children:R,style:j}=o,P=B(o,["prefixCls","className","rootClassName","children","style"]),z=C("radio",O),D="button"===((null==i?void 0:i.optionType)||h),T=D?`${z}-button`:z,q=s(z),[M,N]=w(z,q),H=Object.assign({},P),L=e.useContext(c);i&&(H.name=i.name,H.onChange=x,H.checked=o.value===i.value,H.disabled=null!==(t=H.disabled)&&void 0!==t?t:i.disabled),H.disabled=null!==(n=H.disabled)&&void 0!==n?n:L;const W=u(`${T}-wrapper`,{[`${T}-wrapper-checked`]:H.checked,[`${T}-wrapper-disabled`]:H.disabled,[`${T}-wrapper-rtl`]:"rtl"===m,[`${T}-wrapper-in-form-item`]:y},null==v?void 0:v.className,E,I,N,q);return M(e.createElement(b,{component:"Radio",disabled:H.disabled},e.createElement("label",{className:W,style:Object.assign(Object.assign({},null==v?void 0:v.style),j),onMouseEnter:o.onMouseEnter,onMouseLeave:o.onMouseLeave},e.createElement(p,Object.assign({},H,{className:u(H.className,!D&&g),type:"radio",prefixCls:T,ref:k})),void 0!==R?e.createElement("span",null,R):null)))},E=e.forwardRef(O),I=e.forwardRef(((o,r)=>{const{getPrefixCls:t,direction:n}=e.useContext(l),[i,a]=h(o.defaultValue,{value:o.value}),{prefixCls:d,className:c,rootClassName:b,options:p,buttonStyle:g="outline",disabled:f,children:S,size:$,style:k,id:y,onMouseEnter:x,onMouseLeave:B,onFocus:O,onBlur:I}=o,R=t("radio",d),j=`${R}-group`,P=s(R),[z,D]=w(R,P);let T=S;p&&p.length>0&&(T=p.map((o=>"string"==typeof o||"number"==typeof o?e.createElement(E,{key:o.toString(),prefixCls:R,disabled:f,value:o,checked:i===o},o):e.createElement(E,{key:`radio-group-value-options-${o.value}`,prefixCls:R,disabled:o.disabled||f,value:o.value,checked:i===o.value,title:o.title,style:o.style,id:o.id,required:o.required},o.label))));const q=C($),M=u(j,`${j}-${g}`,{[`${j}-${q}`]:q,[`${j}-rtl`]:"rtl"===n},c,b,D,P);return z(e.createElement("div",Object.assign({},m(o,{aria:!0,data:!0}),{className:M,style:k,onMouseEnter:x,onMouseLeave:B,onFocus:O,onBlur:I,id:y,ref:r}),e.createElement(v,{value:{onChange:e=>{const r=i,t=e.target.value;"value"in o||a(t);const{onChange:n}=o;n&&t!==r&&n(e)},value:i,disabled:o.disabled,name:o.name,optionType:o.optionType}},T)))})),R=e.memo(I);var j=globalThis&&globalThis.__rest||function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]])}return r};const P=(o,r)=>{const{getPrefixCls:t}=e.useContext(l),{prefixCls:n}=o,i=j(o,["prefixCls"]),a=t("radio",n);return e.createElement($,{value:"button"},e.createElement(E,Object.assign({prefixCls:a},i,{type:"radio",ref:r})))},z=e.forwardRef(P),D=E;D.Button=z,D.Group=R,D.__ANT_RADIO=!0;const T=D;export{T as R};