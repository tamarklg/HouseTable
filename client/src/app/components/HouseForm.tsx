import React from 'react';
import { House } from '../models/House';

interface IHouseFormProps {
    house: House;
    submit: (house: House) => void;
    cancel: () => void;
}

export const HouseForm = ({
    house,
    submit,
    cancel,
}: IHouseFormProps) => {
    const [houseState, setHouseState] = React.useState(house);
    const [isValid, setIsValid] = React.useState(() => isFormValid(houseState));

    function updateHouse (key: string, value: string | number): void {
        const updatedHouse = {
            ...houseState, 
            [key]: value
        }

        setHouseState(updatedHouse);
        setIsValid(isFormValid(updatedHouse));
    }

    function isFormValid (house: House): boolean {
        const requiredFields: (keyof House)[] = ["address", "currentValue", "loanAmount"];
        const hasRequiredFeilds = requiredFields.every(field => !!house[field]);

        const numberFileds: (keyof House)[] = ["currentValue", "loanAmount"];
        const numberFieldsArevaild = numberFileds.every(field => house[field] as number > 0);

        return hasRequiredFeilds && numberFieldsArevaild;
    }

    function onSubmit (e: any): void {
        submit(houseState);
        e.preventDefault();
    }

    return (
        <form
            onSubmit={e => onSubmit(e)}
            className="border border-gray-300 rounded-md p-4"
            style={{ margin: "calc(50% - 175px) auto" }}
        >
            <div className="mb-4">
                <label htmlFor="address" className="block font-bold mb-2">
                    Address
                </label>

                <input
                    type="text"
                    id="address"
                    value={houseState.address}
                    onChange={e => updateHouse('address', e.target.value)}
                    className="border border-gray-400 p-2 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block font-bold mb-2">
                    Value
                </label>
                
                <input
                    type="number"
                    id="currentValue"
                    value={houseState.currentValue}
                    onChange={e => updateHouse('currentValue', e.target.value)}
                    className="border border-gray-400 p-2 rounded-md w-full"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block font-bold mb-2">
                    Loan amount
                </label>
                
                <input
                    type="number"
                    id="loanAmount"
                    value={houseState.loanAmount}
                    onChange={e => updateHouse('loanAmount', e.target.value)}
                    className="border border-gray-400 p-2 rounded-md w-full"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={cancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 mr-4 px-4 rounded"
                >
                    Cancel
                </button>
                
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
                    disabled={!isValid}
                >
                    {house.id ? "Edit" : "Add"} House
                </button>
            </div>
        </form>
    )
}