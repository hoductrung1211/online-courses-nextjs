
export default function Section({
    title,
    children,
}: {
    title: string,
    children: React.ReactNode
}) {


    // min-[480px]:text-sm 
    return (
        <section className={`w-full mx-auto max-w-[600px] rounded-xl shadow-md track text-xs ` }>
            <h2 className="h-12 pl-3 flex items-center border-b-2 border-gray-200 text-sm ">{title}</h2>
            <div className="p-3">
            {children}
            </div>
        </section>
    )
}