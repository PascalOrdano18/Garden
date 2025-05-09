export default async function CurrentMiniGame({params}: {params: {name: string}}) {
    const {name} = await params;

    
    
    return (
        <div>
            <h1>Current Mini Game</h1>
            <p>{name}</p>
        </div>
    )
}