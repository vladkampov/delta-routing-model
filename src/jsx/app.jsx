import vis, { Network, DataSet } from 'vis';
import {
  POSSIBLE_WEIGHTS, 
  REGIONAL_NETWORKS_NUMBER, 
  REGIONAL_NETWORK_SIZE, 
  AVERAGE_NODE_POWER
} from './variables';
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
  },
  interaction:{
     hover: true,
  },
  physics: false,
  //
  // TODO: implement manipulations
  //
  // manipulation: {
  //   initiallyActive: true,
  //   addNode: function (data, callback) {
  //     data.id = currentID;
  //     data.label = data.id;

  //     // Refill dropdown lists in "Send message" menu
  //     $("#from").append($("<option />").val(data.id + 1).text(data.id + 1));
  //     $("#to").append($("<option />").val(data.id + 1).text(data.id + 1));

  //     currentID++;
  //     callback(data)
  //   },
  //   addEdge: function (data, callback) {
  //     // filling in the popup DOM elements
  //     if (data.from == data.to) {
  //       alert("You can't connect the node to itself");
  //       callback(null);
  //       return
  //     }
  //     $.post('/add-connection', data, function(connection){
  //       callback(connection);              
  //     });
  //   },
  //   deleteEdge: function (data, callback) {
  //     $.ajax({
  //       url: '/delete-elements',
  //       data: data,
  //       type: 'DELETE'
  //     });
  //     callback(data)
  //   },
  //   deleteNode: function (data, callback) {
  //     $.ajax({
  //       url: '/delete-elements',
  //       data: data,
  //       type: 'DELETE'
  //     });
  //     callback(data)
  //   },
  //   editEdge: false,
  // }
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

