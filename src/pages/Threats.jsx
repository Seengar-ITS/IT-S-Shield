import React,{useEffect,useState} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth} from '../lib/auth.js';
import * as S from '../styles.js';
export default function Threats(){
  const [threats,setThreats]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('threat_logs').select('*').order('created_at',{ascending:false}).limit(50).then(({data})=>setThreats(data||[]));  },[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'Threat Monitor'),threats.length===0&&React.createElement('div',{style:S.card},React.createElement('p',{style:{color:'#22c55e'}},'No threats detected.')),...threats.map(t=>React.createElement('div',{key:t.id,style:S.card},React.createElement('div',{style:{display:'flex',justifyContent:'space-between'}},React.createElement('span',{style:{color:'#f59e0b'}},t.threat_type),React.createElement('span',{style:S.muted},new Date(t.created_at).toLocaleString())),React.createElement('p',{style:S.muted},'IP: '+t.ip+' · '+t.action_taken))));
}