import express, { Request, Response } from 'express';
const router = express.Router();
import multer from 'multer';
import Product from '../models/Product';
import path from 'path';

// // 📂 Configuración del almacenamiento de archivos
// const storage = multer.diskStorage({
//     destination: function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
//         cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
//     },
//     filename: function (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre.jpg
//     }
// });

// const upload = multer({ storage: storage });

//Interfaz para los parámetros del filtro.
interface FilterParams {
    price?: number;
    category?: string;
    searchTerm?: string;
}

interface MongoFilters {
    price?: { $lte: number };
    category?: string;
    name?: { $regex: string; $options: string };
}

// Traer los productos dependiendo de los filtros
router.get('/', async (req: Request, res: Response) => {
    try {
        const { price, category, searchTerm } = req.query as FilterParams;
        console.log(`Filtros recibidos - Price: ${price}, Category: ${category}, SearchTerm: ${searchTerm}`);

        const filters: MongoFilters = {};

        // Validar que 'price' exista y sea número
        if (!price || isNaN(price)) {
            return res.status(400).json({
                success: false,
                message: "Falta el parámetro 'price' o no es válido"
            });
        }

        filters.price = { $lte: price };

        if (category && category !== "Todos") {
            const categoryExists = await Product.exists({ category });
            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                });
            }
            // Añadir "category" a los filtros si todo es correcto.
            filters.category = category;
        }

        // Añadir "name" a los filtros.
        if (searchTerm) {
            filters.name = { $regex: searchTerm, $options: 'i' };
        }

        // Buscar los productos que conincidan con los filtros si todo es correcto.
        const products = await Product.find(filters);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay resultados"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Productos obtenidos exitosamente",
            products
        });

    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: `Error al obtener los productos: ${error}`
        });
    }
});



// Traer un producto por ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id); //Encuentra un producto por su ID. Este recibe el ID del producto desde la URL.
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado',
            });
        }
        res.json({
            success: true,
            message: 'Producto obtenido exitosamente',
            product,
        });
    } catch (error: unknown) {
        res.status(500).json({
            success: false,
            message: `Error al obtener el producto: ${error}`,
        });
    }
});

// // Crear un nuevo producto
// router.post('/', upload.single('productImage'), async (req, res) => {
//     try {
//         //Crear un nuevo producto
//         const newProduct = new Product({
//             name: req.body.name,
//             price: req.body.price,
//             description: req.body.description,
//             category: req.body.category,
//             brand: req.body.brand,
//             productImage: req.file ? req.file.path : null,
//             stock: req.body.stock,
//             specs: req.body.specs ? JSON.parse(req.body.specs) : []
//         });
//         // Guardar el producto en la base de datos
//         const saved = await newProduct.save();
//         res.status(201).json({
//             success: true,
//             message: "Producto creado exitosamente"
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: `Error al crear el producto: ${error.message}`
//         });
//     }
// });

// // PUT actualizar producto
// router.put('/:id', async (req, res) => {
//     try {
//         const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updated);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // DELETE eliminar producto
// router.delete('/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Producto eliminado' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

export default router;