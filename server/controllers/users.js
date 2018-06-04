const axios = require('axios');

module.exports = {

    search: async function(req, res){
    var symb = req.query.sym;
    function rotate(str){       //fixing the order of the dates so it's MM/DD/YYYY
        var newstr = "";
        str1 = str.slice(0, 4);
        str2 = str.slice(5, 10)
        newstr = str2 + "-" + str1;
    return newstr;
    }
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
    function orderDates(arr){
        var temp = [];
        for(var l = 0; l < arr.length/2; l++){
            temp = arr[l];
            arr[l] = arr[arr.length - 1 - l];
            arr[arr.length - 1 - l] = temp;
        }
    }
    var stocks = find(symb);
    var bigdata = [];
    for(var k = 0; k < stocks.length; k++){
        var find = stocks[k];
        //API request
        await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + find + '&apikey=2CFXI8UYE49A0QSW&datatype=json')
        .then(response => {
            var arr = [];                               //array for prices-data
            var arr2 = response.data['Meta Data'];      //information about the stock
            if(arr2 === undefined){
                arr2 = {};
                arr2 = {'2. Symbol': "Error on input - incorrect"};
            }
            var arr3 = [];                              //array for dates
            var count2 = 1;
            var ts = response.data['Time Series (Daily)'];
            for(var idx in ts){
                if(count2 > 5){
                    break;
                }
                else{
                    arr3.push(rotate(idx));
                    arr.push(ts[idx]);
                }
                count2++;
            }
            orderDates(arr);
            orderDates(arr3);
            bigdata.push({arr, arr2, arr3});     //Adding API res
            console.log(bigdata);
        })
        .catch(error => {
            console.log(error);
        });   
    }
    res.render("results", {bigdata: bigdata});  //Pushing all of the data to the front page
    },
}
