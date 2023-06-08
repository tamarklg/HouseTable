import React from 'react';
import axios from "axios";
import { House } from '../models/House';
import { HouseList } from './HouseList';
import { HouseForm } from './HouseForm';

const baseURL = "http://localhost:4202/api/houses";

const emptyHouse = (): House => ({
    address: '',
    currentValue: 0,
    loanAmount: 0
});

export const HouseManager = () => {
    const [houses, setHouses] = React.useState([] as House[]);

    const [shouldUpsertHouse, setShouldUpsertHouse] = React.useState(false);
    const [houseToUpsert, setHouseToUpsert] = React.useState(emptyHouse);

    React.useEffect(() => {
        axios.get(baseURL).then(response => {
            setHouses(response.data.data);
        });  
    }, []);

    const addHouse = () => {
        setShouldUpsertHouse(true);
        setHouseToUpsert(emptyHouse);
    }

    const editHouse = async (id: number) => {
        const res = await axios.get(`${baseURL}/${id}`);
        const house = res.data.data;

        setShouldUpsertHouse(true);
        setHouseToUpsert(house);
    }

    const cancel = () => {
        setShouldUpsertHouse(false);
    }

    const upsertHouse = async (houseData: House): Promise<void> => {
        if (!houseData.id) {
            const res = await axios.post(baseURL, houseData);
            const house = res.data.data;

            setHouses(houses => ([
                ...houses,
                house
            ]));
        } else {
            const res = await axios.put(`${baseURL}/${houseData.id}`, houseData);
            const house = res.data.data[1][0];

            const index = houses.findIndex(house => house.id === houseData.id);

            setHouses(houses => ([
                ...houses.slice(0, index),
                house,
                ...houses.slice(index + 1)
            ]));
        }

        setShouldUpsertHouse(false);
    }

    return (
        shouldUpsertHouse 
        ? <HouseForm house={houseToUpsert} cancel={cancel} submit={upsertHouse}/>
        : (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-bold text-lg">
                        Houses list:
                    </h1>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addHouse}
                    >
                        Add House
                    </button>
                </div>

                <HouseList houses={houses} editHouse={editHouse}/>
            </div>
        )
    )
}