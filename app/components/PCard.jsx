import Image from "next/image";

export default function PCard( {projectTitle, imageSource, imageAlt} ){

    return(
        <>
            <div className="transition-all rounded-lg w-full bg-slate-800 flex flex-col items-center justify-center mx-auto py-10 hover:cursor-pointer">
                <h1 className="text-2xl">{projectTitle}</h1>  
                <Image 
                    className="w-full rounded-lg border mt-5"
                    src={imageSource}
                    alt={imageAlt}
                    width={350}
                    height={350}
                />
            </div>
        </>
    );

}