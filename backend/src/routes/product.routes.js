import express from 'express';
import Verify from '../middlewares/verify.middleware.js';
import productModel from '../models/product.model.js';
import cloudinary from '../configs/cloudinary.js';
import upload from '../configs/upload.js';
import categoryModel from '../models/category.model.js';
import {StatusCodes} from "http-status-codes";
import ApiError from "../core/error.response.js";

const router = express.Router();

function randomNumber() {
    // Tạo số ngẫu nhiên từ 0 đến 99
    const randomNum = Math.floor(Math.random() * 100);

    // Thêm 1 để số nằm trong khoảng từ 1 đến 100
    return randomNum + 1;
}

const getSortBy = (sort) =>{
    const sortBy = {};
    const properties = sort.split(",");

    properties.forEach((property) => {
        const key = property.replace(/^-/, "");
        const value = property.startsWith("-") ? -1 : 1;
        sortBy[key] = value;
    });

    return sortBy;
}

router.get('/test', async (req, res, next) => {
    try{
        let ids = await productModel.find({}, '_id');

        for(let id of ids) {
            await productModel.findByIdAndUpdate(id._id, {instock: randomNumber()})
        }

        return res.status(200).json('oke');
    }catch (e) {
        next(e);
    }
})

router.get('/', async (req, res, next) => {
    let {limit, page, sort, ...query} = req.query;
    if(!limit) limit = 12;
    if(!page) page = 1;

    let sortBy = sort ? getSortBy(sort) : {_id: 1};
    let offset = (+page - 1) * (+limit);
    console.log(query)

    const foundProducts = await productModel.find({...query}).skip(offset)
        .limit(limit)
        .sort(sortBy)
        .populate('categoryId', '_id name');
    const abx = await productModel.find({...query}).populate('categoryId', '_id name');
    return res.status(200).json({count: abx.length ,data: foundProducts});
})

router.post('/create',Verify.verifyToken, Verify.verifyTokenAndAdminAuth, upload.array('images', 50), async (req, res, next) => {
    try{
        let images = req.files.map(file => ({
            url: file.path,
            publicId: file.filename
        }));

        let product = {
            ...req.body,
            images,
            instock: +req.body.instock,
            isActive: req.body.isActive === 'true',
            price: +req.body.price,
            promotion: +req.body.promotion
        };

        const createProduct = await productModel.create(product);


        return res.status(200).json('oke');
    }catch (e){
        next(e);
    }
})

router.get('/:id', async(req, res) => {
    const foundProduct = await productModel.findById(req.params.id).populate('categoryId', 'isSizes');
    return res.status(200).json(foundProduct);
})

