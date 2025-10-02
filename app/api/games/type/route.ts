
import { NextResponse, NextRequest } from "next/server";

export async function GET( req: NextRequest ){
    try{
        const res = await fetch('https://poetrydb.org/random/1/lines', {
            cache: "no-store",
        });
        if(!res.ok)
            return NextResponse.json({ error: "Unable to fetch data" }, { status: res.status });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
