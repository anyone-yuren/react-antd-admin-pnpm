var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r;import{r as l,bh as s,j as c,a as d,aA as u,J as p,al as j,H as x,B as h,M as b}from"./index-74a8a941.js";import{P as m,c as g}from"./websiteSetting-f424d90f.js";import{T as f}from"./Table-26b8c827.js";import{P as v}from"./index-46dbd9d3.js";import{E as y}from"./ExclamationCircleOutlined-793040f3.js";import"./iconUtil-8c7e173b.js";import"./objectDestructuringEmpty-47c1eead.js";import"./index-f90209b0.js";import"./index-35ed83ff.js";const w=[{label:"单身",value:0},{label:"未婚",value:1},{label:"已婚",value:2},{label:"离异",value:3}],S=()=>{const[e,S]=l.useState(!1),[O,C]=l.useState([]),[I,P]=l.useState(0),[k,E]=l.useState({current:1,pageSize:10}),T=[{title:"编号",dataIndex:"id",align:"center",sorter:!0},{title:"姓名",dataIndex:"name",align:"center",render:(e,t)=>{const n=c.jsxs("div",{children:[c.jsxs("p",{children:["姓名: ",t.name]}),c.jsxs("p",{children:["手机: ",t.phone]}),c.jsxs("p",{children:["爱好: ",t.hobby.join("、")]})]});return c.jsx(v,{content:n,children:c.jsx(u,{color:"blue",children:t.name})})}},{title:"性别",dataIndex:"sex",align:"center"},{title:"手机",dataIndex:"phone",align:"center"},{title:"学历",dataIndex:"education",align:"center"},{title:"婚姻状况",dataIndex:"married",align:"center",render:(e,t)=>c.jsx(p,{options:w,defaultValue:t.married,onChange:e=>t.married=e})},{title:"禁止编辑",dataIndex:"forbid",align:"center",render:(e,t)=>c.jsx(j,{defaultChecked:t.forbid,onChange:e=>t.forbid=e})},{title:"爱好",dataIndex:"hobby",align:"center",render:(e,t)=>c.jsx("span",{children:t.hobby.join("、")})},{title:"操作",key:"action",align:"center",render:(e,t)=>c.jsxs(x,{children:[c.jsx(h,{disabled:t.forbid,children:"编辑"}),c.jsx(h,{danger:!0,onClick:D,children:"删除"})]})}],z={onChange:e=>{console.log(e)}};function D(){b.confirm({title:"此操作将删除选中数据, 是否继续?",icon:c.jsx(y,{rev:void 0}),okText:"确定",cancelText:"取消",onOk(){console.log("OK")},onCancel(){console.log("Cancel")}})}return l.useEffect((()=>{!function(){return e=this,t=null,n=function*(){S(!0);const e=yield s(k),{list:t,total:n}=e;C(t),P(n),S(!1)},new Promise(((r,a)=>{var i=e=>{try{l(n.next(e))}catch(t){a(t)}},o=e=>{try{l(n.throw(e))}catch(t){a(t)}},l=e=>e.done?r(e.value):Promise.resolve(e.value).then(i,o);l((n=n.apply(e,t)).next())}));var e,t,n}()}),[k]),c.jsx(m,{plugin:g,children:c.jsx(d,{bordered:!1,children:c.jsx(f,{rowKey:"id",rowSelection:z,columns:T,dataSource:O,loading:e,pagination:{current:k.current,pageSize:k.pageSize,total:I,showTotal:()=>`Total ${I} items`,showSizeChanger:!0,showQuickJumper:!0,onChange:function(e,l){var s;E((s=((e,t)=>{for(var n in t||(t={}))a.call(t,n)&&o(e,n,t[n]);if(r)for(var n of r(t))i.call(t,n)&&o(e,n,t[n]);return e})({},k),t(s,n({current:e,pageSize:l}))))}}})})})};export{S as default};
