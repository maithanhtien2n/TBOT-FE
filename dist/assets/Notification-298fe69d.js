import{a as _,Y as h,c as p,C as g,d as s,f as x,e,F as m,h as N,L as v,o,N as k,n as b,t as i,g as C,X as y}from"./index-1106373e.js";const L={class:"flex h-full flex-column gap-3"},B={class:"flex h-full flex-column gap-2"},D=["src"],R={class:"flex flex-column gap-2"},T=["onClick"],V={style:{"font-size":"0.9rem"},class:"text-700"},w={key:0,class:"card-bg flex-1 flex flex-column gap-3 justify-content-center align-items-center"},z=e("i",{class:"pi pi-volume-off text-2xl text-800"},null,-1),A=e("span",{class:"text-800"},"Chưa có thông báo nào.",-1),E=[z,A],j={__name:"Notification",setup(F){const l=_(),{onGetterListNotification:r,onActionGetListNotification:d}=h(),a=p(()=>r.value.result),f=n=>{l.push({name:"NotificationDetail",params:{id:n}})};return g(()=>{d()}),(n,G)=>{var c;return o(),s("div",L,[x(k,{icon:"pi pi-bell",title:"Thông báo"}),e("div",B,[(o(!0),s(m,null,N(a.value,(t,u)=>(o(),s("div",{key:u,class:"card-bg flex gap-2"},[e("img",{class:"w-4rem h-4rem border-circle",src:t.image||"/images/image-product-default.svg",onerror:"this.onerror=null; this.src='/images/image-product-default.svg';"},null,8,D),e("div",R,[e("span",{class:b([{"font-bold":t==null?void 0:t.isNewNotification},"text-900 line-height-2 on-click"]),onClick:S=>f(t._id)},i(t.title),11,T),e("span",V,i(C(y)(t==null?void 0:t.createdAt,!0)),1)])]))),128)),(c=a.value)!=null&&c.length?v("",!0):(o(),s("div",w,E))])])}}};export{j as default};