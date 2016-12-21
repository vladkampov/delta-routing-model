export default class Connection {
    constructor(weight, source = null, target = null, network_id = -1, _type = 'duplex') {
        this._weight = weight;
        this.type = _type;      // 1 is duplex, 1.5 is half-duplex
        this.source = source;  // ID of source node
        this.target = target; // ID of target node
        this.network_id = network_id;
    }
}
