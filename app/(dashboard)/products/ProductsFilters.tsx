'use client'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icon, Label, SelectIcon } from '@radix-ui/react-select'
import { Ampersand, ChevronLeft, ChevronRight, Divide, Minus, Search, Slash, Star } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'

const reviews_array = Array.from({ length: 10 }, (_, i) => i + 1)
const comments_array = [10, 25, 50, 100, 250, 500, 1000]

function ProductsFilters() {
    const [selectedDate, setSelectedDate] = useState(0)
    const [lowestStar, setLowestStar] = useState(1)
    const [highestStar, setHighestStar] = useState(10)
    const [commentsDiff, setCommentsDiff] = useState<"over" | "under">('over')
    const [commentsNumber, setCommentsNumber] = useState(10)
    const [productsOrder, setProductsOrder] = useState<"asc" | "desc">('asc')

    const handleDateValueFilter = (value: string) => {
        const values: Record<string, number> = {
            'last_hour': 1,
            'last_day': 24,
            'last_7days': 168,
            'last_30days': 720,
            'anytime': 0,
        }

        const selectedDate = values[value]
        setSelectedDate(selectedDate)
    }

    useEffect(() => {
        if (lowestStar > highestStar) setHighestStar(lowestStar)
    }, [highestStar, lowestStar])

    const handleCommentsNumber = (value: string) => {
        setCommentsNumber(Number(value))
    }

    return (
        <div className='gap-4 xl:border-2 border-border bg-background justify-start rounded-md flex flex-col items-start px-2 py-4 w-full font-medium'>
            <div className='flex items-center'>
                <p className='text-sm ml-2 mr-4 font-semibold'>From</p>
                <Select onValueChange={(value) => handleDateValueFilter(value)}>
                    <SelectTrigger className="w-32 h-8" icon={null}>
                        <SelectValue placeholder="Anytime" className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last_hour">Last hour</SelectItem>
                        <SelectItem value="last_day">Last day</SelectItem>
                        <SelectItem value="last_7days">Last 7 days</SelectItem>
                        <SelectItem value="last_30days">Last 30 days</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Separator orientation='horizontal' decorative />
            <div className='flex items-center'>
                <p className='text-sm ml-2 mr-4 font-semibold'>Stars</p>
                <Select onValueChange={(value) => setLowestStar(Number(value))} value={lowestStar.toString()}>
                    <SelectTrigger className="w-16 h-8 flex" icon={<Star size={20} strokeWidth={1.25} className='pl-1' />}>
                        <SelectValue placeholder={lowestStar} className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        {reviews_array.map((value, index) => {
                            return <SelectItem key={index} value={`${value}`}>{value}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
                <Ampersand size={16} className='opacity-80 mx-2' />
                <Select onValueChange={(value) => setHighestStar(Number(value))} value={highestStar.toString()}>
                    <SelectTrigger className="w-16 h-8 flex" icon={<Star size={20} strokeWidth={1.25} className='pl-1' />}>
                        <SelectValue placeholder={highestStar} className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        {reviews_array.map((value, index) => {
                            if (value < lowestStar) return;
                            return <SelectItem key={index} value={`${value}`}>{value}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <Separator orientation='horizontal' decorative />
            <div className='flex items-center'>
                <p className='text-sm ml-2 mr-4 font-semibold'>Comments</p>
                <Select onValueChange={(value: "over" | "under") => setCommentsDiff(value)} value={commentsDiff}>
                    <SelectTrigger className="w-16 h-8 flex">
                        <SelectValue placeholder={commentsDiff} className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="under">Under</SelectItem>
                        <SelectItem value="over">Over</SelectItem>
                    </SelectContent>
                </Select>
                {commentsDiff === "over" && <ChevronRight size={20} strokeWidth={1.25} />}
                {commentsDiff === "under" && <ChevronLeft size={20} strokeWidth={1.25} />}
                <Select onValueChange={(value) => handleCommentsNumber(value)} value={commentsNumber.toString()}>
                    <SelectTrigger className="w-16 h-8 flex">
                        <SelectValue placeholder={commentsNumber} className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        {comments_array.map((value, index) => {
                            return <SelectItem key={index} value={`${value}`}>{value}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

            </div>
            <Separator orientation='horizontal' decorative />
            <div className='flex items-center'>
                <p className='text-sm ml-2 mr-4 font-semibold'>Order</p>
                <Select onValueChange={(value) => handleDateValueFilter(value)}>
                    <SelectTrigger className="w-32 h-8" icon={null}>
                        <SelectValue placeholder={productsOrder === "asc" ? "Ascending" : "Descending"} className='h-6' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="desc">Descending</SelectItem>
                        <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Separator orientation='horizontal' decorative />
            <div className='flex items-center w-full justify-end pr-2'>
                <Button variant="outline" size="icon" className='border-none flex w-28 px-4 gap-3 flex-row bg-secondary hover:bg-secondary-foreground hover:text-background'>
                    <p className='font-bold'>Search</p>
                    <Search size={22} className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

export default ProductsFilters