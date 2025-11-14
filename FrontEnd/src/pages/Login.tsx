import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/ContexUser.tsx";
import InputModel from '../components/Reusable/InputModel.tsx';
import ButtonModel from '../components/Reusable/ButtonModel.tsx';
import type React from 'react';

type RegisterProps = {
    name: string;
    username: string;
    email: string;
    password: string;
}

type LoginProps = {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    document.title = "UltraTec - Login and Register";
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [userData, setUserData] = useState<LoginProps>({
        username: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState<RegisterProps>({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    // Validar formato de email
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    //Confirmar inicio de sesión del usuario.
    const checkLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", userData)
            if (response.data.success) {
                console.table(response.data.user)
                setUser(response.data.user);
                navigate("/");
            }
        } catch (error) {
            console.error("Error al iniciar Sesión", error);
        }
    }

    //Confirmar registro del usuario.
    const checkRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateEmail(registerData.email) ? console.log("Email válido") : console.warn("Email inválido");

        try {
            const response = await axios.post("http://localhost:5000/api/users/", registerData);
            const message = response.data.message;
            console.log(message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.warn("Registro fallido:", error.response?.data?.message);
            } else if (error instanceof Error){
                console.error("Error de red o del cliente:", error.message);
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(event.target.value)
    };

    const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value
        });
        console.log(event.target.value);
    };
    
    return (
        <main className="min-h-screen flex flex-col">
            <div className="grow relative flex items-center justify-center bg-center bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-[url('Images/HomeBackground.jpg')] bg-center bg-no-repeat bg-cover brightness-40 z-0"></div>
                <article className="w-full relative z-10 text-white flex flex-col md:flex-row items-start justify-center gap-10 h-auto mx-auto overflow-hidden">

                    <form onSubmit={checkRegister} className={`h-150 transform transition duration-1500 ease-in-out ${isRegistering ? "translate-y-0" : "-translate-y-full"} absolute w-full lg:w-150 flex  justify-center items-center flex-col p-2 overflow-hidden bg-gray-800 border border-black rounded-lg text-white`}>
                        <div className='flex flex-col w-100 items-center justify-center'>
                            <img className="select-none w-50" src="/Images/LogoNombre.png" alt="Logo" />
                            <div className="mb-7 mt-12 w-full flex flex-col items-center justify-center">

                                <InputModel placeHolder="Nombre" iconName="user" inputType="text" inputName="name" value={registerData.name} inputFuncion={handleRegisterChange} />
                                <InputModel placeHolder="Nombre de usuario" iconName="id" inputType="text" inputName="username" value={registerData.username} inputFuncion={handleRegisterChange} />
                                <InputModel placeHolder="Correo Electronico" iconName="email" inputType="text" inputName="email" value={registerData.email} inputFuncion={handleRegisterChange} />
                                <InputModel placeHolder="Contraseña" iconName="lock" inputType="password" inputName="password" value={registerData.password} inputFuncion={handleRegisterChange} />

                            </div>
                            <ButtonModel
                                text="Registrarse"
                                type="primary"
                                isSubmitButton={true}
                            />
                            <div className="mt-4 text-gray-400">
                                ¿Ya tiene una cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(false)}>Inicie sesión aquí</span>
                            </div>
                        </div>
                    </form>

                    <form onSubmit={checkLogin} className="h-150 w-full lg:w-150 flex justify-center items-center flex-col p-2 bg-gray-900 border border-black rounded-lg text-white">
                        <div className='flex flex-col w-100 items-center justify-center'>
                            <img className="select-none w-50" src="/Images/LogoNombre.png" alt="Logo" />
                            <div className="mb-7 mt-12 w-full flex flex-col items-center justify-center">

                                <InputModel placeHolder="Nombre de usuario" iconName="user" inputType="text" inputName="username" value={userData.username} inputFuncion={handleChange} />
                                <InputModel placeHolder="Contraseña" iconName="lock" inputType="password" inputName="password" value={userData.password} inputFuncion={handleChange} />

                            </div>
                            <ButtonModel
                                text="Iniciar Sesión"
                                type="primary"
                                isSubmitButton={true}
                            />
                            <div className="mt-4 text-gray-400">
                                ¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => setIsRegistering(true)}>Regístrate aquí</span>
                            </div>
                        </div>
                    </form>

                </article>
            </div >
        </main >
    )
}

export default Login;