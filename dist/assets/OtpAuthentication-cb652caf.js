import{a as N,S as k,l as _,r as R,y as T,b as u,d as V,e,f as o,z as n,A as i,t as f,n as h,g as w,F as I,m as y,o as O,T as A}from"./index-d8252bd5.js";const B={class:"h-screen flex flex-column justify-content-center align-items-center"},U={class:"w-20rem flex flex-column gap-3"},D={class:"flex flex-column gap-1"},F={class:"flex gap-2 align-items-center"},M={class:"pi pi-spin pi-spinner"},z={style:{color:"#10b981"},class:"pi pi-check"},G={style:{color:"rgb(228, 54, 54)"},class:"pi pi-times on-click"},j={class:"flex gap-2"},L=e("div",{class:"flex gap-3 align-items-center"},[e("span",{class:"flex-1 border-top-1 text-300"}),e("span",{class:"text-700"},"hoặc"),e("span",{class:"flex-1 border-top-1 text-300"})],-1),q={__name:"OtpAuthentication",setup(X){const m=N(),{onActionSendMail:v,onActionAuthOtp:S}=k(),l=_({email:"",otp:""}),a=_({email:"",otp:""}),s=R(""),d=c=>{const t=c.target.value;t?y(t)?a.email="":a.email="Email của bạn không hợp lệ":a.email="Vui lòng nhập email của bạn"},g=()=>{l.otp.length>4&&(l.otp=l.otp.slice(0,4))},x=async()=>{s.value="SENDING",(await v({email:l.email})).success?s.value="SENT_SUCCESS":s.value="SENT_ERROR"},E=async()=>{(await S({otp:l.otp,email:l.email})).success&&m.push({name:"Register"})};return T(()=>l.email,()=>{s.value=""}),(c,t)=>{const C=u("InputText"),r=u("Button"),b=u("InputOtp");return O(),V(I,null,[e("div",B,[e("div",U,[e("div",D,[e("div",F,[o(C,{modelValue:l.email,"onUpdate:modelValue":t[0]||(t[0]=p=>l.email=p),placeholder:"Nhập email của bạn",class:"w-full",onBlur:d,onInput:d},null,8,["modelValue"]),n(o(r,{icon:"pi pi-arrow-right",onClick:x},null,512),[[i,l.email&&!a.email&&!s.value]]),n(e("i",M,null,512),[[i,s.value==="SENDING"]]),n(e("i",z,null,512),[[i,s.value==="SENT_SUCCESS"]]),n(e("i",G,null,512),[[i,s.value==="SENT_ERROR"]])]),n(e("small",{class:"p-error"},f(a.email),513),[[i,a.email]])]),e("div",{class:h(["flex flex-column gap-1",{"p-disabled":s.value!=="SENT_SUCCESS"}])},[e("div",j,[o(b,{modelValue:l.otp,"onUpdate:modelValue":t[1]||(t[1]=p=>l.otp=p),onInput:g},null,8,["modelValue"]),o(r,{label:"Xác thực",class:h(["flex-1",{"p-disabled":l.otp.length!==4}]),onClick:E},null,8,["class"])]),n(e("small",{class:"p-error"},f(a.otp),513),[[i,a.otp]])],2),L,o(r,{label:"Bạn đã có tài khoản?",class:"w-full",outlined:"",onClick:t[2]||(t[2]=p=>w(m).replace({name:"Login"}))})])]),o(A)],64)}}};export{q as default};