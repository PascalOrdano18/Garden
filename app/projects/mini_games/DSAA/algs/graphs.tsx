

import { Graph } from '../structures/graphs/Graph';
import { Node } from '../structures/graphs/Node';
export default function Graphs(){
    const g = new Graph();

    g.addNode(new Node(1, 10, 100, 100));
    g.addNode(new Node(2, 20, 300, 200));
    g.addNode(new Node(3, 30, 200, 400));

    g.addEdge(1, 2);
    g.addEdge(2, 3);
    g.addEdge(1, 3);    

    return g.draw();
}
