import vis, { Network, DataSet } from 'vis';
import {
  POSSIBLE_WEIGHTS, 
  REGIONAL_NETWORKS_NUMBER, 
  REGIONAL_NETWORK_SIZE, 
  AVERAGE_NODE_POWER
} from './variables';
import GlobalNetwork from './components/GlobalNetwork';

var a = new GlobalNetwork();
console.log(a)
var container = document.getElementById('app');

var nodes = new DataSet(a.nodes);

var edges = new DataSet(a.connections);

var data = {
    nodes: nodes,
    edges: edges
};

var options = {
  
};

// initialize your network!
var network = new Network(container, data, options);