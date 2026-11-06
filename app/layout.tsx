import type { Metadata } from 'next';
import localFont from 'next/font/local';
const vision = localFont({src:'./fonts/fc-vision.otf',variable:'--font-fc-body',display:'swap',weight:'850',fallback:['Tahoma','sans-serif']});
const visionWide = localFont({src:'./fonts/fc-vision-wide.otf',variable:'--font-fc-display',display:'swap',weight:'850',fallback:['Tahoma','sans-serif']});
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3200'),title:{default:'Monmora Online — เตรียมพบกันเร็ว ๆ นี้',template:'%s | Monmora Online'},description:'ทำความรู้จักโลกแฟนตาซีไทย 2D Chibi สามอาชีพ ห้าดินแดน และติดตามกำหนดการเปิดบริการ Monmora Online เร็ว ๆ นี้',openGraph:{title:'Monmora Online',description:'การผจญภัยครั้งใหม่ ใต้ฟ้าที่คุ้นเคย',locale:'th_TH',type:'website',images:[{url:'/art/hero-adventure.png',width:1672,height:941,alt:'นักผจญภัย Chibi ทั้งสามอาชีพในโลกแฟนตาซีไทย'}]},icons:{icon:'/art/app-icon.png',apple:'/art/app-icon.png'},twitter:{card:'summary_large_image',title:'Monmora Online',images:['/art/hero-adventure.png']}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="th" className={`${vision.variable} ${visionWide.variable}`}><body>{children}</body></html>}
