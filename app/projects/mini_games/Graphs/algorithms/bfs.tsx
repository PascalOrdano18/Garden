import { Graph, Node } from "../types";
// deberia usar el tipo Graph directamente, despues cambiarlo

// Callback por paso: opcional y no modifica la lógica del BFS si no se provee
type BFSStep =
  | { type: "enqueue"; nodeId: number }
  | { type: "visit"; nodeId: number };

export default function BFS(graph: Node[], onStep?: (step: BFSStep) => void){
    
    let visited: number[] = [];    // Array de Node IDs ya visitados
    let nextNodes: number[] = [];  // array de vecinos de nodos ya visitados, en orden de visita FIFO


    const firstNodeId = Math.floor(Math.random() * graph.length);   // elijo el primer nodo random, despues quiero darle al posibilidad al user de elegir

    const firstNode = graph.find(n => n.id === firstNodeId);
    if(!firstNode) return ;
    nextNodes.push(firstNodeId);
    onStep?.({ type: "enqueue", nodeId: firstNodeId });

    while(nextNodes.length > 0){
        const currentNode = graph.find(n => n.id === nextNodes[0]);
        if(!currentNode) return ;
        currentNode.status = 'visited';
        onStep?.({ type: "visit", nodeId: currentNode.id });
        visited.push(nextNodes[0]);
        nextNodes.shift();

        

        currentNode.neighbours.map((neighbourId) => {
            nextNodes.push(neighbourId);
            const neighbourNode = graph.find(n => n.id === neighbourId);
            if(!neighbourNode) return ;
            neighbourNode.status = 'visiting';
            onStep?.({ type: "enqueue", nodeId: neighbourId });
        })
    }
}



