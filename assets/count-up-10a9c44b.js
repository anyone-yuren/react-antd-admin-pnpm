var e=Object.defineProperty,t=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,s,r)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r,a=(e,a)=>{for(var i in a||(a={}))s.call(a,i)&&l(e,i,a[i]);if(t)for(var i of t(a))r.call(a,i)&&l(e,i,a[i]);return e};import{G as i,r as n,j as x,R as d,C as o,a as m,I as c,H as p,B as h}from"./index-74a8a941.js";import{u as j,_ as f}from"./index-2242dfd6.js";import{P as y,C as b}from"./websiteSetting-f424d90f.js";import{I as u}from"./index-1be0332c.js";const g=()=>{const[e]=i.useForm(),[t,s]=n.useState({start:0,end:2020,duration:4,decimals:0,separator:",",prefix:"￥ ",suffix:" rmb"}),r=n.useRef(null),{start:l,reset:g}=j(a({ref:r},t));n.useEffect((()=>{g()}),[]);return x.jsx(y,{plugin:b,children:x.jsxs(d,{gutter:12,children:[x.jsx(o,{span:6,children:x.jsx(m,{title:"正向增加",bordered:!1,bodyStyle:{height:"300px"},children:x.jsx(f,{start:0,end:2020,duration:4,style:{height:"100%",fontSize:"40px",color:"#e65d6e"},className:"flex-center"})})}),x.jsx(o,{span:12,children:x.jsxs(m,{title:"自定义配置",bordered:!1,bodyStyle:{height:"300px"},children:[x.jsx("div",{className:"flex-center",style:{marginBottom:"30px"},children:x.jsx("span",{ref:r,style:{fontSize:"40px",color:"#e65d6e"}})}),x.jsxs(i,{form:e,initialValues:a({},t),layout:"inline",labelAlign:"left",labelCol:{style:{width:"80px",marginBottom:"12px"}},onValuesChange:e=>{s(a(a({},t),e))},children:[x.jsx(i.Item,{label:"startVal:",name:"start",children:x.jsx(u,{min:0,max:1e4,style:{width:"100px"}})}),x.jsx(i.Item,{label:"endVal:",name:"end",children:x.jsx(u,{min:0,max:1e4,style:{width:"100px"}})}),x.jsx(i.Item,{label:"duration:",name:"duration",children:x.jsx(u,{min:1,max:100,style:{width:"100px"}})}),x.jsx(i.Item,{label:"decimals:",name:"decimals",children:x.jsx(u,{min:0,max:100,style:{width:"100px"}})}),x.jsx(i.Item,{label:"separator:",name:"separator",children:x.jsx(c,{style:{width:"100px"}})}),x.jsx(i.Item,{label:"prefix:",name:"prefix",children:x.jsx(c,{style:{width:"100px"}})}),x.jsx(i.Item,{label:"suffix:",name:"suffix",children:x.jsx(c,{style:{width:"100px"}})}),x.jsx(i.Item,{children:x.jsxs(p,{children:[x.jsx(h,{type:"primary",onClick:l,children:"开始"}),x.jsx(h,{type:"primary",danger:!0,onClick:g,children:"重置"})]})})]})]})}),x.jsx(o,{span:6,children:x.jsx(m,{title:"反向减少",bordered:!1,bodyStyle:{height:"300px"},children:x.jsx(f,{start:2020,end:0,duration:4,style:{height:"100%",fontSize:"40px",color:"#30b08f"},className:"flex-center"})})})]})})};export{g as default};
