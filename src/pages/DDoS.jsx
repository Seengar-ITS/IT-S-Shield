import React,{useEffect,useState} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth} from '../lib/auth.js';
import * as S from '../styles.js';
export default function DDoS(){
  const [events,setEvents]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('ddos_events').select('*').order('created_at',{ascending:false}).limit(20).then(({data})=>setEvents(data||[]));  },[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'DDoS Events'),events.length===0&&React.createElement('div',{style:S.card},React.createElement('p',{style:{color:'#22c55e'}},'No DDoS attacks detected.')),...events.map(e=>React.createElement('div',{key:e.id,style:S.card},React.createElement('div',{style:{display:'flex',justifyContent:'space-between'}},React.createElement('span',{style:{color:e.mitigated?'#22c55e':'#dc2626'}},e.mitigated?'Mitigated':'Active'),React.createElement('span',{style:S.muted},new Date(e.created_at).toLocaleString())),React.createElement('p',null,'Peak: ',React.createElement('strong',null,e.peak_rps+' RPS'),' · Duration: '+e.duration_seconds+'s'))));
}