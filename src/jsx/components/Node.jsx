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
        this.color = (() => {
          switch (network_id) {
            case 0: return "rgb(172,222,133)";
            case 1: return "rgb(130,170,253)";
            case 2: return "rgb(255,203,107)";
            default: return;
          }
        })();

        var radius = 200;

        var angle = (id - REGIONAL_NETWORK_SIZE * network_id) * parseInt(360 / REGIONAL_NETWORK_SIZE);
        
        // Some hardcoded values
        var center_x = (network_id % 2 == 0) ? 300 : 1000;
        var center_y = (network_id < 2) ? 300 : 800;
        
        if (network_id == 2) {
          center_x += 350;
        }

        this.x = center_x + radius * Math.sin(angle * (Math.PI/180));
        this.y = center_y + radius * Math.cos(angle * (Math.PI/180));
    }
}
