import { NextResponse } from 'next/server';

const NASA_API_URL = "https://api.nasa.gov/planetary/apod";

export async function GET(){
     const apiKey = process.env.NASA_API_KEY;

    try {
        const res = await fetch(`${NASA_API_URL}?api_key=${apiKey}`, {
            next: {revalidate: 60 * 60},
        });

        if(!res.ok) {
            return NextResponse.json({ error: "failed to fetch" },{ status: 500 });
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({ error: error }, { status: 500 });
    }
}


