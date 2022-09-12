// 1st way----------=================================================================================================== -------------//

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const writeStream = fs.createWriteStream("File.csv");
writeStream.write(`Product_Name,Product_Price,Item_Number,Model_Number,Product_Category\n`)  // Formate csv file

axios
  .get("https://www.quill.com/hanging-file-folders/cbl/4378.html")
  .then((response) => {
    // console.log(response.data);

    const $ = cheerio.load(response.data);
    // class="clear searchItemTop searchItem1"
    // class="SearchResultsNew BrowseItem OBItem_250294  BrowseItemFirst  show-new-bmsm  hide-notify-btn "
    const All_data = $(".searchItemTop .hide-notify-btn");

    for (let i = 0; i < All_data.length; i++) {
        // class="desc4 scTrack pfm sku-description"
    let Name = $(All_data[i]).find("#skuName a")[0],
    Product_Name  = $(Name).text().replace(/,/g, '').trim();  // trim() remove space from beginning
    // console.log(`${Product_Name}`);

    let price = $(All_data[i]).find("#SkuPriceUpdate"),
    Product_Price = $(price).text();
    // console.log(`${Product_Price}`);

    let I_Number = $(All_data[i]).find(".iNumber"),
    Item_Number = $(I_Number).text();
    // console.log(`${Item_Number}`);

    let M_Number = $(All_data[i]).find(".model-number"),
    Model_Number = $(M_Number).text();
    // console.log(`${Model_Number}`);

    let Product_Category = $(response.data).find(".ML_s").text().replace(/>/g, ' > ');
    // console.log(Product_Category);
      
    let Description = $(All_data[i]).find(".skuBrowseBullet"),
    Product_Description = $(Description).text().replace(/,/g, '').trim();
    // console.log(`[${Product_Description}]`);

    writeStream.write(`${Product_Name},${Product_Price},${Item_Number},${Model_Number},${Product_Category},[${Product_Description}] \n`) // write data in csv file

    }
    console.log("done_dona_done.........................................................");
  })
  .catch((err) => console.log("Fetch error " + err));


// 2nd way----------=================================================================================================== -------------//

const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const writeStream = fs.createWriteStream("productData.csv");
writeStream.write(`Product Name,Product Price,Product Item,Model Number,Producty Description, Product Category\n`);


const URL = 'https://www.quill.com/hanging-file-folders/cbl/4378.html'
// console.log(URL);
axios.get(URL).then((response) => {
    // console.log(response);
    const $ = cheerio.load(response.data)
    $('.SearchResultsNew').each(function(ele,index){
        const product_name = $(index)
            .find('#skuName')
            .text().replace(/,/g, '').trim()
        // console.log(product_name)
        const Product_Price = $(index)
            .find('#SkuPriceUpdate')
            .text()
            // console.log(Product_Price); 
        const Item_Number = $(index)
            .find('.iNumber')
            .text()
            // console.log(Item_Number);
        const Model_Number = $(index)
            .find('.model-number')
            .text()
            // console.log(Model_Number);
        const Product_Description = $(index)
            .find('.skuBrowseBullets')
            .text().replace(/,/g, '').trim()
            // console.log(Product_Description);
        const product_category = $(response.data)
            .find('.ML_s')
            .text()
            // console.log(product_category)
        writeStream.write(`${product_name},${Product_Price},${Item_Number},${Model_Number},${Product_Description},[${product_category}]\n`);
        
    })
    console.log("Done.........!");
}).catch((err) => {
    console.log(err);
    
});
