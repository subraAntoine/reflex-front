"use client"
import { time } from "console";
import { useEffect, useState } from "react"
const axios = require('axios');


interface IClassementItem {
    id: string;
    nom: string;
    temps: number;
    duration: number;
}



export default function Classement () {

    const [classement, setClassement] = useState<IClassementItem[]>([]);
    const [timeFilter, setTimeFilter] = useState<number>(0);

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:4005/classement');
                const data = response.data;
                console.log(data)
                setClassement(data);
        
             
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        
        // Appeler la fonction
        getData();
    
    }, [])

    const filterByDuration = (duration: number) => {
        setTimeFilter(duration);
        console.log(timeFilter)
    }


    return(
        <div className="flex flex-col items-center justify-center gap-12">
            <div className="display flex flex-col justify-between  items-center gap-4">
                <div>
                    <h2>Temps</h2>
                </div>
                <div className="flex gap-12">

                    <button className={timeFilter === 0 ? "bg-green-800 px-4 py-1 rounded" : "bg-red-800 px-4 py-1 rounded"} onClick={() => filterByDuration(0)}>All</button>
                    <button className={timeFilter === 10000 ? "bg-green-800 px-4 py-1 rounded" : "bg-red-800 px-4 py-1 rounded"} onClick={() => filterByDuration(10000)}>10s</button>
                    <button className={timeFilter === 20000 ? "bg-green-800 px-4 py-1 rounded" : "bg-red-800 px-4 py-1 rounded"} onClick={() => filterByDuration(20000)}>20s</button>
                    <button className={timeFilter === 30000 ? "bg-green-800 px-4 py-1 rounded" : "bg-red-800 px-4 py-1 rounded"} onClick={() => filterByDuration(30000)}>30s</button>
                    <button className={timeFilter === 60000 ? "bg-green-800 px-4 py-1 rounded" : "bg-red-800 px-4 py-1 rounded"} onClick={() => filterByDuration(60000)}>1min</button>
                </div>
            </div>
            <div>
                {
                    classement.map((item: IClassementItem, index: number) => {
                        if (timeFilter === 0 || item.duration === timeFilter) {
                            return (
                                <div key={item.id} className="flex justify-between gap-12 items-center">
                                    <span>{index + 1}</span>
                                    <span>{item.nom}</span>
                                    <span className="text-center">{item.temps}</span>
                                    <span>{item.duration}ms</span>
                                </div>
                            );
                        }
                        return null; // N'affiche rien si l'élément ne correspond pas au filtre
                    })
                }

            </div>
        </div>

       
      
    )
}