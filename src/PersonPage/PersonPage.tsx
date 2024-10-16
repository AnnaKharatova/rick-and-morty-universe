import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface IPerson {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}

function PersonPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [person, setPerson] = useState<IPerson | null>(null)
    const SEARCH_URL = `https://rickandmortyapi.com/api/character/${id}`

    useEffect(() => {
        fetch(SEARCH_URL)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setPerson(fetchedData)
                console.log(fetchedData)

            }).catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [])

    if (!person) return
    return (
        <>
            <h2 className="text-center text-3xl">Персонаж {person.name}</h2>
            <img className="mx-auto" src={person.image} alt="изображение персонажа из сериала Рик и Морти" />
            {person.gender && <p className="text-center">Пол: {person.gender}</p>}
            {person.created && <p className="text-center">Создан: {person.created}</p>}
            {person.origin.name && <p className="text-center">Откуда пришел: {person.origin.name}</p>}
            {person.location.name && <p className="text-center">Где последний раз видели: {person.location.name}</p>}
            {person.status && <p className="text-center">Статус: {person.status}</p>}
            {person.species && <p className="text-center">Раза: {person.species}</p>}
            {person.type && <p className="text-center">Тип: {person.type}</p>}
            {person.episode && <p className="text-center">Эпизодов с его участием: {person.episode.length}</p>}
            <button className="mx-auto cursor-pointer" onClick={() => navigate('/rick-and-morty-universe/')}>Назад</button>
        </>
    );
}

export default PersonPage;
