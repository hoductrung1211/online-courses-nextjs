export default function SettingsPopup({
    handleTurnOffPopup,
    children,
}: {
    handleTurnOffPopup: () => void,
    children: React.ReactNode,
}) {
    return (
        <section 
            className="w-full max-w-[28rem] max-h-[48rem] flex flex-col bg-gray-50 rounded-lg overflow-hidden"
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
            <main className="h-full py-3 px-5">
                {children}
            </main>
        </section>
    )
}

export function SettingsForm({
    settings,
}: {
    settings: {[key: string]: number | string},
}) {
    return (
        <form className="flex flex-col gap-5">
            <Field text="Player A name:">
                <Input />
            </Field>
            <Field text="Player B name:">
                <Input />
            </Field>
            <Field text="Player A mark:">
                <ListSelection 
                    list={['🌠','💛','🌕','🟨','⭐','🌟']} 
                    type="icon"
                />
            </Field>
            <Field text="Player B mark:">
                <ListSelection 
                    list={['❤️','💖','🔴','⭕','❌','🟥']}
                    type="icon"
                />
            </Field>
            <Field text="Game type:">
                <ListSelection 
                    list={['3 x 3', '4 x 4', '5 x 5']}
                    type="text"
                />
            </Field>
            <button className="mt-2 h-10 font-semibold text-white bg-blue-400 rounded-md hover:bg-opacity-90 transition">
                Save
            </button>
        </form>
    )
}

function Field({
    text,
    children
}: {
    text: string,
    children: React.ReactNode,
}) {
    return (
        <label className="flex flex-col min-[480px]:flex-row items-center justify-between">
            <span className="">{text}</span>
            {children}
        </label>
    )
}

function Input({
     
}) {
    return (
        <input 
            className="h-8 rounded-md"
        />
    )
}

function ListSelection({
    list,
    type,
}: {
    list: string[],
    type: 'icon' | 'text'
}) {
    
    let itemClassName = "h-8 grid place-items-center rounded-sm cursor-pointer hover:bg-gray-200 ";
    if (type == "icon")
        itemClassName += " w-8 text-2xl  ";
    else itemClassName += " px-2"

    return (
        <ul className="flex items-center gap-3">
        {
            list.map(mark => 
                <li key={mark}
                    className={itemClassName}
                >
                    {mark}
                </li>
            )
        }
        </ul>
    )
}