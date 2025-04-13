import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
//import { cn } from "@/lib/utils" //Not used, so removed.

const sampleData = [
    { skuName: 'Delhi', sales: 93132.12, outOfStock: 1.68, totalInventory: 931.9, averageRank: 3.2, estTraffic: 12303, estImpressions: 25005, ci: 1.5 },
    { skuName: 'Bengaluru', sales: 8526.32, outOfStock: 6.79, totalInventory: 679, averageRank: 7, estTraffic: 3005, estImpressions: 4231, ci: 2.1 },
    { skuName: 'SKU 3', sales: 7012.72, outOfStock: 3.28, totalInventory: 328, averageRank: 4, estTraffic: 2960, estImpressions: 3657, ci: 1.8 },
    { skuName: 'SKU 4', sales: 9313, outOfStock: 1.68, totalInventory: 931.9, averageRank: 11, estTraffic: 1931.9, estImpressions: 931.9, ci: 1.5 },
];

const CityData = () => {
    const [data, setData] = useState(sampleData);
    const [sortConfig, setSortConfig] = useState(null);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const sortedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="ml-2 h-4 w-4" />;
        }
        return sortConfig.direction === 'ascending'
            ? <ArrowUp className="ml-2 h-4 w-4" />
            : <ArrowDown className="ml-2 h-4 w-4" />;
    };

    const totalRow = useMemo(() => {
        const total = {
            skuName: 'Total',
            sales: data.reduce((acc, item) => acc + item.sales, 0),
            outOfStock: data.reduce((acc, item) => acc + item.outOfStock, 0),
            totalInventory: data.reduce((acc, item) => acc + item.totalInventory, 0),
            averageRank: data.length > 0 ? data.reduce((acc, item) => acc + item.averageRank, 0) / data.length : 0,
            estTraffic: data.reduce((acc, item) => acc + item.estTraffic, 0),
            estImpressions: data.reduce((acc, item) => acc + item.estImpressions, 0),
            ci: data.length > 0 ? data.reduce((acc, item) => acc + item.ci, 0) / data.length : 0,
        };
        return total;
    }, [data]);

    const handleCheckboxChange = (index) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = new Set(prevSelectedRows);
            if (newSelectedRows.has(index)) {
                newSelectedRows.delete(index);
            } else {
                newSelectedRows.add(index);
            }
            return newSelectedRows;
        });
    };

    const isRowSelected = (index) => {
        return selectedRows.has(index);
    };

    return (
        <div className="w-full bg-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold">City level data</h2>
                    <p className="text-gray-600 text-xs">Analytics for all your Cities</p>
                </div>
                <Button className='bg-[#027056] hover:bg-[#027056]/90 text-white hover:text-white text-xs font-light' variant="outline">Filters [1]</Button>
            </div>
            <div className='bg-white shadow-md rounded-md py-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead rowSpan={2} className="border-r text-xs font-semibold">SKU Name</TableHead>
                            <TableHead colSpan={3} className="text-center border-r text-xs font-semibold">Availability</TableHead>
                            <TableHead colSpan={3} className="text-center border-r text-xs font-semibold">Visibility</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 text-xs font-semibold"
                                    onClick={() => requestSort('sales')}
                                >
                                    Sales
                                    {getSortIcon('sales')}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 text-xs font-semibold"
                                    onClick={() => requestSort('outOfStock')}
                                >
                                    Out of Stock
                                    {getSortIcon('outOfStock')}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 text-xs font-semibold"
                                    onClick={() => requestSort('totalInventory')}
                                >
                                    Total Inventory
                                    {getSortIcon('totalInventory')}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 font-normal text-xs font-semibold"
                                    onClick={() => requestSort('averageRank')}
                                >
                                    Average Rank
                                    {getSortIcon('averageRank')}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 text-xs font-semibold"
                                    onClick={() => requestSort('estTraffic')}
                                >
                                    Est. Traffic
                                    {getSortIcon('estTraffic')}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right border-r">
                                <Button
                                    variant="ghost"
                                    className="h-8 px-0 text-xs font-semibold"
                                    onClick={() => requestSort('estImpressions')}
                                >
                                    Est. Impressions
                                    {getSortIcon('estImpressions')}
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((item, index) => (
                            <TableRow key={index} className={isRowSelected(index) ? "bg-gray-100 dark:bg-gray-800" : ""}>
                                <TableCell className="text-right border-r flex items-center gap-2 text-xs">
                                    <Checkbox
                                        checked={isRowSelected(index)}
                                        onCheckedChange={() => handleCheckboxChange(index)}
                                    />
                                {item.skuName}
                                </TableCell>
                                <TableCell className="text-right border-r text-xs">{item.sales.toFixed(2)}</TableCell>
                                <TableCell className="text-right border-r text-xs">{item.outOfStock.toFixed(2)}%</TableCell>
                                <TableCell className="text-right border-r text-xs">{item.totalInventory.toFixed(2)}</TableCell>
                                <TableCell className="text-right border-r text-xs">{item.averageRank.toFixed(1)}</TableCell>
                                <TableCell className="text-right border-r text-xs">{item.estTraffic.toLocaleString()}</TableCell>
                                <TableCell className="text-right border-r text-xs">{item.estImpressions.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className="font-bold text-xs">Total</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.sales.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.outOfStock.toFixed(2)}%</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.totalInventory.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.averageRank.toFixed(1)}</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.estTraffic.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-bold border-r text-xs">{totalRow.estImpressions.toLocaleString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>     
        </div>
    );
};

export default CityData;