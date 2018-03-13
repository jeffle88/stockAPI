
module.exports = {

    search: function(req, res){
    const axios = require('axios');
    var symb = req.query.sym;
        function find(str){     //Putting symbols into an array to search later
            var array = [];
            var count = 0;
            for(var i = 0; i < str.length; i++){
                if(str[i] === " "){
                    count++;
                    continue;
                }
                if(str[i] === ","){
                    stx = str.slice(count, i);
                    array.push(stx);
                    count = i;
                    count ++;
                }
                if(i === str.length -1){
                    stx = str.slice(count, i+1);
                    array.push(stx);
                } 
            }
            return array;
        }
    var stocks = find(symb);
    var bigdata = [];
    for(var k = 0; k < stocks.length; k++){
        var find = stocks[k];
        //API request
        axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + find + '&apikey=2CFXI8UYE49A0QSW&datatype=json')
        .then(response => {
            var arr = [];                               //array for prices-data
            var arr2 = response.data['Meta Data'];      //information about the stock
            var arr3 = [];                              //array for dates
            var count2 = 1;
            var ts = response.data['Time Series (Daily)'];
            for(var idx in ts){
                if(count2 > 5){
                    break;
                }
                else{
                    function rotate(str){       //fixing the order of the dates so it's MM/DD/YYYY
                        var newstr = "";
                        str1 = str.slice(0, 4);
                        str2 = str.slice(5, 10)
                        newstr = str2 + "-" + str1;
                        return newstr;
                    }
                    arr3.push(rotate(idx));
                    arr.push(ts[idx]);
                }
                count2++;
            }
            bigdata.push({arr, arr2, arr3});     //Adding API res
       })
        .catch(error => {
            console.log(error);
        });   
    }
    setTimeout(function(){ res.render("results", {bigdata: bigdata}); }, 5000); //Pushing all of the data to the front page
    },
}
