export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col  justify-center h-full ml-4 font-medium text-2xl text-gray-500">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center font-semibold text-xl h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex  flex-col justify-center h-full text-xl font-semibold">U</div>
            </div>
        </div>
    </div>
}