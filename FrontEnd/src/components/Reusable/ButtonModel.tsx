import { useNavigate } from 'react-router-dom';
import { buttonStyles } from '../../data/ButtonStyles';
import { icons } from '../../data/IconComponents';
import React, { useState } from 'react';

type ButtonProps = {
    text?: string,
    type: keyof typeof buttonStyles,
    isSubmitButton?: boolean,
    route?: string,
    iconName?: keyof typeof icons,
    defaultColor?: string,
    activeColor?: string,
    showText?: boolean
    buttonFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonModel = ({ text, type, isSubmitButton, route, iconName, defaultColor, activeColor, showText, buttonFunction }: ButtonProps) => {
    const navigate = useNavigate();
    const [iconColor, setIconColor] = useState(defaultColor);
    const [active, setActive] = useState(false);

    const handleCheckRoute = () => {
        if (route) navigate(route);
    };

    const handleToggleColor = () => {
        if (iconName === "star") {
            setActive(!active);
            setIconColor(active ? defaultColor : activeColor);
        }
    };

    return (
        <button
            className={`${buttonStyles[type]} ${iconColor} flex items-center gap-2`}
            type={isSubmitButton ? "submit" : "button"}
            onClick={(e) => {
                handleCheckRoute();
                handleToggleColor();
                if (typeof buttonFunction === "function") buttonFunction(e);
            }}
        >
            {iconName && (
                <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                    {icons[iconName]}
                </span>
            )}

            {/* Texto oculto en pantallas pequeñas para hacerlo responsive */}
            {text && (
                <span className={`${showText ? "inline" : "hidden"} sm:inline text-sm md:text-base lg:text-lg`}>
                    {text}
                </span>
            )}
        </button>


    );
};

export default ButtonModel;