import {
  POSSIBLE_WEIGHTS, 
  REGIONAL_NETWORKS_NUMBER, 
  REGIONAL_NETWORK_SIZE, 
  AVERAGE_NODE_POWER
} from '../variables';

export default class Node {
    constructor(id, network_id) {
        this.id = id;
        this.label = "" + id;
        this.group = network_id;
        this.routing_table = {};

        var radius = 200;

        var angle = (id - REGIONAL_NETWORK_SIZE * network_id) * parseInt(360 / REGIONAL_NETWORK_SIZE);
        
        // Some hardcoded values
        var center_x = (network_id % 2 == 0) ? 300 : 1000;
        var center_y = (network_id < 2) ? 300 : 800;

        // this.x = parseInt(center_x + radius * Math.sin(angle * (Math.pi/180)));
        // this.y: parseInt(center_y + radius * Math.cos(angle * (Math.pi/180)));
        
    }
}
