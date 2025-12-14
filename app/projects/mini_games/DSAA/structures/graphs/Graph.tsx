
import { Node } from "./Node";

export class Graph{
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
                    [...this.adjacency.entries()].map(([fromId, neighbors]) => {
                        const fromNode = this.nodes.get(fromId);
                        if(!fromNode) return null;
                        
                        return neighbors.map((toId) => {
                            const toNode = this.nodes.get(toId);
                            if(!toNode) return null;
                            return(
                                <line 
                                    key={`${fromId} - ${toId}`}
                                    x1={fromNode.x}
                                    y1={fromNode.y}
                                    x2={toNode.x}
                                    y2={toNode.y}
                                    stroke="black"
                                /> 
                            );
                        })
                        
                    })
                } 
                {[...this.nodes.values()].map((node) => node.draw())}
            </svg>
        )
    }
}




