import {
  POSSIBLE_WEIGHTS, 
  REGIONAL_NETWORKS_NUMBER, 
  REGIONAL_NETWORK_SIZE, 
  AVERAGE_NODE_POWER,
  times
} from '../variables';
import Connection from './Connection';
import Node from './Node';

export default class GlobalNetwork {
    constructor() {
        this.nodes = [];
        this.connections = [];

        this.setState();
    }

    setState = (nodes, connections) => {
        if (nodes && connections) {
            this.nodes = nodes;
            this.connections = connections;
        } else {
            // initial state of network 


            times(REGIONAL_NETWORKS_NUMBER) (i => {
                times(REGIONAL_NETWORK_SIZE) (j => {
                    var tempNode = new Node(i * 10 + j, i);
                    this.nodes.push(tempNode)
                })
            });


            
        }

        return this;
    }
}
