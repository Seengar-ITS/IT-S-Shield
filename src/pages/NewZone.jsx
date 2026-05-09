import React,{useState,useEffect} from 'react';
import {supabase} from '../lib/supabase.js';
import {requireAuth,getUser} from '../lib/auth.js';
import * as S from '../styles.js';
export default function NewZone(){
  const [domain,setDomain]=useState('');const [level,setLevel]=useState('standard');const [saving,setSaving]=useState(false);
  useEffect(()=>requireAuth(window.location.href),[]);
  const create=async()=>{setSaving(true);const u=getUser();if(!u)return;const {data}=await supabase.from('shield_zones').insert({user_id:u.sub,domain,protection_level:level,status:'inactive'}).select().single();if(data)window.location.href='/zones/'+data.id;setSaving(false);};
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'New Shield Zone'),React.createElement('div',{style:S.card},React.createElement('div',{style:{marginBottom:'1rem'}},React.createElement('label',{style:S.muted},'Domain'),React.createElement('input',{style:{...S.input,marginTop:'0.3rem'},value:domain,onChange:e=>setDomain(e.target.value),placeholder:'example.com'})),React.createElement('div',{style:{marginBottom:'1.5rem'}},React.createElement('label',{style:S.muted},'Protection Level'),React.createElement('select',{style:{...S.input,marginTop:'0.3rem'},value:level,onChange:e=>setLevel(e.target.value)},React.createElement('option',{value:'basic'},'Basic'),React.createElement('option',{value:'standard'},'Standard'),React.createElement('option',{value:'advanced'},'Advanced'))),React.createElement('button',{style:S.btn,onClick:create,disabled:!domain||saving},saving?'Creating...':'Create Zone')));
}