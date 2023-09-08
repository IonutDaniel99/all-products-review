'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
    LogOut, Moon, Settings, User, SearchIcon,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, } from './ui/tabs';
import Image from 'next/image';


import {
    Command,
    CommandInput,
} from "@/components/ui/command"
import { Button } from './ui/button';
import { MenubarShortcut } from './ui/menubar';
import { Input } from './ui/input';

export default function NavigationBar() {
    const { data: session } = useSession();
    return (
        <div className='rounded-xl flex items-center h-16 justify-between px-4 mb-2 sticky top-2 w-full'>
            <div className='flex gap-4 items-center'>
                {/* Logo */}
                <Image src={"https://img.logoipsum.com/297.svg"} alt={'placeholder logo'} width={164} height={20} />
                {/* Items */}
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="home">Home</TabsTrigger>
                        <TabsTrigger value="latest_products">
                            Latest Products
                        </TabsTrigger>
                        <TabsTrigger value="notifications" disabled>
                            Admin
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className='flex items-center gap-4'>
                <span className='flex items-center'>
                    <Input className='gap-2 flex h-8' placeholder='Search products' />
                </span>

                {session ?
                    <>
                        <p className='px-2 py-1.5 text-sm font-semibold'>{session.user?.name}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={`${session.user?.image}`} alt="@shadcn" />
                                    <AvatarFallback>{session.user?.name}</AvatarFallback>
                                </Avatar>
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
                                    <Moon className="mr-2 h-4 w-4" />
                                    <span>Dark Mode</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span onClick={() => signOut()}>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </> : <>
                        <button onClick={() => signIn()} className='px-2 py-1.5 text-sm font-semibold'>Sign in</button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </>
                }
            </div>
        </div>
    )
}
