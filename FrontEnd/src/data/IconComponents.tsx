import {
    HomeIcon, ShoppingCartIcon, UsersIcon, CurrencyDollarIcon, ArrowUpIcon, LockClosedIcon,
    EnvelopeIcon, IdentificationIcon, UserIcon, ArrowLeftStartOnRectangleIcon, MagnifyingGlassIcon,
    Bars3Icon, ChevronLeftIcon, ChevronRightIcon, RocketLaunchIcon, CubeIcon, XMarkIcon, CubeTransparentIcon
} from '@heroicons/react/24/outline';
import { StarIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

// Iconos utilizados en el proyecto.
export const icons = {
    home: <HomeIcon />,
    us: <UsersIcon />,
    cart: <ShoppingCartIcon />,
    star: <StarIcon />,
    dollar: <CurrencyDollarIcon />,
    arrowUp: <ArrowUpIcon />,
    lock: <LockClosedIcon />,
    email: <EnvelopeIcon />,
    id: <IdentificationIcon />,
    user: <UserIcon />,
    close: <ArrowLeftStartOnRectangleIcon />,
    search: <MagnifyingGlassIcon />,
    menu: <Bars3Icon />,
    settings: < Cog6ToothIcon />,
    arrowLeft: <ChevronLeftIcon />,
    arrowRight: <ChevronRightIcon />,
    rocket: <RocketLaunchIcon />,
    cube: <CubeIcon />,
    xMark: <XMarkIcon />,
    cubeTransparent: <CubeTransparentIcon />
} as const;
