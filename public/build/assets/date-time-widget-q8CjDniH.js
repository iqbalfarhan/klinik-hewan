import{r as e,j as t}from"./app-BiH4P8My.js";import{b as n,d as r,B as c}from"./createLucideIcon-DG-B7J-s.js";import{C as m,c as d}from"./card-BbPX60WY.js";/* empty css            *//**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],l=n("Calendar",i),M=()=>{const[s,a]=e.useState(r().format("DD MMMM YYYY | HH:mm:ss"));return e.useEffect(()=>{const o=setInterval(()=>{a(r().format("DD MMMM YYYY | HH:mm:ss"))},1e3);return()=>clearInterval(o)},[]),t.jsx(m,{children:t.jsx(d,{className:"flex flex-1 items-center justify-center font-mono",children:t.jsxs(c,{variant:"ghost",disabled:!0,children:[t.jsx(l,{}),s]})})})};export{M as default};
