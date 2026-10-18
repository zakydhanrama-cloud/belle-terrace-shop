"use client";
import {useState} from 'react';
export default function Page(){
const tiers=[{name:"Single Spot",price:45,time:"3 days"},{name:"Full Page",price:120,time:"7 days"},{name:"Full Book 32p",price:950,time:"21 days",pop:true}];
const [sel,setSel]=useState(tiers[2]);const [cart,setCart]=useState<any[]>([]);
return (<div style={{background:"#FFFEF8",minHeight:"100vh",fontFamily:"system-ui",padding:"20px"}}>
<h1 style={{fontWeight:900}}>BELLE TERRACE 🎨 Colour Food Freedom</h1>
<p>Previously ko-fi.com/bellesterrace - now 0% fee shop!</p>
{tiers.map(t=><button key={t.name} onClick={()=>setSel(t)} style={{display:"block",margin:"8px 0",padding:"12px",border:"3px solid black",borderRadius:"16px",background:sel.name===t.name?"black":"white",color:sel.name===t.name?"white":"black",width:"100%"}}><b>{t.name} - ${t.price}</b> - {t.time}</button>)}
<button onClick={()=>setCart([...cart,sel])} style={{background:"#FFE66D",border:"3px solid black",borderRadius:"20px",padding:"12px 20px",fontWeight:900}}>ADD TO CART ${sel.price}</button>
{cart.length>0&&<div style={{marginTop:"12px",background:"white",border:"3px solid black",borderRadius:"16px",padding:"12px"}}>Cart {cart.length} = ${cart.reduce((a:any,b:any)=>a+b.price,0)} <br/><button onClick={()=>window.open(`https://wa.me/6280000000000?text=Hi Belle I want ${sel.name}`,'_blank')} style={{background:"#22c55e",color:"white",border:"none",borderRadius:"12px",padding:"10px",marginTop:"8px",width:"100%"}}>PAY NOW WA/Stripe/Midtrans</button></div>}
</div>)}
