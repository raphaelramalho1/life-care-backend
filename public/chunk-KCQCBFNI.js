import{b as r}from"./chunk-EQKTRDAQ.js";import{d as n}from"./chunk-72KDLSWN.js";import{c}from"./chunk-5F3K422G.js";import{b as a,g as i,h as l,k as s}from"./chunk-Y2IKLLDI.js";import"./chunk-OYAVQN5W.js";var h="button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) button{cursor:default}",b=h,u="button{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:100%;height:34px;border:0px;outline:none;background:transparent;color:inherit;font-family:var(--ion-font-family, inherit);font-size:inherit;line-height:34px;text-align:inherit;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;overflow:hidden}:host(.option-disabled){opacity:0.4}:host(.option-disabled) button{cursor:default}:host(.option-active){color:var(--ion-color-base)}",m=u,y=(()=>{let o=class{constructor(t){a(this,t),this.pickerColumn=null,this.ariaLabel=null,this.disabled=!1,this.value=void 0,this.color="primary"}onAriaLabelChange(t){this.ariaLabel=t}componentWillLoad(){let t=n(this.el,["aria-label"]);this.ariaLabel=t["aria-label"]||null}connectedCallback(){this.pickerColumn=this.el.closest("ion-picker-column")}disconnectedCallback(){this.pickerColumn=null}componentDidLoad(){let{pickerColumn:t}=this;t!==null&&t.scrollActiveItemIntoView()}onClick(){let{pickerColumn:t}=this;t!==null&&t.setValue(this.value)}render(){let{color:t,disabled:e,ariaLabel:d}=this,p=c(this);return i(l,{key:"c743c6ef44bb9f765cc15b3b5d2864de6520203a",class:r(t,{[p]:!0,"option-disabled":e})},i("button",{key:"4c3d9eb245c52b2c007f727e145cfb55759bd7a9",tabindex:"-1","aria-label":d,disabled:e,onClick:()=>this.onClick()},i("slot",{key:"4c907d2187cbe9d5941e27f2b12578e2b7271461"})))}get el(){return s(this)}static get watchers(){return{"aria-label":["onAriaLabelChange"]}}};return o.style={ios:b,md:m},o})();export{y as ion_picker_column_option};
