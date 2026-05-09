import React,{useEffect,useState} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth} from '../lib/auth.js';
import * as S from '../styles.js';
export default function Firewall(){
  const [rules,setRules]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('firewall_rules').select('*').then(({data})=>setRules(data||[]));  },[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'Firewall Rules'),rules.length===0&&React.createElement('div',{style:S.card},React.createElement('p',{style:S.muted},'No rules configured.')),...rules.map(r=>React.createElement('div',{key:r.id,style:S.card},React.createElement('div',{style:{display:'flex',gap:'1rem',alignItems:'center'}},React.createElement('span',{style:{...S.muted,background:'#1e293b',padding:'0.2rem 0.5rem',borderRadius:'4px'}},r.rule_type),React.createElement('strong',null,r.value),React.createElement('span',{style:{color:r.action==='block'?'#dc2626':'#22c55e'}},'→ '+r.action)))));
}