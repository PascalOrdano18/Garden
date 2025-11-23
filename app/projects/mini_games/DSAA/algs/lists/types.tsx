

export type NodeType = {
    prev?: NodeType;
    next?: NodeType;
    value: number;
    id: number;
};


export function Node(){
    return (

        <div>
            <h1>Node</h1>
        </div>

    );
}
