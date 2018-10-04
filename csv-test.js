var csv = require("fast-csv");

csv
 .fromPath("/home/stephen/Projects/DadCapClub-Scraper/test .csv",{headers: true})
 .on("data", function(data){
     console.log(data);
     console.log(data.product);
 })
 .on("end", function(){
     console.log("done");
 });