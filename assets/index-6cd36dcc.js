var y=Object.defineProperty,I=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var b=(l,t,a)=>t in l?y(l,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[t]=a,m=(l,t)=>{for(var a in t||(t={}))k.call(t,a)&&b(l,a,t[a]);if(p)for(var a of p(t))E.call(t,a)&&b(l,a,t[a]);return l},f=(l,t)=>I(l,w(t));var j=(l,t,a)=>new Promise((g,c)=>{var h=r=>{try{d(a.next(r))}catch(u){c(u)}},i=r=>{try{d(a.throw(r))}catch(u){c(u)}},d=r=>r.done?g(r.value):Promise.resolve(r.value).then(h,i);d((a=a.apply(l,t)).next())});import{r as x,bd as O,j as n,a as P,aC as _,J as z,al as B,H as D,B as T,M as L}from"./index-7c18ba19.js";import{P as M,c as Q}from"./websiteSetting-85501543.js";import{T as J}from"./Table-60026345.js";import{P as K}from"./index-f283b53b.js";import{E as A}from"./ExclamationCircleOutlined-4c4b4cf3.js";import"./addEventListener-b3bedb14.js";import"./iconUtil-b5f1de3c.js";import"./objectDestructuringEmpty-24e23e90.js";import"./index-4e55acc1.js";import"./index-bfff8131.js";const H=[{label:"单身",value:0},{label:"未婚",value:1},{label:"已婚",value:2},{label:"离异",value:3}],Z=()=>{const[l,t]=x.useState(!1),[a,g]=x.useState([]),[c,h]=x.useState(0),[i,d]=x.useState({current:1,pageSize:10}),r=[{title:"编号",dataIndex:"id",align:"center",sorter:!0},{title:"姓名",dataIndex:"name",align:"center",render:(o,e)=>{const s=n.jsxs("div",{children:[n.jsxs("p",{children:["姓名: ",e.name]}),n.jsxs("p",{children:["手机: ",e.phone]}),n.jsxs("p",{children:["爱好: ",e.hobby.join("、")]})]});return n.jsx(K,{content:s,children:n.jsx(_,{color:"blue",children:e.name})})}},{title:"性别",dataIndex:"sex",align:"center"},{title:"手机",dataIndex:"phone",align:"center"},{title:"学历",dataIndex:"education",align:"center"},{title:"婚姻状况",dataIndex:"married",align:"center",render:(o,e)=>n.jsx(z,{options:H,defaultValue:e.married,onChange:s=>e.married=s})},{title:"禁止编辑",dataIndex:"forbid",align:"center",render:(o,e)=>n.jsx(B,{defaultChecked:e.forbid,onChange:s=>e.forbid=s})},{title:"爱好",dataIndex:"hobby",align:"center",render:(o,e)=>n.jsx("span",{children:e.hobby.join("、")})},{title:"操作",key:"action",align:"center",render:(o,e)=>n.jsxs(D,{children:[n.jsx(T,{disabled:e.forbid,children:"编辑"}),n.jsx(T,{danger:!0,onClick:v,children:"删除"})]})}],u={onChange:o=>{console.log(o)}};x.useEffect(()=>{C()},[i]);function C(){return j(this,null,function*(){t(!0);const o=yield O(i),{list:e,total:s}=o;g(e),h(s),t(!1)})}function S(o,e){d(f(m({},i),{current:o,pageSize:e}))}function v(){L.confirm({title:"此操作将删除选中数据, 是否继续?",icon:n.jsx(A,{rev:void 0}),okText:"确定",cancelText:"取消",onOk(){console.log("OK")},onCancel(){console.log("Cancel")}})}return n.jsx(M,{plugin:Q,children:n.jsx(P,{bordered:!1,children:n.jsx(J,{rowKey:"id",rowSelection:u,columns:r,dataSource:a,loading:l,pagination:{current:i.current,pageSize:i.pageSize,total:c,showTotal:()=>`Total ${c} items`,showSizeChanger:!0,showQuickJumper:!0,onChange:S}})})})};export{Z as default};