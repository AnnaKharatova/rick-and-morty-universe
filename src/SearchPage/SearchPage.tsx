import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface IData {
    created: string,
    episode: string[],
    gender: string,
    id: number,
    image: string,
    location: {
        name: string,
        url: string,
    },
    name: string,
    origin: {
        name: string,
        url: string
    },
    species: string,
    status: string,
    type: string,
    url: string,
}

function SearchPage() {
    const [status, setStatus] = useState<string | null>(null)
    const [popupStatus, setPopupStatus] = useState<boolean>(false)
    const [displayedStatus, setDisplayedStatus] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState<string | null>(null)
    const [species, setSpecies] = useState<string>()
    const [popupSpecies, setPopupSpecies] = useState<boolean>(false)
    const [displayedSpecies, setDisplaySpecies] = useState<string | null>(null)
    const [filteredData, setFilteredData] = useState<IData[]>([])

    const storedStatus = localStorage.getItem('storedStatus')
    const storedSpecies = localStorage.getItem('storedSpecies')
    const storedName = localStorage.getItem('storedName')
    const storedSpeciesName = localStorage.getItem('storedSpeciesName')
    const storedStatusName = localStorage.getItem('storedStatusName')

    const searchStatus = status ? `status=${status}&` : ''
    const searchName = inputValue ? `name=${inputValue}&` : ''
    const searchSpecies = species ? `species=${species}` : ''
    const SEARCH_URL = `https://rickandmortyapi.com/api/character/?${searchName}${searchStatus}${searchSpecies}`

    useEffect(() => {
        if (storedStatus) {
            setStatus(storedStatus)
            setDisplayedStatus(storedStatusName)
        }
        if (storedSpecies) {
            setSpecies(storedSpecies)
            setDisplaySpecies(storedSpeciesName)
        }
    }, [storedStatus, storedSpecies, storedSpeciesName, storedStatusName])

    useEffect(() => {
        if (storedName) {
            setInputValue(storedName)
        }
    }, [])

    function handleStatusChange(event: any) {
        const { value, checked, name } = event.target;
        if (checked) {
            setStatus(value);
            setDisplayedStatus(name);
            localStorage.setItem('storedStatus', value)
            localStorage.setItem('storedStatusName', name)
        }
        getData()
    }

    function handleSpeciesChange(event: any) {
        const { value, checked, name } = event.target;
        if (checked) {
            setSpecies(value);
            setDisplaySpecies(name);
            localStorage.setItem('storedSpecies', value)
            localStorage.setItem('storedSpeciesName', name)
        }
    }

    useEffect(() => {
        if (inputValue) {
            localStorage.setItem('storedName', inputValue)
        }
    })

    useEffect(() => {
        if (species || status || inputValue)
            getData()
    }, [species, status, inputValue])

    function getData() {
        fetch(SEARCH_URL)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setFilteredData(fetchedData.results)
            }).catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }

    return (
        <main className="flex flex-col">
            <label className="text-2xl">Имя персонажа</label>
            <div className="border border-solid border-white rounded-xl my-5" >
                <input className=" outline-none py-1.5 px-2.5 bg-inherit " type='text' value={inputValue || ""}
                    onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <div className="relative flex gap-8">
                <div className="w-1/2">
                    <p className="text-2xl">Жив ?</p>
                    <button className="flex justify-between w-full border border-solid border-white rounded-xl px-3 py-1" onClick={() => { setPopupStatus(!popupStatus) }}>
                        <span>{displayedStatus}</span>
                        {!popupStatus ? <span>&#9660;</span> : <span>&#9650;</span>}
                    </button>
                    {popupStatus &&
                        <ul className="py-3 pl-3 mt-0 w-1/3 absolute bg-black  border border-solid border-white rounded-xl my-5" >
                            <li>
                                <input name='Да' value='alive' id='alive' type='radio' onChange={handleStatusChange} checked={status === 'alive'} />
                                <label htmlFor='alive' className='ml-3'>Да</label>
                            </li>
                            <li>
                                <input type='radio' name='Нет' value='dead' id='dead' onChange={handleStatusChange} checked={status === 'dead'} />
                                <label htmlFor='dead' className='ml-3'>Нет</label>
                            </li>
                            <li>
                                <input type='radio' name='Неизвестно' value='unknown' id='unknown' onChange={handleStatusChange} checked={status === 'unknown'} />
                                <label className='ml-3' htmlFor='unknown'>Неизвестно</label>
                            </li>
                        </ul>}
                </div>

                <div className="w-1/2">
                    <p className="text-2xl">Раса</p>
                    <button className="flex justify-between w-full border border-solid border-white rounded-xl px-3 py-1" onClick={() => setPopupSpecies(!popupSpecies)}>
                        <span>{displayedSpecies}</span>
                        {!popupSpecies ? <span>&#9660;</span> : <span>&#9650;</span>}
                    </button>

                    {popupSpecies &&
                        <ul className="py-3 pl-3 mt-0 w-1/3 absolute bg-black  border border-solid border-white rounded-xl my-5" >
                            <li>
                                <input name='Человек' value='human' id='human' type='radio' onChange={handleSpeciesChange} checked={species === 'human'} />
                                <label htmlFor='alive' className='ml-3'>Человек</label>
                            </li>
                            <li>
                                <input type='radio' name='Гуманоид' value='humanoid' id='humanoid' onChange={handleSpeciesChange} checked={species === 'humanoid'} />
                                <label htmlFor='dead' className='ml-3'>Гуманоид</label>
                            </li>
                        </ul>}
                </div>
            </div>
            <label className="text-2xl mt-8">Эпизод</label>
            <div className="border border-solid border-white rounded-xl my-5" >
                <input className=" outline-none py-1.5 px-2.5 bg-inherit " type='number' />
            </div>
            <h3 className="text-3xl">Найдено</h3>
            {filteredData && filteredData.length > 0 &&
                <ul className='gap-x-20'>
                    {filteredData.map(person => (
                        <li key={person.id} className=' flex  cursor-pointer border mb-2 border-solid border-white rounded-2xl p-2.5'>
                            <Link className=' flex justify-between w-full gap-y-20' to={(`person/${person.id}`)}>
                                <p>{person.name}</p>
                                <p>{person.status}</p>
                                <p>{person.gender}</p>
                                <p>{person.species}</p>
                                <p>{person.location.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </main >
    );
}

export default SearchPage;

