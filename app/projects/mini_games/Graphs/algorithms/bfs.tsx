import { Node, Status } from "../types";
// deberia usar el tipo Graph directamente, despues cambiarlo

export type BFSStep = {
    status: Exclude<Status, 'notVisited'>;
    nodeId: number;
};

export default function BFS(graph: Node[], onStep?: (step: BFSStep) => void){
    
    const visited = new Set<number>();    // Set de Node IDs ya visitados (más eficiente)
    const nextNodes: number[] = [];  // array de vecinos de nodos ya visitados, en orden de visita FIFO

    // Elijo el primer nodo random, después quiero darle la posibilidad al user de elegir
    if(graph.length === 0) return;
    const firstNodeIndex = Math.floor(Math.random() * graph.length);
    const firstNode = graph[firstNodeIndex];
    if(!firstNode) return;

    nextNodes.push(firstNode.id);
    visited.add(firstNode.id); // Marcar como visitado (en la cola)
    onStep?.({ status: 'visiting', nodeId: firstNode.id });

    while(nextNodes.length > 0){
        const currentNodeId = nextNodes.shift()!;
        const currentNode = graph.find(n => n.id === currentNodeId);
        if(!currentNode) continue; // Saltar si el nodo no existe
        
        onStep?.({ status: 'visited', nodeId: currentNodeId });

        // Procesar todos los vecinos
        for(const neighbourId of currentNode.neighbours){
            // Solo agregar si no ha sido visitado y no está ya en la cola
            if(!visited.has(neighbourId)){
                visited.add(neighbourId);
                nextNodes.push(neighbourId);
                onStep?.({ status: 'visiting', nodeId: neighbourId });
            }
        }
    }
}



