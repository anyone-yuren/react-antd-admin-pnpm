var kt=Object.defineProperty,wt=Object.defineProperties;var Et=Object.getOwnPropertyDescriptors;var de=Object.getOwnPropertySymbols;var De=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var Me=(e,t,n)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ze=(e,t)=>{for(var n in t||(t={}))De.call(t,n)&&Me(e,n,t[n]);if(de)for(var n of de(t))Pe.call(t,n)&&Me(e,n,t[n]);return e},He=(e,t)=>wt(e,Et(t));var Be=(e,t)=>{var n={};for(var l in e)De.call(e,l)&&t.indexOf(l)<0&&(n[l]=e[l]);if(e!=null&&de)for(var l of de(e))t.indexOf(l)<0&&Pe.call(e,l)&&(n[l]=e[l]);return n};import{r as a,h as ce,u as Je,i as Ye,T as It,D as Tt,k as qe,l as Kt,m as Lt,I as Rt,S as jt,o as Ot,n as $,p as At,q as Nt,s as Mt,B as Fe,t as We,L as _e,v as Dt,w as Pt,x as L,y as zt,z as Xe,A as Ht,E as Bt,F as Ge,G as Ft,H as Wt,_ as ie,J as _t,K as Xt,j as D,R as Gt,C as we,a as Ee,N as Vt,O as Ut}from"./index-2a182a63.js";import{P as Jt,T as Yt}from"./websiteSetting-858f1873.js";const me=e=>{const t=new Map;return e.forEach((n,l)=>{t.set(n,l)}),t},qt=e=>{const t=new Map;return e.forEach((n,l)=>{let{disabled:o,key:d}=n;o&&t.set(d,l)}),t};function Qt(e,t,n){const l=a.useMemo(()=>(e||[]).map(i=>(t&&(i=Object.assign(Object.assign({},i),{key:t(i)})),i)),[e,t]),[o,d]=a.useMemo(()=>{const i=[],m=new Array((n||[]).length),f=me(n||[]);return l.forEach(p=>{f.has(p.key)?m[f.get(p.key)]=p:i.push(p)}),[i,m]},[l,n,t]);return[l,o,d]}const Zt=[];function le(e,t){const n=e.filter(l=>t.has(l));return e.length===n.length?e:n}function Ve(e){return Array.from(e).join(";")}function en(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Zt;const[l,o]=a.useMemo(()=>[new Set(e.map(p=>p.key)),new Set(t.map(p=>p.key))],[e,t]),[d,i]=a.useState(()=>le(n,l)),[m,f]=a.useState(()=>le(n,o));return a.useEffect(()=>{i(le(n,l)),f(le(n,o))},[n]),a.useEffect(()=>{i(le(d,l)),f(le(m,o))},[Ve(l),Ve(o)]),[d,m,i,f]}const tn=e=>{const{renderedText:t,renderedEl:n,item:l,checked:o,disabled:d,prefixCls:i,onClick:m,onRemove:f,showRemove:p}=e,k=ce(`${i}-content-item`,{[`${i}-content-item-disabled`]:d||l.disabled,[`${i}-content-item-checked`]:o});let E;(typeof t=="string"||typeof t=="number")&&(E=String(t));const[h]=Je("Transfer",Ye.Transfer),u={className:k,title:E},S=a.createElement("span",{className:`${i}-content-item-text`},n);return p?a.createElement("li",Object.assign({},u),S,a.createElement(It,{disabled:d||l.disabled,className:`${i}-content-item-remove`,"aria-label":h==null?void 0:h.remove,onClick:()=>{f==null||f(l)}},a.createElement(Tt,null))):(u.onClick=d||l.disabled?void 0:C=>m(l,C),a.createElement("li",Object.assign({},u),a.createElement(qe,{className:`${i}-checkbox`,checked:o,disabled:d||l.disabled}),S))},nn=a.memo(tn),ln=["handleFilter","handleClear","checkedKeys"],sn=e=>Object.assign(Object.assign({},{simple:!0,showSizeChanger:!1,showLessItems:!1}),e),on=(e,t)=>{const{prefixCls:n,filteredRenderItems:l,selectedKeys:o,disabled:d,showRemove:i,pagination:m,onScroll:f,onItemSelect:p,onItemRemove:k}=e,[E,h]=a.useState(1),u=a.useMemo(()=>m?sn(typeof m=="object"?m:{}):null,[m]),[S,C]=Kt(10,{value:u==null?void 0:u.pageSize});a.useEffect(()=>{if(u){const v=Math.ceil(l.length/S);h(Math.min(E,v))}},[l,u,S]);const w=(v,R)=>{p(v.key,!o.includes(v.key),R)},y=v=>{k==null||k([v.key])},j=v=>{h(v)},Y=(v,R)=>{h(v),C(R)},F=a.useMemo(()=>u?l.slice((E-1)*S,E*S):l,[E,l,u,S]);a.useImperativeHandle(t,()=>({items:F}));const P=u?a.createElement(Lt,{size:"small",disabled:d,simple:u.simple,pageSize:S,showLessItems:u.showLessItems,showSizeChanger:u.showSizeChanger,className:`${n}-pagination`,total:l.length,current:E,onChange:j,onShowSizeChange:Y}):null,W=ce(`${n}-content`,{[`${n}-content-show-remove`]:i});return a.createElement(a.Fragment,null,a.createElement("ul",{className:W,onScroll:f},(F||[]).map(v=>{let{renderedEl:R,renderedText:T,item:K}=v;return a.createElement(nn,{key:K.key,item:K,renderedText:T,renderedEl:R,prefixCls:n,showRemove:i,onClick:w,onRemove:y,checked:o.includes(K.key),disabled:d||K.disabled})})),P)},an=a.forwardRef(on),rn=e=>{const{placeholder:t="",value:n,prefixCls:l,disabled:o,onChange:d,handleClear:i}=e,m=a.useCallback(f=>{d==null||d(f),f.target.value===""&&(i==null||i())},[d]);return a.createElement(Rt,{placeholder:t,className:l,value:n,onChange:m,disabled:o,allowClear:!0,prefix:a.createElement(jt,null)})},Qe=rn,cn=()=>null;function dn(e){return!!(e&&!Mt(e)&&Object.prototype.toString.call(e)==="[object Object]")}function re(e){return e.filter(t=>!t.disabled).map(t=>t.key)}const un=e=>e!==void 0,mn=e=>{const{prefixCls:t,dataSource:n=[],titleText:l="",checkedKeys:o,disabled:d,showSearch:i=!1,style:m,searchPlaceholder:f,notFoundContent:p,selectAll:k,selectCurrent:E,selectInvert:h,removeAll:u,removeCurrent:S,showSelectAll:C=!0,showRemove:w,pagination:y,direction:j,itemsUnit:Y,itemUnit:F,selectAllLabel:P,selectionsIcon:W,footer:v,renderList:R,onItemSelectAll:T,onItemRemove:K,handleFilter:G,handleClear:O,filterOption:X,render:ge=cn}=e,[_,q]=a.useState(""),z=a.useRef({}),H=r=>{q(r.target.value),G(r)},fe=()=>{q(""),O()},pe=(r,g)=>X?X(_,g,j):r.includes(_),Se=r=>{let g=R?R(Object.assign(Object.assign({},r),{onItemSelect:(A,V)=>r.onItemSelect(A,V)})):null;const x=!!g;return x||(g=$.createElement(an,Object.assign({ref:z},r))),{customize:x,bodyContent:g}},se=r=>{const g=ge(r),x=dn(g);return{item:r,renderedEl:x?g.label:g,renderedText:x?g.value:g}},ee=a.useMemo(()=>Array.isArray(p)?p[j==="left"?0:1]:p,[p,j]),[I,B]=a.useMemo(()=>{const r=[],g=[];return n.forEach(x=>{const A=se(x);_&&!pe(A.renderedText,x)||(r.push(x),g.push(A))}),[r,g]},[n,_]),oe=a.useMemo(()=>{if(o.length===0)return"none";const r=me(o);return I.every(g=>r.has(g.key)||!!g.disabled)?"all":"part"},[o,I]),ye=a.useMemo(()=>{const r=i?$.createElement("div",{className:`${t}-body-search-wrapper`},$.createElement(Qe,{prefixCls:`${t}-search`,onChange:H,handleClear:fe,placeholder:f,value:_,disabled:d})):null,{customize:g,bodyContent:x}=Se(Object.assign(Object.assign({},Ot(e,ln)),{filteredItems:I,filteredRenderItems:B,selectedKeys:o}));let A;return g?A=$.createElement("div",{className:`${t}-body-customize-wrapper`},x):A=I.length?x:$.createElement("div",{className:`${t}-body-not-found`},ee),$.createElement("div",{className:ce(i?`${t}-body ${t}-body-with-search`:`${t}-body`)},r,A)},[i,t,f,_,d,o,I,B,ee]),be=$.createElement(qe,{disabled:n.length===0||d,checked:oe==="all",indeterminate:oe==="part",className:`${t}-checkbox`,onChange:()=>{T==null||T(I.filter(r=>!r.disabled).map(r=>{let{key:g}=r;return g}),oe!=="all")}}),ve=(r,g)=>{if(P)return typeof P=="function"?P({selectedCount:r,totalCount:g}):P;const x=g>1?Y:F;return $.createElement($.Fragment,null,(r>0?`${r}/`:"")+g," ",x)},ae=v&&(v.length<2?v(e):v(e,{direction:j})),Ce=ce(t,{[`${t}-with-pagination`]:!!y,[`${t}-with-footer`]:!!ae}),te=ae?$.createElement("div",{className:`${t}-footer`},ae):null,Q=!w&&!y&&be;let Z;w?Z=[y?{key:"removeCurrent",label:S,onClick(){var r;const g=re((((r=z.current)===null||r===void 0?void 0:r.items)||[]).map(x=>x.item));K==null||K(g)}}:null,{key:"removeAll",label:u,onClick(){K==null||K(re(I))}}].filter(Boolean):Z=[{key:"selectAll",label:k,onClick(){const r=re(I);T==null||T(r,r.length!==o.length)}},y?{key:"selectCurrent",label:E,onClick(){var r;const g=((r=z.current)===null||r===void 0?void 0:r.items)||[];T==null||T(re(g.map(x=>x.item)),!0)}}:null,{key:"selectInvert",label:h,onClick(){var r;const g=re(y?(((r=z.current)===null||r===void 0?void 0:r.items)||[]).map(V=>V.item):I),x=new Set(o),A=[];g.forEach(V=>{x.has(V)||A.push(V)}),T==null||T(A,"replace")}}];const xe=$.createElement(At,{className:`${t}-header-dropdown`,menu:{items:Z},disabled:d},un(W)?W:$.createElement(Nt,null));return $.createElement("div",{className:Ce,style:m},$.createElement("div",{className:`${t}-header`},C?$.createElement($.Fragment,null,Q,xe):null,$.createElement("span",{className:`${t}-header-selected`},ve(o.length,I.length)),$.createElement("span",{className:`${t}-header-title`},l)),ye,te)},Te=mn,hn=e=>{const{disabled:t,moveToLeft:n,moveToRight:l,leftArrowText:o="",rightArrowText:d="",leftActive:i,rightActive:m,className:f,style:p,direction:k,oneWay:E}=e;return a.createElement("div",{className:f,style:p},a.createElement(Fe,{type:"primary",size:"small",disabled:t||!m,onClick:l,icon:k!=="rtl"?a.createElement(We,null):a.createElement(_e,null)},d),!E&&a.createElement(Fe,{type:"primary",size:"small",disabled:t||!i,onClick:n,icon:k!=="rtl"?a.createElement(_e,null):a.createElement(We,null)},o))},Ze=hn,gn=e=>{const{antCls:t,componentCls:n,listHeight:l,controlHeightLG:o,marginXXS:d,margin:i}=e,m=`${t}-table`,f=`${t}-input`;return{[`${n}-customize-list`]:{[`${n}-list`]:{flex:"1 1 50%",width:"auto",height:"auto",minHeight:l},[`${m}-wrapper`]:{[`${m}-small`]:{border:0,borderRadius:0,[`${m}-selection-column`]:{width:o,minWidth:o}},[`${m}-pagination${m}-pagination`]:{margin:`${L(i)} 0 ${L(d)}`}},[`${f}[disabled]`]:{backgroundColor:"transparent"}}}},Ue=(e,t)=>{const{componentCls:n,colorBorder:l}=e;return{[`${n}-list`]:{borderColor:t,"&-search:not([disabled])":{borderColor:l}}}},fn=e=>{const{componentCls:t}=e;return{[`${t}-status-error`]:Object.assign({},Ue(e,e.colorError)),[`${t}-status-warning`]:Object.assign({},Ue(e,e.colorWarning))}},pn=e=>{const{componentCls:t,colorBorder:n,colorSplit:l,lineWidth:o,itemHeight:d,headerHeight:i,transferHeaderVerticalPadding:m,itemPaddingBlock:f,controlItemBgActive:p,colorTextDisabled:k,listHeight:E,listWidth:h,listWidthLG:u,fontSizeIcon:S,marginXS:C,paddingSM:w,lineType:y,antCls:j,iconCls:Y,motionDurationSlow:F,controlItemBgHover:P,borderRadiusLG:W,colorBgContainer:v,colorText:R,controlItemBgActiveHover:T}=e;return{display:"flex",flexDirection:"column",width:h,height:E,border:`${L(o)} ${y} ${n}`,borderRadius:e.borderRadiusLG,"&-with-pagination":{width:u,height:"auto"},"&-search":{[`${Y}-search`]:{color:k}},"&-header":{display:"flex",flex:"none",alignItems:"center",height:i,padding:`${L(e.calc(m).sub(o).equal())} ${L(w)} ${L(m)}`,color:R,background:v,borderBottom:`${L(o)} ${y} ${l}`,borderRadius:`${L(W)} ${L(W)} 0 0`,"> *:not(:last-child)":{marginInlineEnd:4},"> *":{flex:"none"},"&-title":Object.assign(Object.assign({},Xe),{flex:"auto",textAlign:"end"}),"&-dropdown":Object.assign(Object.assign({},Ht()),{fontSize:S,transform:"translateY(10%)",cursor:"pointer","&[disabled]":{cursor:"not-allowed"}})},"&-body":{display:"flex",flex:"auto",flexDirection:"column",fontSize:e.fontSize,minHeight:0,"&-search-wrapper":{position:"relative",flex:"none",padding:w}},"&-content":{flex:"auto",margin:0,padding:0,overflow:"auto",listStyle:"none","&-item":{display:"flex",alignItems:"center",minHeight:d,padding:`${L(f)} ${L(w)}`,transition:`all ${F}`,"> *:not(:last-child)":{marginInlineEnd:C},"> *":{flex:"none"},"&-text":Object.assign(Object.assign({},Xe),{flex:"auto"}),"&-remove":{position:"relative",color:n,cursor:"pointer",transition:`all ${F}`,"&:hover":{color:e.colorLinkHover},"&::after":{position:"absolute",inset:`-${L(f)} -50%`,content:'""'}},[`&:not(${t}-list-content-item-disabled)`]:{"&:hover":{backgroundColor:P,cursor:"pointer"},[`&${t}-list-content-item-checked:hover`]:{backgroundColor:T}},"&-checked":{backgroundColor:p},"&-disabled":{color:k,cursor:"not-allowed"}},[`&-show-remove ${t}-list-content-item:not(${t}-list-content-item-disabled):hover`]:{background:"transparent",cursor:"default"}},"&-pagination":{padding:`${L(e.paddingXS)} 0`,textAlign:"end",borderTop:`${L(o)} ${y} ${l}`,[`${j}-pagination-options`]:{paddingInlineEnd:e.paddingXS}},"&-body-not-found":{flex:"none",width:"100%",margin:"auto 0",color:k,textAlign:"center"},"&-footer":{borderTop:`${L(o)} ${y} ${l}`},"&-checkbox":{lineHeight:1}}},Sn=e=>{const{antCls:t,iconCls:n,componentCls:l,marginXS:o,marginXXS:d,fontSizeIcon:i,colorBgContainerDisabled:m}=e;return{[l]:Object.assign(Object.assign({},zt(e)),{position:"relative",display:"flex",alignItems:"stretch",[`${l}-disabled`]:{[`${l}-list`]:{background:m}},[`${l}-list`]:pn(e),[`${l}-operation`]:{display:"flex",flex:"none",flexDirection:"column",alignSelf:"center",margin:`0 ${L(o)}`,verticalAlign:"middle",[`${t}-btn`]:{display:"block","&:first-child":{marginBottom:d},[n]:{fontSize:i}}}})}},yn=e=>{const{componentCls:t}=e;return{[`${t}-rtl`]:{direction:"rtl"}}},bn=e=>{const{fontSize:t,lineHeight:n,controlHeight:l,controlHeightLG:o,lineWidth:d}=e,i=Math.round(t*n);return{listWidth:180,listHeight:200,listWidthLG:250,headerHeight:o,itemHeight:l,itemPaddingBlock:(l-i)/2,transferHeaderVerticalPadding:Math.ceil((o-d-i)/2)}},vn=Dt("Transfer",e=>{const t=Pt(e);return[Sn(t),gn(t),fn(t),yn(t)]},bn),he=e=>{const{dataSource:t,targetKeys:n=[],selectedKeys:l,selectAllLabels:o=[],operations:d=[],style:i={},listStyle:m={},locale:f={},titles:p,disabled:k,showSearch:E=!1,operationStyle:h,showSelectAll:u,oneWay:S,pagination:C,status:w,prefixCls:y,className:j,rootClassName:Y,selectionsIcon:F,filterOption:P,render:W,footer:v,children:R,rowKey:T,onScroll:K,onChange:G,onSearch:O,onSelectChange:X}=e,{getPrefixCls:ge,renderEmpty:_,direction:q,transfer:z}=a.useContext(Bt),H=ge("transfer",y),[fe,pe]=vn(H),[Se,se,ee]=Qt(t,T,n),[I,B,oe,ye]=en(se,ee,l),[be,ve]=Ge(s=>s.key),[ae,Ce]=Ge(s=>s.key),te=a.useCallback((s,c)=>{if(s==="left"){const b=typeof c=="function"?c(I||[]):c;oe(b)}else{const b=typeof c=="function"?c(B||[]):c;ye(b)}},[I,B]),Q=(s,c)=>{(s==="left"?ve:Ce)(c)},Z=a.useCallback((s,c)=>{s==="left"?X==null||X(c,B):X==null||X(I,c)},[I,B]),xe=s=>{var c;return(c=p!=null?p:s.titles)!==null&&c!==void 0?c:[]},r=s=>{K==null||K("left",s)},g=s=>{K==null||K("right",s)},x=s=>{const c=s==="right"?I:B,b=qt(Se),N=c.filter(ne=>!b.has(ne)),M=me(N),U=s==="right"?N.concat(n):n.filter(ne=>!M.has(ne)),J=s==="right"?"left":"right";te(J,[]),Z(J,[]),G==null||G(U,s,N)},A=()=>{x("left"),Q("left",null)},V=()=>{x("right"),Q("right",null)},Le=(s,c,b)=>{te(s,N=>{let M=[];if(b==="replace")M=c;else if(b)M=Array.from(new Set([].concat(ie(N),ie(c))));else{const U=me(c);M=N.filter(J=>!U.has(J))}return Z(s,M),M}),Q(s,null)},nt=(s,c)=>{Le("left",s,c)},lt=(s,c)=>{Le("right",s,c)},st=s=>O==null?void 0:O("left",s.target.value),ot=s=>O==null?void 0:O("right",s.target.value),at=()=>O==null?void 0:O("left",""),it=()=>O==null?void 0:O("right",""),rt=(s,c,b,N,M)=>{c.has(b)&&(c.delete(b),Q(s,null)),N&&(c.add(b),Q(s,M))},ct=(s,c,b,N)=>{(s==="left"?be:ae)(N,c,b)},Re=(s,c,b,N)=>{const M=s==="left",U=ie(M?I:B),J=new Set(U),ne=ie(M?se:ee).filter(ke=>!ke.disabled),Ae=ne.findIndex(ke=>ke.key===c);N&&U.length>0?ct(s,ne,J,Ae):rt(s,J,c,b,Ae);const Ne=Array.from(J);Z(s,Ne),e.selectedKeys||te(s,Ne)},dt=(s,c,b)=>{Re("left",s,c,b==null?void 0:b.shiftKey)},ut=(s,c,b)=>{Re("right",s,c,b==null?void 0:b.shiftKey)},mt=s=>{te("right",[]),G==null||G(n.filter(c=>!s.includes(c)),"left",ie(s))},je=s=>typeof m=="function"?m({direction:s}):m||{},ht=a.useContext(Ft),{hasFeedback:gt,status:ft}=ht,pt=s=>Object.assign(Object.assign(Object.assign({},s),{notFoundContent:(_==null?void 0:_("Transfer"))||$.createElement(_t,{componentName:"Transfer"})}),f),St=Xt(ft,w),Oe=!R&&C,yt=B.length>0,bt=I.length>0,vt=ce(H,{[`${H}-disabled`]:k,[`${H}-customize-list`]:!!R,[`${H}-rtl`]:q==="rtl"},Wt(H,St,gt),z==null?void 0:z.className,j,Y,pe),[Ct]=Je("Transfer",Ye.Transfer),$e=pt(Ct),[xt,$t]=xe($e);return fe($.createElement("div",{className:vt,style:Object.assign(Object.assign({},z==null?void 0:z.style),i)},$.createElement(Te,Object.assign({prefixCls:`${H}-list`,titleText:xt,dataSource:se,filterOption:P,style:je("left"),checkedKeys:I,handleFilter:st,handleClear:at,onItemSelect:dt,onItemSelectAll:nt,render:W,showSearch:E,renderList:R,footer:v,onScroll:r,disabled:k,direction:q==="rtl"?"right":"left",showSelectAll:u,selectAllLabel:o[0],pagination:Oe,selectionsIcon:F},$e)),$.createElement(Ze,{className:`${H}-operation`,rightActive:bt,rightArrowText:d[0],moveToRight:V,leftActive:yt,leftArrowText:d[1],moveToLeft:A,style:h,disabled:k,direction:q,oneWay:S}),$.createElement(Te,Object.assign({prefixCls:`${H}-list`,titleText:$t,dataSource:ee,filterOption:P,style:je("right"),checkedKeys:B,handleFilter:ot,handleClear:it,onItemSelect:ut,onItemSelectAll:lt,onItemRemove:mt,render:W,showSearch:E,renderList:R,footer:v,onScroll:g,disabled:k,direction:q==="rtl"?"left":"right",showSelectAll:u,selectAllLabel:o[1],showRemove:S,pagination:Oe,selectionsIcon:F},$e))))};he.List=Te;he.Search=Qe;he.Operation=Ze;const Ie=he,Ke=[];for(let e=1;e<10;e++)Ke.push({key:e.toString(),title:`备选项 ${e}`});const et=[{key:"1",title:"备选项 1"},{key:"2",title:"备选项 2",children:[{key:"2-1",title:"备选项 2-1"},{key:"2-2",title:"备选项 2-2"},{key:"2-3",title:"备选项 2-3"}]},{key:"3",title:"备选项 3-1"},{key:"4",title:"备选项 4",children:[{key:"4-1",title:"备选项 4-1"},{key:"4-2",title:"备选项 4-2",children:[{key:"4-2-1",title:"备选项 4-2-1"}]},{key:"4-3",title:"备选项 4-3"}]}],ue=[];function tt(e=[]){e.forEach(t=>{ue==null||ue.push(t),tt(t.children)})}tt(JSON.parse(JSON.stringify(et)));const kn=()=>{const[e,t]=a.useState(["1","5"]),[n,l]=a.useState(["2","6"]),[o,d]=a.useState([]),i=h=>{t(h)},m=(h,u)=>{l([...h,...u])},f=(h,u)=>h.includes(u),p=(h=[],u=[])=>h.map(w=>{var y=w,{children:S}=y,C=Be(y,["children"]);return He(ze({},C),{disabled:u.includes(C.key),children:p(S,u)})}),k=h=>{d(h)},E=({selectedKeys:h,onItemSelectAll:u,onItemSelect:S})=>({onSelectAll(C,w){const y=w.filter(j=>!j.disabled).map(({key:j})=>j);u(y,C)},onSelect({key:C},w){S(C,w)},selectedRowKeys:h});return D.jsx(Jt,{plugin:Yt,children:D.jsxs(Gt,{gutter:12,children:[D.jsx(we,{span:8,children:D.jsx(Ee,{title:"基础用法",bordered:!1,bodyStyle:{height:"420px"},children:D.jsx(Ie,{targetKeys:e,selectedKeys:n,dataSource:Ke,render:h=>h.title,listStyle:{width:"230px",height:"360px"},locale:{itemsUnit:"项 "},onChange:i,onSelectChange:m})})}),D.jsx(we,{span:8,children:D.jsx(Ee,{title:"树穿梭框",bordered:!1,bodyStyle:{height:"420px"},children:D.jsx(Ie,{targetKeys:o,dataSource:ue,render:h=>h.title,showSelectAll:!1,listStyle:{width:"230px",height:"360px"},onChange:k,children:({direction:h,selectedKeys:u,onItemSelect:S})=>{if(h==="left"){const C=[...u,...o];return D.jsx(Vt,{blockNode:!0,checkable:!0,checkStrictly:!0,defaultExpandAll:!0,checkedKeys:C,treeData:p(et,o),onCheck:(w,{node:{key:y}})=>{S(y,!f(C,y))},onSelect:(w,{node:{key:y}})=>{S(y,!f(C,y))}})}}})})}),D.jsx(we,{span:8,children:D.jsx(Ee,{title:"表格穿梭框",bordered:!1,bodyStyle:{height:"420px"},children:D.jsx(Ie,{targetKeys:e,dataSource:Ke,listStyle:{width:"230px",height:"360px"},locale:{itemsUnit:"项 "},onChange:i,children:({filteredItems:h,selectedKeys:u,onItemSelectAll:S,onItemSelect:C})=>D.jsx(Ut,{rowSelection:E({selectedKeys:u,onItemSelectAll:S,onItemSelect:C}),columns:[{dataIndex:"title",title:"Name"}],dataSource:h,size:"small",pagination:!1,onRow:({key:w})=>({onClick:()=>{C(w,!u.includes(w))}})})})})})]})})};export{kn as default};