router.patch('/:id', Verify.verifyToken, Verify.verifyTokenAndAdminAuth, upload.array('images', 50), async (req, res, next) => {
    try{
        const productId = req.params.id;
        const foundProduct = await productModel.findById(productId);
        if(!foundProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Product is not found!');

        let images = req.files.map(file => ({
            url: file.path,
            publicId: file.filename
        }));

        if(!images.length) images = [...foundProduct.images];

        let product = {
            ...req.body,
            images,
            instock: +req.body.instock,
            isActive: req.body.isActive === 'true',
            price: +req.body.price,
            promotion: +req.body.promotion
        };

        const updateProduct = await productModel.findByIdAndUpdate(productId,product);

        return res.status(200).json(1);
    }catch (e) {
        next(e);
    }
})

router.delete('/:id', Verify.verifyToken, Verify.verifyTokenAndAdminAuth, async (req, res, next) => {
    try{
        const productId = req.params.id;

        const deleteProduct = await productModel.findByIdAndDelete(productId);

        if(!deleteProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Product is not found!');

        let images = [...deleteProduct.images];

        for(let image of images) {
            let rs = await cloudinary.uploader.destroy(image.publicId);
            if(rs === 'not found') throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete images failed')
        }

        return res.status(200).json(1);
    }catch (e) {
        next(e);
    }
})

router.get('/change-status/:id', Verify.verifyToken, Verify.verifyTokenAndAdminAuth, async (req, res, next) => {
    try{
        const productId = req.params.id;
        const foundProduct = await productModel.findById(productId);
        if(!foundProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Product is not found!');

        let isActive = foundProduct.isActive;
        await productModel.findByIdAndUpdate(productId, {isActive: !isActive});

        return res.status(200).json(1);
    }catch (e) {
        next(e)
    }
})

router.get('/search/:search', async (req, res, next) => {
    try{
        const search = new RegExp(req.params.search);
        const result = await productModel.find({
            $text: { $search: search}
        }, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}}).lean();

        return res.status(200).json(result);
    }catch (e) {
        next(e);
    }
})





// function check(img) {
//     let arr = [
//         {
//             name: 'Túi Da đeo chéo vai thời trang nam nữ',
//             price: 340000,
//             description: 'new',
//             images: ['TuiDadeocheovaithoitrangnamnu.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Double Leather Basic Balo Nâu Small Size',
//             price: 380000,
//             description: 'new',
//             images: ['DoubleLeatherBasicBaloNauSmallSize.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Balo Simili Nap Basic Kem',
//             price: 440000,
//             description: 'new',
//             images: ['BaloSimiliNapBasicKem.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Balo Simili Nap Basic',
//             price: 440000,
//             description: 'new',
//             images: ['BaloSimiliNapBasic.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Leather Basic Balo Rêu',
//             price: 430000,
//             description: 'new',
//             images: ['LeatherBasicBaloReu.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Double Leather Basic Balo',
//             price: 480000,
//             description: 'new',
//             images: ['DoubleLeatherBasicBalo.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Balo Leather Quốc Dân Nâu',
//             price: 340000,
//             description: 'new',
//             images: ['BaloLeatherQuocDanNau.jpg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Simili Tote Black',
//             price: 350000,
//             description: 'new',
//             images: ['SimiliToteBlack.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Mini Backpack Drawstring Silver',
//             price: 300000,
//             description: 'new',
//             images: ['MiniBackpackDrawstringSilver.jpg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Túi Da Travel Leather Bag',
//             price: 990000,
//             description: 'new',
//             images: ['TuiDaTravelLeatherBag.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Balo Drawstring Backpack',
//             price: 290000,
//             description: 'new',
//             images: ['BaloDrawstringBackpack.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'Áo Thun thời trang Big Logo Is Us',
//             price: 310000,
//             description: 'new',
//             images: ['AoThunthoitrangBigLogoIsUs.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo thun Tee shirt in hình bé Xoài',
//             price: 310000,
//             description: 'new',
//             images: ['AothunTeeshirtinhinhbeXoai.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo thun Tee shirt Bat Man',
//             price: 310000,
//             description: 'new',
//             images: ['AothunTeeshirtBatMan.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Tee Vietnam 84 Trắng',
//             price: 290000,
//             description: 'new',
//             images: ['TeeVietnam84Trang.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo Khoác Cardigan màu kem nâu',
//             price: 390000,
//             description: 'new',
//             images: ['AoKhoacCardiganmaukemnau.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Hoodie Is Us',
//             price: 390000,
//             description: 'new',
//             images: ['HoodieIsUs.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2819'
//         },
//         {
//             name: 'HoodieIs Us Kem',
//             price: 390000,
//             description: 'new',
//             images: ['HoodieIsUsKem.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Jacket Biker',
//             price: 310000,
//             description: 'new',
//             images: ['JacketBiker.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo khoác da Biker Jacket V2.0',
//             price: 310000,
//             description: 'new',
//             images: ['AokhoacdaBikerJacketV2.0.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo Thun Dây Rút Kem',
//             price: 350000,
//             description: 'new',
//             images: ['AoThunDayRutKem.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo Thun Dây Rút Đen',
//             price: 350000,
//             description: 'new',
//             images: ['AoThunDayRutDen.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Tee IsUs Đen',
//             price: 245000,
//             description: 'new',
//             images: ['TeeIsUsDen.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Raglan Line Nâu Tee Nâu Kem',
//             price: 350000,
//             description: 'new',
//             images: ['RaglanLineNauTeeNauKem.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Raglan Line Đen Tee Đen Hồng',
//             price: 350000,
//             description: 'new',
//             images: ['RaglanLineDenTeeDenHong.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Raglan Line Hồng Tee Đen Hồng',
//             price: 350000,
//             description: 'new',
//             images: ['RaglanLineHongTeeDenHong.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Tee Vietnam 84 Xám',
//             price: 290000,
//             description: 'new',
//             images: ['TeeVietnam84Xam.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Tee Vietnam 84 Green',
//             price: 290000,
//             description: 'new',
//             images: ['TeeVietnam84Green.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Tee Vietnam84 Đỏ',
//             price: 290000,
//             description: 'new',
//             images: ['TeeVietnam84Do.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Áo thể thao Vietnam 84',
//             price: 290000,
//             description: 'new',
//             images: ['AothethaoVietnam84.jpeg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Not A Basic T-Shirt Navy',
//             price: 240000,
//             description: 'new',
//             images: ['NotABasicT-ShirtNavy.jpg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         },
//         {
//             name: 'Pockets Short-Sleeved Black Shirt',
//             price: 290000,
//             description: 'new',
//             images: ['PocketsShort-SleevedBlackShirt.jpg'],
//             categoryId: '66043feb43b7b1d248cc2817'
//         }
//     ]
//     let a = arr.find(item => item.images[0] === img);
//     return a;
// }


// router.post('/uploadImages', upload.array('images', 50), async (req, res) => {
//     try {
//         const products = req.files.map(file => {
//             let a = file.originalname;
//             let b = check(a);
//             return { ...b, images: [{
//                 url: file.path,
//                 publicId: `xshop/${file.path.split('/').pop().split('.')[0]}`
//             }], description: b.name }
//         });

//         const rs = []

//         for(let product of products) {
//             const uploadProduct = await productModel.create(product);
//             rs.push(uploadProduct)
//         }


//         return res.status(200).json({message: 'Uploaded successfully', data: rs})
//     } catch (error) {

//     }
// })



export default router;