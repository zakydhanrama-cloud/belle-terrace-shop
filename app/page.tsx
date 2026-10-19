"use client";
import { useState } from "react";

type Artwork = { id:number; title:string; artist:string; image:string; likes:number; dimension:"2D"|"3D"|"Illustration"|"Fashion"; category:string; };

const dummyArt: Artwork[] = [
  {id:1, title:"Belle Study No.01", artist:"belleterace", image:"https://picsum.photos/seed/belle1/600/800", likes:342, dimension:"2D", category:"Portrait"},
  {id:2, title:"Terace Light", artist:"belleterace", image:"https://picsum.photos/seed/belle2/600/750", likes:521, dimension:"Illustration", category:"Fashion"},
  {id:3, title:"Noir Dress", artist:"belleterace", image:"https://picsum.photos/seed/belle3/600/900", likes:892, dimension:"Fashion", category:"Editorial"},
  {id:4, title:"Community WIP", artist:"belleterace", image:"https://picsum.photos/seed/belle4/600/700", likes:124, dimension:"3D", category:"Concept"},
  {id:5, title:"Soft Skin Series", artist:"belleterace", image:"https://picsum.photos/seed/belle5/600/800", likes:673, dimension:"2D", category:"Beauty"},
  {id:6, title:"Terace Archive", artist:"belleterace", image:"https://picsum.photos/seed/belle6/600/750", likes:445, dimension:"Illustration", category:"Archive"},
  {id:7, title:"Belle Muse", artist:"belleterace", image:"https://picsum.photos/seed/belle7/600/850", likes:1023, dimension:"Fashion", category:"Muse"},
  {id:8, title:"Untitled 08", artist:"belleterace", image:"https://picsum.photos/seed/belle8/600/700", likes:234, dimension:"2D", category:"Study"},
];

