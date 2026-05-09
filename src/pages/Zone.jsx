import React,{useEffect,useState} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth} from '../lib/auth.js';
import * as S from '../styles.js';
export default function Zone(){
  const id=window.location.pathname.split('/')[2];
  const [zone,setZone]=useState(null);const [threats,setThreats]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('shield_zones').select('*').eq('id',id).single().then(({data})=>setZone(data));supabase.from('threat_logs').select('*').eq('zone_id',id).order('created_at',{ascending:false}).limit(10).then(({data})=>setThreats(data||[]));  },[id]);
  if(!zone)return React.createElement('div',{style:S.page},React.createElement('p',{style:S.muted},'Loading...'));
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},zone.domain),React.createElement('h2',{style:S.h2},'Recent Threats'),threats.length===0&&React.createElement('p',{style:S.muted},'No threats detected.'),...threats.map(t=>React.createElement('div',{key:t.id,style:S.card},React.createElement('p',{style:{color:'#f59e0b'}},t.threat_type),React.createElement('p',{style:S.muted},'IP: '+t.ip+' · Action: '+t.action_taken))));
}