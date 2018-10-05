var AliExpressSpider = require('aliexpress');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Image = require('./imageDownload');
var csv = require("fast-csv");
var async = require("async");
const imports = [];
const spiders = []; 
csv
 .fromPath("/home/stephen/Projects/DadCapClub-Scraper/test - Sheet1.csv",{headers: true})
 .on("data",  function(data){
     console.log(data);  
    imports.push(data);
    
 })
 .on("end",  function(){
  async.eachSeries(imports, function(data, callback){
    AliExpressSpider.Detail(data.url).then(function(detail){
      console.log('processing', data.product);
      mkdirp(data.folder, function(err) { 
        
    
        Image.download(detail.gallery[0].src, data.folder+'/cover.jpg', function(){
          
    
          for (var value of detail.variants) {
            Image.download(value.src, data.folder+'/'+value.alt+'.jpg', function(){
              ;});
    
          }
    
        
        var md = '---\n' +
             'title: '+data.product+'\n'+
             'colour: ['+detail.colours+']\n' +
             'subTitle: \n' +
             'category: '+data.category+'\n' +
             'price: 999\n' +
             'cover: cover.jpg\n' +
             'images:\n' +
             detail.images.join("") +
             '---';
          
          fs.writeFile(data.folder+"/index.md", md, function(err) {
              if(err) {
                  return console.log(err);
              }
          
              
          });
        }, function(reason){
          // error handler
        });
      
      });
      console.log('created', data.product);
      callback();
      
    }, function(reason){
      // error handler
      console.log(reason);
      calbback("error");
    }) 
    
  });
  console.log("finished");
 });

 


const download = async function(data){
 AliExpressSpider.Detail(data.url).then(function(detail){
  console.log('good detail', detail);
  
  
}, function(reason){
  // error handler
  console.log(reason);
})

}
 
 
