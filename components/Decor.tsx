/** Original decorative UI paths. Never intercept pointer or keyboard interaction. */
export function LotusMark({className=''}:{className?:string}) {
  return <svg className={className} viewBox="0 0 100 52" fill="none" aria-hidden="true"><path d="M50 43C26 38 23 15 50 3c27 12 24 35 0 40Z" fill="currentColor" opacity=".22"/><path d="M50 43C35 33 35 16 50 3c15 13 15 30 0 40ZM50 43C28 45 10 31 8 14c20 0 35 10 42 29ZM50 43c22 2 40-12 42-29-20 0-35 10-42 29Z" stroke="currentColor" strokeWidth="1.5"/><path d="M4 40c13 13 30 13 46 3 16 10 33 10 46-3M23 49h54" stroke="currentColor" strokeLinecap="round"/><circle cx="50" cy="28" r="3" fill="currentColor"/></svg>;
}
export function OrnateFrame() {
 return <span className="ornate-frame" aria-hidden="true">{[0,1,2,3].map(i=><svg key={i} className={'frame-corner corner-'+i} viewBox="0 0 80 80" fill="none"><path d="M3 71V3h68M10 51V10h41" stroke="currentColor"/><path d="M7 35C9 16 37 4 34 21c-2 12-18 13-13 2 4-8 13 0 3 8 17-3 20-16 14-24M7 13c9 4 12 10 7 16M13 7c4 9 10 12 16 7" stroke="currentColor" strokeWidth="1.4"/><path d="m4 5 7 1-5 5-2-6ZM41 5l5-3 5 3-5 3-5-3ZM5 41l3 5-3 5-3-5 3-5Z" fill="currentColor"/></svg>)}</span>;
}
export function ForestBorder({className=''}:{className?:string}) {return <div className={'forest-border '+className} aria-hidden="true"/>}
export function MagicMotes(){return <div className="magic-motes" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{'--mote-x':`${12+(i*19)%83}%`,'--mote-y':`${15+(i*29)%70}%`,'--mote-delay':`${-i*1.7}s`} as React.CSSProperties}/>)}</div>}
