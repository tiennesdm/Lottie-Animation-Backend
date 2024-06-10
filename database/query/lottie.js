const Lottie = require('./../models/lottie');

const getAllLotties = async () =>{
    try{
       return await Lottie.find({}).sort({ createdAt: -1 });
    }catch(err){
        return err;
    }
}


const searchLottie = async (query) =>{
    try{
      return await Lottie.find({
        $or: [
          { name: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
        ],
      }).sort({ createdAt: -1 })
    }catch(err){
        return err;
    }
}


const saveLottie = async(filename,mimetype, encoding, url, name, description, isValidLottie) =>{
    try{

        const lottieInfo = new Lottie({
            fileName: filename,
            mimetype: mimetype || null,
            encoding: encoding || null,
            url: url,
            name,
            description,
            isValidLottie,
          });
          return  await lottieInfo.save();
    }catch(err){
        return err;
    }

}



module.exports = {
    getAllLotties,
    searchLottie,
    saveLottie
}