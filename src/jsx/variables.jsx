export var POSSIBLE_WEIGHTS = [3, 5, 6, 7, 8, 10, 11, 15, 18, 21, 22, 23, 25];
export var REGIONAL_NETWORKS_NUMBER = 3;
export var REGIONAL_NETWORK_SIZE = 10;
export var AVERAGE_NODE_POWER = 2.5;

export const times = n=> f=> {
    let iter = i=> {
        if (i === n) return;
        f(i);
        iter(i + 1);
    }

    return iter(0);
}

export const random = (min = 0, max = 1) => {
	return Math.floor(Math.random() * max) + min;
}