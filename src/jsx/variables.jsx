export var POSSIBLE_WEIGHTS = new Set([3, 5, 6, 7, 8, 10, 11, 15, 18, 21, 22, 23, 25]);
export var REGIONAL_NETWORKS_NUMBER = 3;
export var REGIONAL_NETWORK_SIZE = 9;
export var AVERAGE_NODE_POWER = 2.5;

export const times = n=> f=> {
    let iter = i=> {
        if (i === n) return
        f(i)
        iter(i + 1)
    }

    return iter(0)
}