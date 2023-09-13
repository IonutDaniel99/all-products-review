'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Cake, LogOut, Medal, Menu, PackageSearch, Settings, Star, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

function UserComponent() {
    const { data: session } = useSession();

    return (
        <div className='flex items-center flex-col border-2 rounded-2xl p-8 fixed'>
            <span className='py-2 '>
                <Avatar className='h-40 w-40'>
                    <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </span>
            <span className='flex flex-col items-center relative top-4'>
                <p className='font-bold text-card-foreground text-2xl'>{session?.user?.name}</p>
                <h6 className='font-bold text-card-foreground text-base opacity-80'>Operator</h6>
            </span>
            <div className='flex flex-col lg:flex-row gap-4 w-full items-center justify-between top-12 relative'>
                <div className='flex flex-col w-16 items-center'>
                    <span className='flex items-center justify-center gap-2 pb-2'>
                        <p className='text-card-foreground truncate text-sm font-semibold'>5</p>
                        <Medal size={20} />
                    </span>
                    <p className='text-card-foreground truncate text-xs font-medium'>Years with us</p>
                </div>
                <div className='flex flex-col w-16 items-center'>
                    <span className='flex items-center justify-center gap-2 pb-2'>
                        <p className='text-card-foreground truncate text-sm font-semibold'>560</p>
                        <PackageSearch size={20} />
                    </span>
                    <p className='text-card-foreground truncate text-xs font-medium'>Total Reviews</p>
                </div>
                <div className='flex flex-col w-16 items-center'>
                    <span className='flex items-center justify-center gap-2 pb-2'>
                        <p className='text-card-foreground truncate text-sm font-semibold'>4.6 / 10</p>
                        <Star size={20} />
                    </span>
                    <p className='text-card-foreground truncate text-xs font-medium'>Reviews</p>
                </div>
            </div>
            <div className='w-full flex justify-end h-40 items-end'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='h-10 w-10 bg-input rounded-full flex items-center justify-center'>
                            <Menu className='text-card-foreground' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56' side='bottom' align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Toggle Theme
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default UserComponent