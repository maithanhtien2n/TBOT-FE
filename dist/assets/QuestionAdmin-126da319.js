import{Z as B,a6 as Q,l as q,c as G,y as K,C as U,b as r,d as _,e as d,f as t,w as l,F as x,o as p,N as F,h as M,x as Y,n as z,M as L,t as H,a0 as O}from"./index-1f6681f0.js";import{_ as S}from"./UserCard-589e403e.js";const W={class:"flex flex-column gap-3"},X={class:"flex flex-wrap gap-2 justify-content-between"},Z={key:1,class:"p-2 card-bg text-center"},J=d("div",{class:"text-center w-full"},"Thao tác",-1),ee={class:"flex gap-3 justify-content-center"},ne=d("div",{class:"flex justify-content-center"}," Không tìm thấy kết quả nào ",-1),te={key:1},le={__name:"QuestionAdmin",setup(oe){const T=B(),{onGetterListQuestion:h,onActionGetListQuestion:y,onActionDeleteQuestion:E,onActionReplyQuestion:D}=Q(),P=[{name:"Tất cả",code:"ALL"},{name:"Chưa trả lời",code:"NOT_ANSWERED"},{name:"Đã trả lời",code:"ANSWERED"}],n=q({tabIndex:0,body:{pagination:{first:0,rows:5,sort:null},keySearch:""},replyContent:null,tableSelection:[]}),I=G(()=>{switch(n.tabIndex){case 0:return h.value.all;case 1:return h.value.notAnswered;case 2:return h.value.answered;default:return h.value.all}}),N=()=>{n.body.keySearch="",n.tableSelection=[]},w=(s,o)=>{y({tab:s,keySearch:o})},k=(s,o,u,{tab:m,keySearch:b})=>{u.answer&&(n.replyContent=u.answer.content),T.require({message:`Bạn muốn ${o} câu hỏi?`,header:s==="DELETE"?"Xác nhận":"Nhập câu trả lời",acceptLabel:s==="DELETE"?"Đồng ý":"Trả lời",acceptClass:s==="DELETE"?"p-button-danger":"",rejectLabel:"Hủy bỏ",rejectClass:"p-button-outlined",accept:async()=>{s==="DELETE"&&await E(u._id),s==="REPLY"&&await D({questionId:u._id,answer:n.replyContent||""}),O.emit("isNewData","Dữ liệu mới"),y({tab:m,keySearch:b},!0),n.replyContent=""},type:s})};return K(()=>n.body.keySearch,s=>{s||y({tab:"ALL",keySearch:""},!0)}),U(()=>{y({tab:"ALL",keySearch:""})}),(s,o)=>{const u=r("InputText"),m=r("Button"),b=r("InputGroup"),f=r("Column"),A=r("DataTable"),R=r("TabPanel"),V=r("TabView"),$=r("Textarea"),j=r("ConfirmDialog");return p(),_(x,null,[d("div",W,[t(F,{icon:"pi pi-question-circle",title:"Câu hỏi của người dùng"}),t(V,{activeIndex:n.tabIndex,"onUpdate:activeIndex":o[2]||(o[2]=i=>n.tabIndex=i),onTabChange:N,class:"card"},{default:l(()=>[(p(),_(x,null,M(P,(i,g)=>t(R,{key:g,header:i.name},{default:l(()=>[t(A,{paginator:!0,selection:n.tableSelection,"onUpdate:selection":o[1]||(o[1]=e=>n.tableSelection=e),value:I.value,first:n.body.pagination.first,rows:n.body.pagination.rows,rowsPerPageOptions:[5,10,15,20],removableSort:!0,paginatorTemplate:" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",currentPageReportTemplate:"Hiển thị {first} - {last} / tổng {totalRecords} dòng"},{header:l(()=>[d("div",X,[t(b,{class:"w-20rem"},{default:l(()=>[t(u,{modelValue:n.body.keySearch,"onUpdate:modelValue":o[0]||(o[0]=e=>n.body.keySearch=e),placeholder:"Tìm theo tên tài khoản",size:"small",class:"w-full",maxLength:"35",onKeypress:Y(e=>w(i.code,n.body.keySearch),["enter"])},null,8,["modelValue","onKeypress"]),t(m,{icon:"pi pi-search",class:z({"p-disabled":!n.body.keySearch}),onClick:e=>w(i.code,n.body.keySearch)},null,8,["class","onClick"])]),_:2},1024)])]),empty:l(()=>[ne]),default:l(()=>[t(f,{field:"question",header:"Câu hỏi",class:"white-space-nowrap",style:{width:"13rem"}},{body:l(({data:e})=>{var c,a,v,C;return[t(S,{value:{avatar:((c=e==null?void 0:e.question)==null?void 0:c.avatar)||"/images/avatar.jpg",fullName:(a=e==null?void 0:e.question)==null?void 0:a.fullName,sentDate:(v=e==null?void 0:e.question)==null?void 0:v.sentDate,content:(C=e==null?void 0:e.question)==null?void 0:C.content}},null,8,["value"])]}),_:1}),t(f,{field:"answer",header:"Câu trả lời",class:"white-space-nowrap",style:{width:"13rem"}},{body:l(({data:e})=>{var c,a;return[e!=null&&e.answer?(p(),L(S,{key:0,value:{avatar:"/images/avatar-admin.jpg",fullName:"Quản trị viên",sentDate:(c=e==null?void 0:e.answer)==null?void 0:c.sentDate,content:(a=e==null?void 0:e.answer)==null?void 0:a.content}},null,8,["value"])):(p(),_("div",Z,"Chưa trả lời"))]}),_:1}),t(f,{class:"white-space-nowrap",headerClass:"text-center",style:{width:"7rem"}},{header:l(()=>[J]),body:l(({data:e})=>[d("div",ee,[t(m,{icon:"pi pi-trash ",class:"p-button-danger",onClick:c=>{var a;return k("DELETE","xóa",e,{tab:i.code,keySearch:(a=e.body)==null?void 0:a.keySearch})}},null,8,["onClick"]),t(m,{icon:`pi ${e.answer?"pi-pencil":"pi-check"} `,onClick:c=>{var a;return k("REPLY","trả lời",e,{tab:i.code,keySearch:(a=e.body)==null?void 0:a.keySearch})}},null,8,["icon","onClick"])])]),_:2},1024)]),_:2},1032,["selection","value","first","rows"])]),_:2},1032,["header"])),64))]),_:1},8,["activeIndex"])]),t(j,{class:"line-height-3"},{message:l(i=>[i.message.type==="REPLY"?(p(),L($,{key:0,modelValue:n.replyContent,"onUpdate:modelValue":o[3]||(o[3]=g=>n.replyContent=g),class:"w-20rem",rows:"2"},null,8,["modelValue"])):(p(),_("span",te,H(i.message.message),1))]),_:1})],64)}}};export{le as default};
