import React,{useEffect,useState} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth} from '../lib/auth.js';
import * as S from '../styles.js';
export default function Home(){
  const [stats,setStats]=useState({zones:0,threats:0,ddos:0,rules:0});
  useEffect(()=>{requireAuth(window.location.href);Promise.all([supabase.from('shield_zones').select('id',{count:'exact',head:true}),supabase.from('threat_logs').select('id',{count:'exact',head:true}),supabase.from('ddos_events').select('id',{count:'exact',head:true}),supabase.from('firewall_rules').select('id',{count:'exact',head:true})]).then(([z,t,d,r])=>setStats({zones:z.count||0,threats:t.count||0,ddos:d.count||0,rules:r.count||0}));},[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'IT-S Shield'),React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem'}},[['Protected Zones',stats.zones,'#22c55e'],['Threats Blocked',stats.threats,'#f59e0b'],['DDoS Events',stats.ddos,'#dc2626'],['Firewall Rules',stats.rules,'#7c3aed']].map(([k,v,c])=>React.createElement('div',{key:k,style:S.card},React.createElement('p',{style:S.muted},k),React.createElement('h2',{style:{...S.h2,fontSize:'2rem',color:c}},v)))));
}