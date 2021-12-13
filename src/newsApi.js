const request = require("request");
const url = "https://newsapi.org/v2/top-headlines?country=eg&category=sports&apiKey=a0e9a1f937784489b8fa94594aa8f8d9";

function getDataFromNewsApi(callBack)
{

    request({url , json: true} , function(error , response)
    {
        if(error)
        {
            callBack("<h2>couldn't reach the api</h2>" , undefined);
        }
        else if(response.body.code)
        {
            callBack("<h2>Error in Api key</h2>" , undefined);
        }
        else if(response.body.articles.length == 0)
        {
            callBack("<h2>wrong country or category</h2>" , undefined);
        }
        else
        {
            callBack(undefined ,
                {
                    ourApiData: response.body.articles
                });
        }
    })
}

module.exports =
{
    getDataFromNewsApi
}