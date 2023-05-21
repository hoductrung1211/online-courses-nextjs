import { useState } from 'react';
import {markOList, markXList, nList} from './page';

export default function SettingsPopup({
    handleTurnOffPopup,
    children,
}: {
    handleTurnOffPopup: () => void,
    children: React.ReactNode,
}) {
    return (
        <section 
            className="mx-2 w-full max-w-[28rem] max-h-[48rem] flex flex-col bg-gray-50 rounded-lg text-sm overflow-hidden"
            onClick={(e) => {
                e.stopPropagation();                
            }}
        >
            <header className="w-full h-12 px-3 flex items-center justify-between font-semibold bg-slate-200 border-b-2 border-gray-100">
                Settings
                <button className="w-8 aspect-square grid place-items-center rounded-md hover:bg-gray-50 text-center text-xl"
                    onClick={handleTurnOffPopup}
                >✖️</button>
            </header>
            <main className="h-full p-5">
                {children}
            </main>
        </section>
    )
}

export function SettingsForm({
    settings,
    handleUpdatingSettings
}: {
    settings: {
        playerOName: string,
        playerXName: string,
        playerOMarkId: number,
        playerXMarkId: number,
        nId: number,
    },
    handleUpdatingSettings: (settings: {playerOName: string,
        playerXName: string,
        playerOMarkId: number,
        playerXMarkId: number,
        nId: number,}) => void,
}) {
    const [changedSetttings, setChangedSettings] = useState(settings);

    function handleChange(key: string, value: number | string) {
        setChangedSettings({
            ...changedSetttings,
            [key]: value,
        })
    }

    return (
        <form className="flex flex-col gap-5 font-mono">
            <Field text="Player O name:">
                <Input 
                    value={changedSetttings.playerOName}
                    handleChangeInput={value => handleChange("playerOName", value)}
                />
            </Field>
            <Field text="Player X name:">
                <Input
                    value={changedSetttings.playerXName}
                    handleChangeInput={value => handleChange("playerXName", value)}
                />
            </Field>
            <Field text="Player O mark:">
                <ListSelection 
                    list={markOList}
                    seletectedId={changedSetttings.playerOMarkId}
                    handleChangeSelection={value => handleChange("playerOMarkId", value)}
                    type="icon"
                />
            </Field>
            <Field text="Player X mark:">
                <ListSelection 
                    list={markXList}
                    seletectedId={changedSetttings.playerXMarkId}
                    handleChangeSelection={value => handleChange("playerXMarkId", value)}
                    type="icon"
                />
            </Field>
            <Field text="Game type:">
                <ListSelection 
                    list={nList}
                    seletectedId={changedSetttings.nId}
                    handleChangeSelection={value => handleChange("nId", value)}
                    type="text"
                />
            </Field>
            <button 
                className="mt-5 h-10 font-semibold text-white bg-blue-400 rounded-md hover:bg-opacity-90 transition"
                onClick={(e) => {
                    e.preventDefault();
                    handleUpdatingSettings(changedSetttings);
                }}
            >
                Save
            </button>
        </form>
    )
}

export function Field({
    text,
    children
}: {
    text: string,
    children: React.ReactNode,
}) {
    return (
        <label className="flex flex-col min-[480px]:flex-row items-center justify-between text-sm">
            <span className="">{text}</span>
            {children}
        </label>
    )
}

function Input({
    value,
    handleChangeInput,
}: {
    value: string,
    handleChangeInput: (value: string) => void,
}) {
    return (
        <input 
            className="min-w-[16rem] h-8 rounded-md"
            value={value}
            onChange={e => handleChangeInput(e.target.value)}
        />
    )
}

function ListSelection({
    list,
    type,
    seletectedId,
    handleChangeSelection
}: {
    list: {id: number, mark: string}[],
    type: 'icon' | 'text',
    seletectedId: number,
    handleChangeSelection: (value: number) => void,
}) {
    
    let itemClassName = "h-8 grid place-items-center rounded-sm cursor-pointer ";
    if (type == "icon")
        itemClassName += " w-8 text-2xl  ";
    else itemClassName += " px-2 "


    return (
        <ul className="flex items-center gap-3">
        {
            list.map(item => 
                <li key={item.id}
                    className={itemClassName + (item.id === seletectedId ? ' bg-blue-200' : ' hover:bg-gray-200 ')}
                    onClick={() => {
                        handleChangeSelection(item.id)
                    }}
                >
                    {item.mark}
                </li>
            )
        }
        </ul>
    )
}