export default class Connection {
    constructor(weight, source = null, target = null, network_id = -1, dashes = Boolean(Math.round(Math.random()))) {
        this.weight = weight;
        this.from = source;  // ID of source node
        this.to = target;   // ID of target node
        this.network_id = network_id;
        this.label = weight;
        this.dashes = dashes;
    }
}
