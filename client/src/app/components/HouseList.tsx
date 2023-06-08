import React from 'react';
import { House } from '../models/House';

interface IHouseListProps {
    houses: House[];
    editHouse: (id: number) => void;
}

export const HouseList = ({
    houses,
    editHouse
}: IHouseListProps) => (
    <div 
        className="house-list overflow-y-auto"
        style={{maxHeight: "850px"}}
    >
        {
            houses.map(house => (
                <div
                    key={house.id}
                    className="border border-gray-300 rounded-md p-4 my-4 cursor-pointer"
                    onClick={() => editHouse(house.id as number)}
                >
                    <div className="font-bold">House #{house.id}</div>
                    <div>Address: {house.address}</div>
                    <div>Value: {house.currentValue}</div>
                    <div>Loan amout: {house.loanAmount}</div>
                    <div>Risk: {house.risk}</div>
                </div>
            )
        )}
    </div>
);
