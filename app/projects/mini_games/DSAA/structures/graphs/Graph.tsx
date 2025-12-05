
import Node from "./Node";

class Graph{
    nodesAmount: number;
    adjacency: Map<number, number[]>;
    nodes: Map<number, Node>;

    constructor(){
        this.nodesAmount = 0;
        this.adjacency = new Map();
        this.nodes = new Map();
    }

    addNode(node: Node){
       this.nodes.set(node.id, node);
       this.adjacency.set(node.id, [])
    }

    addEdge(nodeId1: number, nodeId2: number){
        this.adjacency.get(nodeId1)?.push(nodeId2);
        this.adjacency.get(nodeId2)?.push(nodeId1);
    }


    draw(){
        return (
            <svg width={600} height={600}>
                {
                    this.adjacency.
                } 
            </svg>
        )
    }
}




