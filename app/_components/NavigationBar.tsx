'use client'
import React, { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from "@/_components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
    LogOut, Moon, Settings, Sun, User, Menu, PackageSearch, Lock
} from "lucide-react"
import Image from 'next/image';
import Link from 'next/link'

import { Input } from './ui/input';
import { useTheme } from 'next-themes';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { usePathname, useRouter } from 'next/navigation';
import useAuthModal from '../_hooks/useAuthModal';
import { useUser } from '../_hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function NavigationBar({ ...props }) {
    const authModal = useAuthModal()
    const pathname = usePathname()
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()

    const routes = useMemo(() => [
        {
            label: "Home",
            active: pathname === '/home',
            href: '/home'
        },
        {
            label: "Products",
            active: pathname === '/products',
            href: '/products'
        },
        {
            label: "Admin",
            active: pathname === '/admin',
            href: '/admin'
        },
    ], [pathname])

    const handleToggleTheme = () => {
        const switchTheme = theme === "light" ? "dark" : "light"
        setTheme(switchTheme)
    }

    const handleLogOut = async () => {
        const { error } = await supabaseClient.auth.signOut()
        router.refresh()
        console.log(error)
    }

    return (
        <div className='flex items-center shadow rounded-b-md h-20 justify-between w-full max-w-7xl px-4 relative top-0 bg-background'>
            <div className='flex gap-4 items-center'>
                <Image src={"https://img.logoipsum.com/297.svg"} alt={'placeholder logo'}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-3/4 md:w-full h-auto"
                    priority={false}
                />
                <NavigationMenu className='z-0'>
                    <NavigationMenuList className='hidden md:flex'>
                        {routes.map((item, index) =>
                            <NavigationMenuItem key={index}>
                                <Link href={item.href} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()} active={item.active}>
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className='flex items-center gap-4'>
                <span className='flex items-center'>
                    <Input className='gap-2 flex h-8 border-border' placeholder='Search products' type='search' />
                </span>
                <div onClick={() => handleToggleTheme()} className='hover:cursor-pointer shadow p-2 rounded-sm border-border hover:bg-secondary'>
                    {theme === "light" ?
                        <Moon className="h-5 w-5" size={26} />
                        :
                        <Sun className="h-5 w-5" size={26} />
                    }
                </div>
                {!user ?
                    <p onClick={authModal.onOpen} className="px-2 py-1.5 text-sm font-semibold text-card-foreground hover:cursor-pointer">Login</p>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center space gap-x-4'>
                            <p className='hidden lg:block px-2 py-1.5 text-sm font-semibold text-card-foreground'>{user?.user_metadata.name}</p>
                            <Avatar>
                                <AvatarImage src={user?.user_metadata.avatar_url} alt="@shadcn" />
                                <AvatarFallback>BB</AvatarFallback>
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
                                <span onClick={() => handleLogOut()}>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }


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