import{r as h,ay as p,az as b,aX as y,aA as W,ax as q,aY as D,aZ as J,au as G,av as V,a_ as K,a$ as Q,b0 as X,aw as k,b1 as T,aB as I,j as w,B as ee,P as ne,R as re,C as te,b2 as ie}from"./index-b6f7ec55.js";import{U as ue}from"./index-e3164b5f.js";import{F as U}from"./Translatex-b2661fb8.js";var ae=function(e){return function(r,n){var t=h.useRef(!1);e(function(){return function(){t.current=!1}},[]),e(function(){if(!t.current)t.current=!0;else return r()},n)}};const M=ae(h.useEffect);var Y=function(e,r){var n=r.manual,t=r.ready,u=t===void 0?!0:t,a=r.defaultParams,o=a===void 0?[]:a,c=r.refreshDeps,s=c===void 0?[]:c,i=r.refreshDepsAction,v=h.useRef(!1);return v.current=!1,M(function(){!n&&u&&(v.current=!0,e.run.apply(e,p([],b(o),!1)))},[u]),M(function(){v.current||n||(v.current=!0,i?i():e.refresh())},p([],b(s),!1)),{onBefore:function(){if(!u)return{stopNow:!0}}}};Y.onInit=function(e){var r=e.ready,n=r===void 0?!0:r,t=e.manual;return{loading:!t&&n}};const oe=Y;function se(e,r){if(e===r)return!0;for(var n=0;n<e.length;n++)if(!Object.is(e[n],r[n]))return!1;return!0}function Z(e,r){var n=h.useRef({deps:r,obj:void 0,initialized:!1}).current;return(n.initialized===!1||!se(n.deps,r))&&(n.deps=r,n.obj=e(),n.initialized=!0),n.obj}var O=new Map,ce=function(e,r,n){var t=O.get(e);t!=null&&t.timer&&clearTimeout(t.timer);var u=void 0;r>-1&&(u=setTimeout(function(){O.delete(e)},r)),O.set(e,y(y({},n),{timer:u}))},fe=function(e){return O.get(e)},F=new Map,le=function(e){return F.get(e)},de=function(e,r){F.set(e,r),r.then(function(n){return F.delete(e),n}).catch(function(){F.delete(e)})},C={},ve=function(e,r){C[e]&&C[e].forEach(function(n){return n(r)})},L=function(e,r){return C[e]||(C[e]=[]),C[e].push(r),function(){var t=C[e].indexOf(r);C[e].splice(t,1)}},he=function(e,r){var n=r.cacheKey,t=r.cacheTime,u=t===void 0?5*60*1e3:t,a=r.staleTime,o=a===void 0?0:a,c=r.setCache,s=r.getCache,i=h.useRef(),v=h.useRef(),d=function(f,l){c?c(l):ce(f,u,l),ve(f,l.data)},m=function(f,l){return l===void 0&&(l=[]),s?s(l):fe(f)};return Z(function(){if(n){var f=m(n);f&&Object.hasOwnProperty.call(f,"data")&&(e.state.data=f.data,e.state.params=f.params,(o===-1||new Date().getTime()-f.time<=o)&&(e.state.loading=!1)),i.current=L(n,function(l){e.setState({data:l})})}},[]),W(function(){var f;(f=i.current)===null||f===void 0||f.call(i)}),n?{onBefore:function(f){var l=m(n,f);return!l||!Object.hasOwnProperty.call(l,"data")?{}:o===-1||new Date().getTime()-l.time<=o?{loading:!1,data:l==null?void 0:l.data,error:void 0,returnNow:!0}:{data:l==null?void 0:l.data,error:void 0}},onRequest:function(f,l){var g=le(n);return g&&g!==v.current?{servicePromise:g}:(g=f.apply(void 0,p([],b(l),!1)),v.current=g,de(n,g),{servicePromise:g})},onSuccess:function(f,l){var g;n&&((g=i.current)===null||g===void 0||g.call(i),d(n,{data:f,params:l,time:new Date().getTime()}),i.current=L(n,function(j){e.setState({data:j})}))},onMutate:function(f){var l;n&&((l=i.current)===null||l===void 0||l.call(i),d(n,{data:f,params:e.state.params,time:new Date().getTime()}),i.current=L(n,function(g){e.setState({data:g})}))}}:{}};const me=he;var ge=function(e,r){var n=r.debounceWait,t=r.debounceLeading,u=r.debounceTrailing,a=r.debounceMaxWait,o=h.useRef(),c=h.useMemo(function(){var s={};return t!==void 0&&(s.leading=t),u!==void 0&&(s.trailing=u),a!==void 0&&(s.maxWait=a),s},[t,u,a]);return h.useEffect(function(){if(n){var s=e.runAsync.bind(e);return o.current=q(function(i){i()},n,c),e.runAsync=function(){for(var i=[],v=0;v<arguments.length;v++)i[v]=arguments[v];return new Promise(function(d,m){var f;(f=o.current)===null||f===void 0||f.call(o,function(){s.apply(void 0,p([],b(i),!1)).then(d).catch(m)})})},function(){var i;(i=o.current)===null||i===void 0||i.cancel(),e.runAsync=s}}},[n,c]),n?{onCancel:function(){var s;(s=o.current)===null||s===void 0||s.cancel()}}:{}};const pe=ge;var be=function(e,r){var n=r.loadingDelay,t=r.ready,u=h.useRef();if(!n)return{};var a=function(){u.current&&clearTimeout(u.current)};return{onBefore:function(){return a(),t!==!1&&(u.current=setTimeout(function(){e.setState({loading:!0})},n)),{loading:!1}},onFinally:function(){a()},onCancel:function(){a()}}};const ye=be;function H(){return D?document.visibilityState!=="hidden":!0}var S=[];function Pe(e){return S.push(e),function(){var n=S.indexOf(e);S.splice(n,1)}}if(D){var Re=function(){if(H())for(var e=0;e<S.length;e++){var r=S[e];r()}};window.addEventListener("visibilitychange",Re,!1)}var we=function(e,r){var n=r.pollingInterval,t=r.pollingWhenHidden,u=t===void 0?!0:t,a=r.pollingErrorRetryCount,o=a===void 0?-1:a,c=h.useRef(),s=h.useRef(),i=h.useRef(0),v=function(){var d;c.current&&clearTimeout(c.current),(d=s.current)===null||d===void 0||d.call(s)};return M(function(){n||v()},[n]),n?{onBefore:function(){v()},onError:function(){i.current+=1},onSuccess:function(){i.current=0},onFinally:function(){o===-1||o!==-1&&i.current<=o?c.current=setTimeout(function(){!u&&!H()?s.current=Pe(function(){e.refresh()}):e.refresh()},n):i.current=0},onCancel:function(){v()}}:{}};const Ce=we;function Te(e,r){var n=!1;return function(){for(var t=[],u=0;u<arguments.length;u++)t[u]=arguments[u];n||(n=!0,e.apply(void 0,p([],b(t),!1)),setTimeout(function(){n=!1},r))}}function xe(){return D&&typeof navigator.onLine!="undefined"?navigator.onLine:!0}var A=[];function Se(e){return A.push(e),function(){var n=A.indexOf(e);n>-1&&A.splice(n,1)}}if(D){var z=function(){if(!(!H()||!xe()))for(var e=0;e<A.length;e++){var r=A[e];r()}};window.addEventListener("visibilitychange",z,!1),window.addEventListener("focus",z,!1)}var Ae=function(e,r){var n=r.refreshOnWindowFocus,t=r.focusTimespan,u=t===void 0?5e3:t,a=h.useRef(),o=function(){var c;(c=a.current)===null||c===void 0||c.call(a)};return h.useEffect(function(){if(n){var c=Te(e.refresh.bind(e),u);a.current=Se(function(){c()})}return function(){o()}},[n,u]),W(function(){o()}),{}};const je=Ae;var Ee=function(e,r){var n=r.retryInterval,t=r.retryCount,u=h.useRef(),a=h.useRef(0),o=h.useRef(!1);return t?{onBefore:function(){o.current||(a.current=0),o.current=!1,u.current&&clearTimeout(u.current)},onSuccess:function(){a.current=0},onError:function(){if(a.current+=1,t===-1||a.current<=t){var c=n!=null?n:Math.min(1e3*Math.pow(2,a.current),3e4);u.current=setTimeout(function(){o.current=!0,e.refresh()},c)}else a.current=0},onCancel:function(){a.current=0,u.current&&clearTimeout(u.current)}}:{}};const Oe=Ee;var Fe=function(e,r){var n=r.throttleWait,t=r.throttleLeading,u=r.throttleTrailing,a=h.useRef(),o={};return t!==void 0&&(o.leading=t),u!==void 0&&(o.trailing=u),h.useEffect(function(){if(n){var c=e.runAsync.bind(e);return a.current=J(function(s){s()},n,o),e.runAsync=function(){for(var s=[],i=0;i<arguments.length;i++)s[i]=arguments[i];return new Promise(function(v,d){var m;(m=a.current)===null||m===void 0||m.call(a,function(){c.apply(void 0,p([],b(s),!1)).then(v).catch(d)})})},function(){var s;e.runAsync=c,(s=a.current)===null||s===void 0||s.cancel()}}},[n,t,u]),n?{onCancel:function(){var c;(c=a.current)===null||c===void 0||c.cancel()}}:{}};const De=Fe;var $e=function(e){G&&(V(e)||console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e,'".'))),h.useEffect(function(){e==null||e()},[])};const Be=$e;var Le=function(){var e=b(h.useState({}),2),r=e[1];return h.useCallback(function(){return r({})},[])};const Me=Le;var We=function(){function e(r,n,t,u){u===void 0&&(u={}),this.serviceRef=r,this.options=n,this.subscribe=t,this.initState=u,this.count=0,this.state={loading:!1,params:void 0,data:void 0,error:void 0},this.state=y(y(y({},this.state),{loading:!n.manual}),u)}return e.prototype.setState=function(r){r===void 0&&(r={}),this.state=y(y({},this.state),r),this.subscribe()},e.prototype.runPluginHandler=function(r){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];var u=this.pluginImpls.map(function(a){var o;return(o=a[r])===null||o===void 0?void 0:o.call.apply(o,p([a],b(n),!1))}).filter(Boolean);return Object.assign.apply(Object,p([{}],b(u),!1))},e.prototype.runAsync=function(){for(var r,n,t,u,a,o,c,s,i,v,d=[],m=0;m<arguments.length;m++)d[m]=arguments[m];return K(this,void 0,void 0,function(){var f,l,g,j,$,_,B,E,P,R,N;return Q(this,function(x){switch(x.label){case 0:if(this.count+=1,f=this.count,l=this.runPluginHandler("onBefore",d),g=l.stopNow,j=g===void 0?!1:g,$=l.returnNow,_=$===void 0?!1:$,B=X(l,["stopNow","returnNow"]),j)return[2,new Promise(function(){})];if(this.setState(y({loading:!0,params:d},B)),_)return[2,Promise.resolve(B.data)];(n=(r=this.options).onBefore)===null||n===void 0||n.call(r,d),x.label=1;case 1:return x.trys.push([1,3,,4]),E=this.runPluginHandler("onRequest",this.serviceRef.current,d).servicePromise,E||(E=(N=this.serviceRef).current.apply(N,p([],b(d),!1))),[4,E];case 2:return P=x.sent(),f!==this.count?[2,new Promise(function(){})]:(this.setState({data:P,error:void 0,loading:!1}),(u=(t=this.options).onSuccess)===null||u===void 0||u.call(t,P,d),this.runPluginHandler("onSuccess",P,d),(o=(a=this.options).onFinally)===null||o===void 0||o.call(a,d,P,void 0),f===this.count&&this.runPluginHandler("onFinally",d,P,void 0),[2,P]);case 3:if(R=x.sent(),f!==this.count)return[2,new Promise(function(){})];throw this.setState({error:R,loading:!1}),(s=(c=this.options).onError)===null||s===void 0||s.call(c,R,d),this.runPluginHandler("onError",R,d),(v=(i=this.options).onFinally)===null||v===void 0||v.call(i,d,void 0,R),f===this.count&&this.runPluginHandler("onFinally",d,void 0,R),R;case 4:return[2]}})})},e.prototype.run=function(){for(var r=this,n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];this.runAsync.apply(this,p([],b(n),!1)).catch(function(u){r.options.onError||console.error(u)})},e.prototype.cancel=function(){this.count+=1,this.setState({loading:!1}),this.runPluginHandler("onCancel")},e.prototype.refresh=function(){this.run.apply(this,p([],b(this.state.params||[]),!1))},e.prototype.refreshAsync=function(){return this.runAsync.apply(this,p([],b(this.state.params||[]),!1))},e.prototype.mutate=function(r){var n=V(r)?r(this.state.data):r;this.runPluginHandler("onMutate",n),this.setState({data:n})},e}();const He=We;function _e(e,r,n){r===void 0&&(r={}),n===void 0&&(n=[]);var t=r.manual,u=t===void 0?!1:t,a=X(r,["manual"]);G&&r.defaultParams&&!Array.isArray(r.defaultParams)&&console.warn("expected defaultParams is array, got ".concat(typeof r.defaultParams));var o=y({manual:u},a),c=k(e),s=Me(),i=Z(function(){var v=n.map(function(d){var m;return(m=d==null?void 0:d.onInit)===null||m===void 0?void 0:m.call(d,o)}).filter(Boolean);return new He(c,o,s,Object.assign.apply(Object,p([{}],b(v),!1)))},[]);return i.options=o,i.pluginImpls=n.map(function(v){return v(i,o)}),Be(function(){if(!u){var v=i.state.params||r.defaultParams||[];i.run.apply(i,p([],b(v),!1))}}),W(function(){i.cancel()}),{loading:i.state.loading,data:i.state.data,error:i.state.error,params:i.state.params||[],cancel:T(i.cancel.bind(i)),refresh:T(i.refresh.bind(i)),refreshAsync:T(i.refreshAsync.bind(i)),run:T(i.run.bind(i)),runAsync:T(i.runAsync.bind(i)),mutate:T(i.mutate.bind(i))}}function Ne(e,r,n){return _e(e,r,p(p([],b(n||[]),!1),[pe,ye,Ce,je,De,oe,me,Oe],!1))}const Ue=I(({token:e})=>({"add-button":{background:e.colorDefault}})),Xe=()=>{const{styles:e,theme:r,cx:n}=Ue(),[t,u]=h.useState([]),{data:a,loading:o}=Ne(ie);return h.useEffect(()=>{u((a==null?void 0:a.list)||[])},[a]),w.jsxs(U,{gap:16,vertical:!0,children:[w.jsx(U,{justify:"end",children:w.jsx(ee,{className:n(e["add-button"]),type:"primary",icon:w.jsx(ne,{}),children:"新建"})}),w.jsx(re,{gutter:[16,16],children:t==null?void 0:t.map((c,s)=>w.jsx(te,{span:8,children:w.jsx(ue,{data:c,index:s,loading:o})},c.id))})]})};export{Xe as default};
