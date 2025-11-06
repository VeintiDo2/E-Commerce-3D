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
    sizeClass?: string,
    buttonFunction?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const ButtonModel = ({ text, type, isSubmitButton, route, iconName, defaultColor, activeColor, sizeClass, buttonFunction }:ButtonProps) => {
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
            className={`${buttonStyles[type]} ${iconColor}`}
            type={`${isSubmitButton ? "submit" : "button"}`}
            onClick={(e) => {
                handleCheckRoute();
                handleToggleColor();
                if (typeof buttonFunction === "function") {
                    buttonFunction(e);
                }
            }}
        >
            {iconName && <span className={`${sizeClass} ${text ? "mr-2" : null}`}>{icons[iconName]}</span>}
            {text}
        </button>
    );
};

export default ButtonModel;