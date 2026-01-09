// import { NextResponse, NextRequest } from 'next/server';
//
//
//
// export async function GET(req: NextRequest, { params: { username: string } }){
//     const username = await params;
//     try {
//         const res = await fetch(`https://api.github.com/users/${username}/repos`);
//         if(!res.ok) throw new Error("Api error");
//         const data = await res.json();
//         return NextResponse.json(data, { status: res.status });
//     } catch {
//         return NextResponse.json({ error: "API error" }, { status: res.status });
//     }
// }
//






