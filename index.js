const express = require('express') ;
const request = require('request-promise') ;

//const apiKey = '71ed64a3270cb99d6aba37a641c9b0bc' ;
//const baseUrl = `http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true` ;

const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com/?api_key=${apiKey}&autoparse=true` ;

const app = express() ;
const PORT = process.env.PORT || 5000 ;


app.use(express.json()) ;
app.get('/', (req,res) => {
    res.send('Welcome Welcome Welcome...') ;
})

app.get('/products/:productId', async (req,res) => {
    const {productId} = req.params ;
    const {apiKey} = req.query ;

    try {
        const response = await request(`${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`) ;
        res.json(JSON.parse(response)) ;
    } catch (error) {
        res.json("ERROR") ;
    }
})

app.get('/products/:productId/reviews', async (req,res) => {
    const {productId} = req.params ;
    const {apiKey} = req.query ;
    try {
        const response = await request(`${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`) ;
        res.json(JSON.parse(response)) ;
    } catch (error) {
        res.json("ERROR") ;
    }
})

app.get('/products/:productId/offers', async (req,res) => {
    const {productId} = req.params ;
    const {apiKey} = req.query ;

    try {
        const response = await request(`${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`) ;
        res.json(JSON.parse(response)) ;
    } catch (error) {
        res.json("ERROR") ;
    }
})

app.get('/search/:searchQuery', async (req,res) => {
    const {searchQuery} = req.params ;
    const {apiKey} = req.query ;

    try {
        const response = await request(`${generateScrapperUrl(apiKey)}}&url=https://www.amazon.com/s?k=${searchQuery}`) ;
        res.json(JSON.parse(response)) ;
    } catch (error) {
        res.json(error) ;
    }
})





app.listen(PORT, () => console.log(`running on ${PORT}`)) ;