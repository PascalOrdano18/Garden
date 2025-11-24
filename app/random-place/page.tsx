'use client';

import {useEffect} from 'react';

const NASA_API_URL = 'https://epic.gsfc.nasa.gov/api/';
const now = new Date();
now.setDate(now.getDate() - 1);
const YYYY = now.getFullYear();
const MM = String(now.getMonth() + 1).padStart(2, "0");
const DD = String(now.getDate()).padStart(2, "0");

export default function RandomPlace(){

    useEffect(() => {
        fetchNasa();
    });

    const fetchNasa = async () => {
        const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;

        const res = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`);

        if (!res.ok) {
            console.error("Error:", res.status);
            return;
        }

        const data = await res.json();

        const last = data[data.length - 1];
        console.log("Último objeto EPIC:", last);

        const [year, month, day] = last.date.split(" ")[0].split("-");
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${last.image}.png`;

        console.log("URL final:", imageUrl);
    }


    return(
        <div>
            <h1>wow you got here</h1>
        </div>
    );
}
