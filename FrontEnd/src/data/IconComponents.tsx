import { HomeIcon, ShoppingCartIcon, UsersIcon, CurrencyDollarIcon, ArrowUpIcon, LockClosedIcon, EnvelopeIcon, IdentificationIcon, UserIcon, ArrowLeftStartOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Iconos utilizados en el proyecto.
export const icons: Record<string, React.ReactElement> = {
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
    search: <MagnifyingGlassIcon />
};
