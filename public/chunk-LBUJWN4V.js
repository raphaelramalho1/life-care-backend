import{b as s}from"./chunk-ADVWGGQ5.js";import{i as t}from"./chunk-OYAVQN5W.js";var o=class extends s{getCurrentPosition(e){return t(this,null,function*(){return new Promise((n,a)=>{navigator.geolocation.getCurrentPosition(i=>{n(i)},i=>{a(i)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})})}watchPosition(e,n){return t(this,null,function*(){return`${navigator.geolocation.watchPosition(i=>{n(i)},i=>{n(null,i)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0,minimumUpdateInterval:5e3},e))}`})}clearWatch(e){return t(this,null,function*(){navigator.geolocation.clearWatch(parseInt(e.id,10))})}checkPermissions(){return t(this,null,function*(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");let e=yield navigator.permissions.query({name:"geolocation"});return{location:e.state,coarseLocation:e.state}})}requestPermissions(){return t(this,null,function*(){throw this.unimplemented("Not implemented on web.")})}},m=new o;export{m as Geolocation,o as GeolocationWeb};
