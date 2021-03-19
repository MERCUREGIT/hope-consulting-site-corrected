const whiteList =['https://hope-consulting-admin.netlify.app','https://hope-consulting-admin.netlify.app/', "https://www.netlify.com/",'https://hope-consulting-admin.netlify.app/home' ]
const corsOptions={
    origin: function(origin, callback) {
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    }
}

module.exports = {
    corsOptions
}
