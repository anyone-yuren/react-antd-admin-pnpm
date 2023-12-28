import{p as W,r as l,x as E,u as D,f as K,e as S,B as L,be as F,bf as H,bg as N,i as R,o as X,bc as A,Y}from"./index-7c18ba19.js";import{g as T,a as q,P as M}from"./index-f283b53b.js";const U=e=>{const{componentCls:t,iconCls:r,antCls:n,zIndexPopup:o,colorText:u,colorWarning:m,marginXXS:i,marginXS:p,fontSize:c,fontWeightStrong:C,colorTextHeading:g}=e;return{[t]:{zIndex:o,[`&${n}-popover`]:{fontSize:c},[`${t}-message`]:{marginBottom:p,display:"flex",flexWrap:"nowrap",alignItems:"start",[`> ${t}-message-icon ${r}`]:{color:m,fontSize:c,lineHeight:1,marginInlineEnd:p},[`${t}-title`]:{fontWeight:C,color:g,"&:only-child":{fontWeight:"normal"}},[`${t}-description`]:{marginTop:i,color:u}},[`${t}-buttons`]:{textAlign:"end",whiteSpace:"nowrap",button:{marginInlineStart:p}}}}},G=e=>{const{zIndexPopupBase:t}=e;return{zIndexPopup:t+60}},$=W("Popconfirm",e=>U(e),G,{resetStyle:!1});var J=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const w=e=>{const{prefixCls:t,okButtonProps:r,cancelButtonProps:n,title:o,description:u,cancelText:m,okText:i,okType:p="primary",icon:c=l.createElement(N,null),showCancel:C=!0,close:g,onConfirm:v,onCancel:x,onPopupClick:P}=e,{getPrefixCls:y}=l.useContext(E),[f]=D("Popconfirm",K.Popconfirm),d=T(o),b=T(u);return l.createElement("div",{className:`${t}-inner-content`,onClick:P},l.createElement("div",{className:`${t}-message`},c&&l.createElement("span",{className:`${t}-message-icon`},c),l.createElement("div",{className:`${t}-message-text`},d&&l.createElement("div",{className:S(`${t}-title`)},d),b&&l.createElement("div",{className:`${t}-description`},b))),l.createElement("div",{className:`${t}-buttons`},C&&l.createElement(L,Object.assign({onClick:x,size:"small"},n),m!=null?m:f==null?void 0:f.cancelText),l.createElement(F,{buttonProps:Object.assign(Object.assign({size:"small"},H(p)),r),actionFn:v,close:g,prefixCls:y("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},i!=null?i:f==null?void 0:f.okText)))},Q=e=>{const{prefixCls:t,placement:r,className:n,style:o}=e,u=J(e,["prefixCls","placement","className","style"]),{getPrefixCls:m}=l.useContext(E),i=m("popconfirm",t),[p]=$(i);return p(l.createElement(q,{placement:r,className:S(i,n),style:o,content:l.createElement(w,Object.assign({prefixCls:i},u))}))},Z=Q;var ee=globalThis&&globalThis.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]]);return r};const j=l.forwardRef((e,t)=>{var r,n;const{prefixCls:o,placement:u="top",trigger:m="click",okType:i="primary",icon:p=l.createElement(N,null),children:c,overlayClassName:C,onOpenChange:g,onVisibleChange:v}=e,x=ee(e,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),{getPrefixCls:P}=l.useContext(E),[y,f]=R(!1,{value:(r=e.open)!==null&&r!==void 0?r:e.visible,defaultValue:(n=e.defaultOpen)!==null&&n!==void 0?n:e.defaultVisible}),d=(a,s)=>{f(a,!0),v==null||v(a),g==null||g(a,s)},b=a=>{d(!1,a)},_=a=>{var s;return(s=e.onConfirm)===null||s===void 0?void 0:s.call(globalThis,a)},k=a=>{var s;d(!1,a),(s=e.onCancel)===null||s===void 0||s.call(globalThis,a)},I=a=>{a.keyCode===Y.ESC&&y&&d(!1,a)},z=a=>{const{disabled:s=!1}=e;s||d(a)},O=P("popconfirm",o),B=S(O,C),[V]=$(O);return V(l.createElement(M,Object.assign({},X(x,["title"]),{trigger:m,placement:u,onOpenChange:z,open:y,ref:t,overlayClassName:B,content:l.createElement(w,Object.assign({okType:i,icon:p},e,{prefixCls:O,close:b,onConfirm:_,onCancel:k})),"data-popover-inject":!0}),A(c,{onKeyDown:a=>{var s,h;l.isValidElement(c)&&((h=c==null?void 0:(s=c.props).onKeyDown)===null||h===void 0||h.call(s,a)),I(a)}})))});j._InternalPanelDoNotUseOrYouWillBeFired=Z;const oe=j;export{oe as P};