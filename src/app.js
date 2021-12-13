const express = require("express");
//const req = require("express/lib/request");
//const res = require("express/lib/response");
var hbs = require("hbs");
var path = require("path");
const app = express();
const port = process.env.PORT || 3000;


// the restriction regarding thepath of folder (views) is cancelled

const viewsPath = path.join(__dirname , "../templates/views");

app.set("views" , viewsPath);



// the folder (public) is public
// note: the word public between the brackets is the folder name

const publicDirectory = path.join(__dirname , "../public");

app.use(express.static(publicDirectory));


/*
const request = require("request");

function getDataFromNewsApi()
{
    var x;
    const url = "https://newsapi.org/v2/top-headlines?country=eg&category=sports&apiKey=a0e9a1f937784489b8fa94594aa8f8d9";
    request({url , json: true} , function(error , response)
    {
        if(error)
        {
            alert("couldn't reach the api")
        }
        else if(response.body.code)
        {
            app.get("/" , function(req , res)
            {
                res.send("index.hbs" , "<h2>Error in Api key</h2>")
            })
        }
        else if(response.body.articles.length == 0)
        {
            console.log("wrong country or category");
        }
        else
        {
            app.get("/" , function(req , res)
            {
                res.render("index.hbs" ,
                {
                    allData: response.body.articles
                });
            })
        }
    })
}


getDataFromNewsApi()
*/

const newsApi = require("./newsApi");

/*
app.get("/" , function(req , res)
{
    newsApi.getDataFromNewsApi((function(error , data)
    {
        if(error)
        {
            app.send(error);
        }
        else
        {
            res.render("index.hbs" ,
            {
                allData: data.ourApiData
            });
        }
    }))
    
})
*/


newsApi.getDataFromNewsApi(function(error , data)
{
    if(error)
        {
            app.get("/" , function(req , res)
            {
                res.send(error);
            })
        }
        
        else
        {
            app.get("/" , function(req , res)
            {
                res.render("index.hbs" ,
                {
                    allData: data.ourApiData
                });
            })
        }
        
})



app.listen(port , function()
{
    console.log(`listening on port ${port}`);
})