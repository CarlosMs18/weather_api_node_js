const axios = require('axios')
class Search{
    constructor(){}


    get parametrosMapBox(){
        return {
            'language':'es',
            'access_token': process.env.MAPBOX_KEY

        }
    }

    async searchCountryAxios(country){
        const instance = await axios.create({
            baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/`,
            params : this.parametrosMapBox
        })


        const resp = await instance.get(`${country}.json`)
        const responseAxios = resp.data.features.map( p =>{
        
            return {
                id: p.id,
                nombre : p.place_name,
                longitud : p.center[0],
                latitud : p.center[1]
            }
        } )
        
      
        return responseAxios
    }


    async searchWeather(lat, lon){
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWHEATER_LEY }&units=metric&lang=es`)
       const {weather , main} = res.data
 
       return {
            temperatura : main.temp,
            temperatura_minima : main.temp_min,
            temperatura_maxima : main.temp_max,
            description : weather[0].description
       }
    }
}


const search = new Search()
module.exports = search