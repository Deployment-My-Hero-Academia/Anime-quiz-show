const mongoose = require('mongoose');

const image = new mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
  
     img:{
        data:Buffer,
        contentType:'String'
     }

});
module.exports = mongoose.model('image',image); 