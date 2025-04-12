import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AiOutlineLineChart } from "react-icons/ai";
import DateRangePicker from "./DateRangePicker";

const Main = () => {
    return (
        <main className="flex-1 overflow-y-auto m-4 border-1 border-gray-200 rounded-md" tabIndex={0}>
           <div className="p-4 flex flex-row items-center justify-between">
               <p className="texl-sm">Quick Commerce</p>
               <div className='flex flex-row gap-2'>
                <div className="flex items-center space-x-2 p-2 rounded-md border-1 border-gray-200">
                    <AiOutlineLineChart />
                    <Switch />
                </div>
                <DateRangePicker />
               </div>
           </div>
           <Separator />
        </main> 
    );
}

export default Main;