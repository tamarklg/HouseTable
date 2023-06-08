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
        axios.get(baseURL)
        .then(response => setHouses(response.data.data))
        .catch(err => console.error(err));
    }, []);

    const addHouse = () => {
        setShouldUpsertHouse(true);
        setHouseToUpsert(emptyHouse);
    }

    const editHouse = async (id: number) => {
        try {
            const res = await axios.get(`${baseURL}/${id}`);
            const house = res.data.data;

            setShouldUpsertHouse(true);
            setHouseToUpsert(house);
        } catch (err) {
            console.error(err);
        }
    }

    const cancel = () => {
        setShouldUpsertHouse(false);
    }

    const upsertHouse = async (houseData: House): Promise<void> => {
        if (!houseData.id) {
            try {
                const res = await axios.post(baseURL, houseData);
                const house = res.data.data;

                setHouses(houses => ([
                    ...houses,
                    house
                ]));
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const res = await axios.put(`${baseURL}/${houseData.id}`, houseData);
                const house = res.data.data[1][0];

                const index = houses.findIndex(house => house.id === houseData.id);

                setHouses(houses => ([
                    ...houses.slice(0, index),
                    house,
                    ...houses.slice(index + 1)
                ]));
            } catch (err) {
                console.error(err);
            }
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