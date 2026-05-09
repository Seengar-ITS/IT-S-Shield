import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Zones from './pages/Zones.jsx';
import NewZone from './pages/NewZone.jsx';
import Zone from './pages/Zone.jsx';
import Firewall from './pages/Firewall.jsx';
import Threats from './pages/Threats.jsx';
import DDoS from './pages/DDoS.jsx';
import Settings from './pages/Settings.jsx';
import Billing from './pages/Billing.jsx';
import Nav from './components/Nav.jsx';

export default function App(){
  return React.createElement(BrowserRouter,null,
    React.createElement(Nav),
    React.createElement(Routes,null,
    React.createElement(Route,{path:'/',element:React.createElement(Home)}),
    React.createElement(Route,{path:'/zones',element:React.createElement(Zones)}),
    React.createElement(Route,{path:'/zones/new',element:React.createElement(NewZone)}),
    React.createElement(Route,{path:'/zones/:id',element:React.createElement(Zone)}),
    React.createElement(Route,{path:'/firewall',element:React.createElement(Firewall)}),
    React.createElement(Route,{path:'/threats',element:React.createElement(Threats)}),
    React.createElement(Route,{path:'/ddos',element:React.createElement(DDoS)}),
    React.createElement(Route,{path:'/settings',element:React.createElement(Settings)}),
    React.createElement(Route,{path:'/billing',element:React.createElement(Billing)})
    )
  );
}
