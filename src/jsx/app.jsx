import vis, { Network, DataSet } from 'vis';
import  * as _ from './variables';
import GlobalNetwork from './components/GlobalNetwork';

var network = new GlobalNetwork();

var container = document.getElementById('app');
var nodes = new DataSet(network.nodes);
var edges = new DataSet(network.connections);

var options = {
  nodes: {
    shape: 'circle',
    borderWidth: 1,
    mass: 20,
    font: {
        size: 30
    },
    shadow: false
  },
  edges: {
    selectionWidth: 4,
    width: 2,
    font: {
        size: 22
    },
  },
  interaction:{
     hover: true,
  },
  physics: false,
  manipulation: {
    enabled: true,
    initiallyActive: true,
    addNode: (data, callback) => {
      data.id = network.nodes.length;
      data.label = network.nodes.length;
      data.routing_table = {};
      data.group = _.REGIONAL_NETWORKS_NUMBER - 1;
      data.color = "rgb(132,213,246)";

      network.nodes.push(data);
      localStorage.setItem('nodes', JSON.stringify(network.nodes));
      callback(data);
    },
    addEdge: (data, callback) => {
      if (data.from == data.to) {
        alert("You can't connect the node to itself");
        callback(null);
        return
      }
      data.weight = _.POSSIBLE_WEIGHTS[_.random(0, _.POSSIBLE_WEIGHTS.length)];;
      data.label = data.weight;
      data.dashes = Boolean(Math.round(Math.random()));

      network.connections.push(data);

      localStorage.setItem('connections', JSON.stringify(network.connections));
      callback(data);
    },
    deleteEdge: (data, callback) => {
      var iter = 0;
      var tmp = -1;

      for (var node of network.connections) {
        if (data.edges[0] === node.id) {
          tmp = iter;
          break;
        }
        iter++;
      }

      if (tmp >= 0)
        network.connections.splice(tmp, 1);

      localStorage.setItem('connections', JSON.stringify(network.connections));
      callback(data)
    },
    deleteNode: (data, callback) => {
      var iter = 0;
      var tmp = -1;

      for (var node of network.nodes) {
        if (data.nodes[0] === node.id) {
          tmp = iter;
          break;
        }
        iter++;
      }

      if (tmp >= 0)
        network.nodes.splice(tmp, 1);

      for (var edge of data.edges) {
        iter = 0;
        for (var connection of network.connections) {
          if (edge === connection.id) {
            network.connections.splice(iter, 1);
            break;
          }
          iter++;
        }
      }

      localStorage.setItem('nodes', JSON.stringify(network.nodes));
      localStorage.setItem('connections', JSON.stringify(network.connections));
      callback(data)
    },
    editEdge: false,
  }
};

// initialize your network!
var networkView = new Network(container, {
    nodes: nodes,
    edges: edges
}, options);

networkView.on("doubleClick", (data) => {
  if (data.nodes.length) {
    // click on node
    // TODO: open modal
    console.log(network.getObject(data.nodes[0], 'nodes'));
  } else if (data.edges.length == 1) {
    // click on edge
    
    var connection = network.getObject(data.edges[0], 'connections');
    network.changeObjectAttribute(data.edges[0], 'connections', 'dashes', !connection.dashes);    

    // updating view
    var tempObj = {
      nodes: new DataSet(network.nodes),
      edges: new DataSet(network.connections)
    };
    networkView.setData(tempObj);
  }
});

document.getElementById('generateNetwork').onclick = (e) => {
  e.preventDefault();
  localStorage.removeItem('nodes');
  localStorage.removeItem('connections');
  network = new GlobalNetwork();
  nodes = new DataSet(network.nodes);
  edges = new DataSet(network.connections);
  networkView.setData({nodes: nodes, edges: edges});
}
