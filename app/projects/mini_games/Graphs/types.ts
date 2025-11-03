

export type Node = { 
    id: number,
    value: number | null,
    neighbours: number[] // IDs de los nodos vecinos
    x: number,
    y: number,
    status: Status,
    state: boolean,
}

type Status = 'visited' | 'visiting' | 'notVisited';

export type Graph = {
    nodes: Map<number, Node> // Mapa de ID -> Node para acceso rápido
}


