// import multer  from 'multer';
// //khai báo sử dụng multer
// // SET STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
// const upload = multer({ storage: storage })

// export default upload;

import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'xshop',
    }
})

const upload = multer({storage});

export default upload;