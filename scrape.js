var AliExpressSpider = require('aliexpress');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Image = require('./imageDownload');

var url ="https://www.aliexpress.com/store/product/2018-new-Simple-alphabet-BRUH-Embroidery-dad-hat-men-women-Summer-fashion-baseball-cap-snapback-Hip/1048319_32854189200.html"
var product = "Bruh cap"
var folder ="2018-10-04--bruh"
var category = "text"
AliExpressSpider.Detail(url).then(function(detail){
  console.log('good detail', detail);
  
  mkdirp(folder, function(err) { 
    console.log("folder was created");

    Image.download(detail.gallery[0].src, folder+'/cover.jpg', function(){
      console.log('Cover downloaded');});

      for (var value of detail.variants) {
        Image.download(value.src, folder+'/'+value.alt+'.jpg', function(){
          ;});

      }

    
    var md = '---\n' +
         'title: '+product+'\n'+
         'colour: ['+detail.colours+']\n' +
         'subTitle: \n' +
         'category: '+category+'\n' +
         'price: 999\n' +
         'cover: cover.jpg\n' +
         'images:\n' +
         detail.images.join("") +
         '---';
      
      fs.writeFile(folder+"/index.md", md, function(err) {
          if(err) {
              return console.log(err);
          }
      
          console.log("The file was saved!");
      });
  
  });
  
}, function(reason){
  // error handler
});