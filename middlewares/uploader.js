const multer = require('multer')

const filename = (req, file, next) => {
let lastIndexOf = file.originalname.lastIndexOf(".");
let ext = file.originalname.substring(lastIndexOf);
next(null, `img-${Date.now()}${ext}`);
}

const destination = (req, file, next) => {
    next(null, `{__dirname} , '..', 'uploads'`)
};

const uploader = multer({
    storage:multer.diskStorage({destination, filename})
})
module.exports=uploader