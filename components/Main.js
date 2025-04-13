import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { AiOutlineLineChart } from "react-icons/ai";
import DateRangePicker from "./DateRangePicker";
import { SaladIcon } from "lucide-react";
import SalesChart from "./SalesChart";
import { useState } from 'react';
import TopCitiesGraph from "./TopCitiesGraph";
import SKUTable from "./SKUData";
import CityData from "./CityData";

const Main = () => {

    const [selected, setSelected] = useState(null);

    const items = [
        { id: 1, icon: 'images/blinkit_icon.png', text: "Blinkit" },
        { id: 2, icon: 'images/zepto_icon.png', text: "Zepto" },
        { id: 3, icon: 'images/instamart_icon.jpeg', text: "Instamart" },
      ];

    return (
        <main className="flex-1 overflow-y-auto m-4 border-1 border-gray-200 rounded-md" tabIndex={0}>
           <div className="p-2 flex flex-row items-center justify-between">
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
           <div className="p-2 flex flex-row items-center gap-2">
            {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelected(item.id)}
                        className={`flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer transition-colors ${
                            selected === item.id ? "bg-blue-100 border-blue-500" : "border-gray-300"
                        }`}
                    >
                    <img src={item.icon} alt={item.text} className="w-5 h-5 rounded-md" />
                    <p className="text-[12px]">{item.text}</p>
                    </div>
                ))}
           </div>
           <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100"> 
            <SalesChart />
            <SalesChart />
            <TopCitiesGraph />
           </div>
           <SKUTable />
           <CityData />
        </main> 
    );
}

export default Main;