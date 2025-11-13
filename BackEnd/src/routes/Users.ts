import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import User from '../models/User';

// GET todos los Usuarios
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Usuarios obtenidos exitosamente',
            users: users,
        });
    } catch (error: unknown) {
        res.status(400).json({
            success: false,
            message: `Error al obtener los usuarios: ${error}`
        });
    }
});

interface LoginPayLoad {
    username: string;
    password: string;
}

// Verificar si el usuario existe
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as LoginPayLoad;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }

        res.json({ success: true, message: "Usuario autenticado", user });
    } catch (error: unknown) {
        res.status(500).json({ error: error });
    }
});

interface RegisterPayLoad {
    username: string;
    name: string;
    password: string;
    email: string;
}

// POST nuevo Usuarios
router.post('/', async (req: Request, res: Response) => {
    try {
        const { username, name, password, email } = req.body as RegisterPayLoad;

        console.log("Body recibido:", req.body);

        // Verificar si el nombre de usuario o el correo ya existen
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        
        if (existingUser) {
            console.log("Existe", existingUser);
            const duplicatedField = existingUser.username === username ? "nombre de usuario" : "correo electrónico";
            return res.status(400).json({
                success: false,
                message: `El ${duplicatedField} ya está en uso`
            });
        }

        //Encriptar la contraseña.
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            ...req.body,
            name: name,
            password: encryptedPassword,
            role: "cliente",
            userImageUrl: "DefaultUser.png",
        });
        const saved = await newUser.save();

        console.log("saved", saved);

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            user: saved
        });

    } catch (error: unknown) {
        res.status(400).json({ error: error });
    }
});

// PUT actualizar Usuarios
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error: unknown) {
        res.status(400).json({ error: error });
    }
});

// DELETE eliminar Usuarios
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuarios eliminado' });
    } catch (error: unknown) {
        res.status(400).json({ error: error });
    }
});

export default router;