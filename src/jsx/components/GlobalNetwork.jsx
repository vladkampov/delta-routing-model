import * as _ from '../variables';
import Connection from './Connection';
import Node from './Node';

export default class GlobalNetwork {
    constructor() {
        // initial data for nodes
        this.nodes = JSON.parse(localStorage.getItem('nodes')) || (() => {
            const nodes = [];

            _.times(_.REGIONAL_NETWORKS_NUMBER) (i => {
                _.times(_.REGIONAL_NETWORK_SIZE) (j => {
                    // Generate nodes
                    nodes.push(new Node(i * 10 + j, i));
                });
            });

            localStorage.setItem('nodes', JSON.stringify(nodes));
            return nodes;
        })();

        // initial data for edges
        this.connections = JSON.parse(localStorage.getItem('connections')) || (() => {
            const connections = [];

            _.times(_.REGIONAL_NETWORKS_NUMBER) (i => {
                _.times(parseInt(_.REGIONAL_NETWORK_SIZE * _.AVERAGE_NODE_POWER)) (j => {
                    var randomWeight = _.POSSIBLE_WEIGHTS[_.random(0, _.POSSIBLE_WEIGHTS.length)];
                    var from = _.random(i * 10, _.REGIONAL_NETWORK_SIZE);
                    var to = _.random(i * 10, _.REGIONAL_NETWORK_SIZE);
                    if (from != to)
                        connections.push(new Connection(randomWeight, from, to, i));
                });

                // connection between regions
                var randomWeight = _.POSSIBLE_WEIGHTS[_.random(0, _.POSSIBLE_WEIGHTS.length)];
                var to = Math.floor((i * 10) + _.REGIONAL_NETWORK_SIZE * 2- _.AVERAGE_NODE_POWER);
                connections.push(new Connection(randomWeight, 
                                i * 10, 
                                (to <= this.nodes.length - 1) ? to : _.random(0, _.REGIONAL_NETWORK_SIZE), 
                                i));
            });

            localStorage.setItem('connections', JSON.stringify(connections));
            return connections;
        })();
    }

    setState = (nodes, connections) => {
        if (nodes && connections) {
            localStorage.removeItem('nodes');
            localStorage.removeItem('connections');
            this.nodes = nodes;
            this.connections = connections;
        } 

        return this;
    }

    getObject = (id, type) => {
        if (id) {
            for (var obj of this[type]) {
                if (id === obj.id) {
                    return(obj);
                }
            }
        } else
            return null;
    }


    changeObjectAttribute = (id, type, attributeName, value) => {
        if (id) {
            for (var obj of this[type]) {
                if (id === obj.id) {
                    obj[attributeName] = value;
                    return(obj);
                }
            }
        } else
            return null;
    }
}
