
const AXIOS = require('axios');

const isSitemapUrl = (str) => {
    var pattern = new RegExp('^(https?:\/\/).*(\.xml)$')
    return !!pattern.test(str);
  }


const getSitemapUrls = ( data ) => {
    let xmlbody = data.match(/<loc>([^>]+)<\/loc>/gi)
	return xmlbody.map(function (value) { return value.replace('<loc>', '').replace('</loc>', '') })

}

const Sitemapo = ( url, callBack ) => {
    if( ! isSitemapUrl(url) ){
        console.error('Invalid sitemap url')
        process.exit();
    }
    AXIOS.get(url)
    .then( (response) =>  getSitemapUrls( response.data ) )
       
    
    .then( (response) => {
        callBack( response );
    })
    .catch( (error) => { 
        console.error(error);
        process.exit();
    })
}
  


    // handle success
//    FILE.newProject( opts.sitemap )
   





module.exports = async (url)=> {
    // fetch data from a url endpoint
    const response = await AXIOS.get(url)
   .then(
    ( response ) =>  getSitemapUrls(response.data)

   )

   console.log('oooooo');
   
    return response;
  }