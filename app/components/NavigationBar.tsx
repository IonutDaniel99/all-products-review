'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
    LogOut, Moon, Settings, Sun, User, Menu, PackageSearch, Lock
} from "lucide-react"
import Image from 'next/image';
import Link from 'next/link'

import { Input } from './ui/input';
import { useTheme } from 'next-themes';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { usePathname } from 'next/navigation';

export default function NavigationBar({ ...props }) {
    const { data: session } = useSession();
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    const handleToggleTheme = () => {
        const switchTheme = theme === "light" ? "dark" : "light"
        setTheme(switchTheme)
    }

    return (
        <div className='flex items-center h-16 justify-between w-full max-w-7xl px-4 fixed top-0 bg-background z-50'>
            <div className='flex gap-4 items-center'>
                <Image src={"https://img.logoipsum.com/297.svg"} alt={'placeholder logo'}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-3/4 md:w-full h-auto"
                    priority={false}
                />
                <NavigationMenu>
                    <NavigationMenuList className='hidden md:flex'>
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

                <p className='hidden lg:block px-2 py-1.5 text-sm font-semibold text-card-foreground'>{session?.user?.name}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
                            <Menu className='text-card-foreground ' />
                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56' side='bottom' align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <div className='flex flex-col md:hidden'>
                                <DropdownMenuSeparator />
                                <CustomLinkItem pathname={pathname} title='Home' url='/home' icon={<User className="mr-2 h-4 w-4" />} />
                                <CustomLinkItem pathname={pathname} title='Products' url='/products' icon={<PackageSearch className="mr-2 h-4 w-4" />} />
                                <CustomLinkItem pathname={pathname} title='Admin' url='/admin' icon={<Lock className="mr-2 h-4 w-4" />} disabled />
                            </div>
                        </DropdownMenuGroup>
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
            </div>
        </div>
    )
}



const CustomLinkItem = ({ url, pathname, title, disabled, icon }: {
    url: string,
    pathname: string,
    title: string,
    disabled?: boolean
    icon: JSX.Element,
}) => {
    return <DropdownMenuItem disabled={disabled}>
        <Link href={url} passHref className='flex items-center'>
            {icon}
            <span style={{
                fontWeight: pathname === url ? "bold" : "initial"
            }}>{title}</span>
        </Link>
    </DropdownMenuItem>
}