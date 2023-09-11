'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
    LogOut, Moon, Settings, Sun, User,
} from "lucide-react"
import Image from 'next/image';
import Link from 'next/link'

import { Input } from './ui/input';
import { useTheme } from 'next-themes';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
    const { data: session } = useSession();
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()


    const handleToggleTheme = () => {
        const switchTheme = theme === "light" ? "dark" : "light"
        setTheme(switchTheme)
    }

    return (
        <div className='rounded-xl flex items-center h-16 justify-between px-4 mb-2 sticky top-2 w-full'>
            <div className='flex gap-4 items-center'>
                <Image src={"https://img.logoipsum.com/297.svg"} alt={'placeholder logo'}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                    priority={false}
                />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/home" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === '/home'}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/products" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === '/products'}>
                                    Products
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/admin" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === '/admin'}>
                                    Admin
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className='flex items-center gap-4'>
                <span className='flex items-center'>
                    <Input className='gap-2 flex h-8 border-border' placeholder='Search products' type='search' />
                </span>

                {session ?
                    <>
                        <p className='hidden lg:block px-2 py-1.5 text-sm font-semibold text-card-foreground'>{session.user?.name}</p>
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
                                <DropdownMenuItem onClick={() => handleToggleTheme()}>
                                    {theme === "light" ?
                                        <Moon className="mr-2 h-4 w-4" />
                                        :
                                        <Sun className="mr-2 h-4 w-4" />
                                    }
                                    Toggle Theme
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
