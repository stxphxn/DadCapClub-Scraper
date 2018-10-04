var AliExpressSpider = require('aliexpress');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Image = require('./imageDownload');
var csv = require("fast-csv");

csv
 .fromPath("/home/stephen/Projects/DadCapClub-Scraper/test .csv",{headers: true})
 .on("data", function(data){
     console.log(data);
     
AliExpressSpider.Detail(data.url).then(function(detail){
  console.log('good detail', detail);
  
  mkdirp(data.folder, function(err) { 
    console.log("folder was created");

    Image.download(detail.gallery[0].src, data.folder+'/cover.jpg', function(){
      console.log('Cover downloaded');});

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
      
          console.log("The file was saved!");
      });
  
  });
  
}, function(reason){
  // error handler
});
 })
 .on("end", function(){
     console.log("done");
 });
