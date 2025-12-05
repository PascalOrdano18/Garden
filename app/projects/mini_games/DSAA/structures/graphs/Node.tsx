

export class Node{
    id: number;
    value: number;
    x: number;
    y: number;

    constructor(id: number, value: number){
        this.id = id;
        this.value = value;
        this.x = 100;
        this.y = 100;
    }

    draw(){
        return (
            <g>
              <circle
                cx={this.x}
                cy={this.y}
                r={20}
                fill="lightblue"
                stroke="black"
                strokeWidth={2}
              />
              <text
                x={this.x}
                y={this.y + 5}
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {this.value}
              </text>
            </g>        
        )
    }
}