export default function BellePage() {
  const [sort, setSort] = useState("community");
  const [dimension, setDimension] = useState("all");
  const [selected, setSelected] = useState<Artwork|null>(null);

  const filtered = dummyArt.filter(a => dimension==="all" || a.dimension===dimension).sort((a,b)=> sort==="community" ? b.likes-a.likes : a.id-b.id);

  return (
    <div style={{background:"#0f0f0f", minHeight:"100vh", color:"white", fontFamily:"Inter, sans-serif"}}>
      {/* Header ala ArtStation */}
      <div style={{borderBottom:"1px solid #2a2a2a", padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#0f0f0f", zIndex:10}}>
        <div style={{display:"flex", gap:20, alignItems:"center"}}>
          <h1 style={{fontWeight:900, fontSize:20, letterSpacing:1}}>BELLE<span style={{fontWeight:300}}>TERACE</span></h1>
          <div style={{display:"flex", gap:12, fontSize:13}}>
            <span style={{color:"#fff", fontWeight:700, borderBottom:"2px solid #fff", paddingBottom:2}}>Community</span>
            <span style={{color:"#888"}}>Marketplace</span>
            <span style={{color:"#888"}}>Jobs</span>
          </div>
        </div>
        <div style={{display:"flex", gap:10}}>
          <input placeholder="Search" style={{background:"#1a1a1a", border:"1px solid #333", borderRadius:6, padding:"6px 12px", fontSize:12, color:"white"}}/>
          <button style={{background:"#13aff0", border:"none", borderRadius:6, padding:"6px 14px", fontSize:12, fontWeight:700, color:"white"}}>Sign In</button>
        </div>
      </div>

      {/* Filters ala ArtStation */}
      <div style={{padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, borderBottom:"1px solid #1a1a1a"}}>
        <div style={{display:"flex", gap:8}}>
          {["community","trending","latest","following"].map(s=>(
            <button key={s} onClick={()=>setSort(s)} style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, textTransform:"capitalize", border:"1px solid #333", background:sort===s?"white":"transparent", color:sort===s?"black":"#aaa", cursor:"pointer"}}>{s}</button>
          ))}
        </div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <span style={{fontSize:11, color:"#666"}}>Dimension:</span>
          {["all","2D","3D","Illustration","Fashion"].map(d=>(
            <button key={d} onClick={()=>setDimension(d)} style={{padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:600, border:"1px solid #333", background:dimension===d?"#2a2a2a":"transparent", color:dimension===d?"white":"#888", cursor:"pointer"}}>{d.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* Grid Masonry ala ArtStation */}
      <div style={{padding:20, columns:"4 240px", columnGap:16}}>
        {filtered.map(art=>(
          <div key={art.id} onClick={()=>setSelected(art)} style={{breakInside:"avoid", marginBottom:16, cursor:"pointer", background:"#1a1a1a", borderRadius:8, overflow:"hidden", border:"1px solid #222"}}>
            <img src={art.image} alt={art.title} style={{width:"100%", display:"block"}}/>
            <div style={{padding:"10px 12px"}}>
              <div style={{fontSize:13, fontWeight:700, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{art.title}</div>
              <div style={{display:"flex", justifyContent:"space-between", marginTop:4, alignItems:"center"}}>
                <div style={{display:"flex", gap:6, alignItems:"center"}}><div style={{width:18, height:18, borderRadius:999, background:"#333"}}/><span style={{fontSize:11, color:"#888"}}>{art.artist}</span></div>
                <div style={{fontSize:11, color:"#888"}}>❤️ {art.likes}</div>
              </div>
              <div style={{marginTop:6, display:"flex", gap:6}}><span style={{fontSize:9, background:"#222", padding:"3px 6px", borderRadius:4, color:"#aaa"}}>{art.dimension}</span><span style={{fontSize:9, background:"#222", padding:"3px 6px", borderRadius:4, color:"#aaa"}}>{art.category}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal ala ArtStation */}
      {selected && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,.9)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:20}} onClick={()=>setSelected(null)}>
          <div style={{background:"#1a1a1a", borderRadius:12, maxWidth:1000, width:"100%", display:"flex", overflow:"hidden", maxHeight:"90vh"}} onClick={e=>e.stopPropagation()}>
            <div style={{flex:2, background:"black", display:"flex", alignItems:"center", justifyContent:"center"}}><img src={selected.image} style={{maxWidth:"100%", maxHeight:"90vh", objectFit:"contain"}}/></div>
            <div style={{flex:1, padding:20, borderLeft:"1px solid #222", minWidth:260}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><h2 style={{fontSize:18, fontWeight:800}}>{selected.title}</h2><button onClick={()=>setSelected(null)} style={{background:"#222", border:"none", color:"white", borderRadius:6, padding:"4px 8px", cursor:"pointer"}}>✕</button></div>
              <div style={{marginTop:12, display:"flex", gap:10, alignItems:"center"}}><div style={{width:32, height:32, borderRadius:999, background:"#333"}}/><div><div style={{fontSize:13, fontWeight:700}}>{selected.artist}</div><div style={{fontSize:11, color:"#888"}}>Belle Terace Studio</div></div></div>
              <div style={{marginTop:16, display:"flex", gap:8}}><button style={{flex:1, background:"white", color:"black", border:"none", borderRadius:6, padding:10, fontWeight:700, fontSize:12}}>❤️ Like {selected.likes}</button><button style={{flex:1, background:"#222", color:"white", border:"1px solid #333", borderRadius:6, padding:10, fontWeight:700, fontSize:12}}>Follow</button></div>
              <div style={{marginTop:16, fontSize:12, color:"#888", lineHeight:1.5}}>Raw page for belle terace - ArtStation style. Replace images with your real artwork later. This layout supports community sort & dimension filter like ArtStation.</div>
              <div style={{marginTop:12}}><span style={{fontSize:10, background:"#222", padding:"4px 8px", borderRadius:4, marginRight:6}}>{selected.dimension}</span><span style={{fontSize:10, background:"#222", padding:"4px 8px", borderRadius:4}}>{selected.category}</span></div>
            </div>
          </div>
        </div>
      )}

      <div style={{textAlign:"center", padding:20, fontSize:11, color:"#555", borderTop:"1px solid #1a1a1a", marginTop:20}}>BELLE TERACE — Raw page • ArtStation Community Clone • /belle • Replace dummy with real artwork</div>
    </div>
  );
}
