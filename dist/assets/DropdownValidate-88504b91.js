import{b as m,o as b,d as y,e as l,t as n,z as d,A as p,f as g,g as s,a3 as w,n as i,R as V}from"./index-3106e3ea.js";import{b as q}from"./InputTextValidate-a0fc5aa6.js";const h={class:"p-error"},_={class:"flex flex-column gap-1 w-full"},P={__name:"DropdownValidate",props:{name:{type:String,required:!0,default:""},label:{type:String,required:!1,default:""},options:{type:Array,required:!1,default:""},class:{type:String,required:!1,default:""},style:{type:Object,required:!1,default:()=>{}},disabled:{type:Boolean,required:!1,default:!1},placeholder:{type:String,required:!1,default:""},dropdownProps:{type:Object,required:!1,default:()=>({optionLabel:"name",optionValue:"code",placeholder:"",class:"",required:!0})}},emits:["onChange"],setup(u,{emit:c}){const e=u,{value:a,errorMessage:r,setErrors:v,setValue:S}=q(e.name);return(x,o)=>{const f=m("Dropdown");return b(),y("div",{class:i(["flex flex-column gap-2",e.class]),style:V(e.style)},[l("label",null,[l("span",null,n(e.label),1),d(l("span",h,"*",512),[[p,e.dropdownProps.required]])]),l("div",_,[g(f,{modelValue:s(a),"onUpdate:modelValue":o[0]||(o[0]=t=>w(a)?a.value=t:null),options:e.options,optionLabel:e.dropdownProps.optionLabel,optionValue:e.dropdownProps.optionValue,placeholder:e.placeholder,class:i(e.dropdownProps.class),disabled:e.disabled,onChange:o[1]||(o[1]=t=>c("onChange"))},null,8,["modelValue","options","optionLabel","optionValue","placeholder","class","disabled"]),d(l("small",{class:"p-error"},n(s(r)),513),[[p,s(r)]])])],6)}}};export{P as _};
