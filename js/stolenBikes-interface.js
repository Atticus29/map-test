var Bike = require("./../js/stolenBikes.js").bikeModule;

var populateHTMLidWithMostStolenInfoFromBikeArray = function(listHTMLid, bikeArray){
  var mostStolen = determineMostStolenManufacturerAndCount(bikeArray);
  $("#" + listHTMLid).empty();
  $("#" + listHTMLid).append("<li>" + mostStolen.maxEl + " with " + mostStolen.maxCount + " bikes stolen</li>");
}

var determineMostStolenManufacturerAndCount = function(bikeArray){
  var manufacturerArray = bikeArray.map((bike)=>{ return bike.manufacturer});
  // console.log(manufacturerArray);
  // var manufacturerArray = getArrayOfManufacturers(bikeArray);
  var mostStolen = getMostCommonAndItsCount(manufacturerArray);
  // console.log(mostStolen);
  return mostStolen;
};

function getMostCommonAndItsCount(array)
{
    if(array.length === 0) //interestin
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return {maxEl, maxCount};
}

function findAndReplace(string, target, replacement) {
 var i = 0, length = string.length;
 for (i; i < length; i++) {
   string = string.replace(target, replacement);
 }
 return string;
}

$(() => {
  var currentBike = new Bike();
  $("#search-form").submit(() => {
    event.preventDefault();
    $(".hidden").show();
    var address = $("#address").val();
    var addressWithNoSpaces = findAndReplace(address, " ", "%20N%20");
    var addressWithNoCommas = findAndReplace(addressWithNoSpaces, ",", "%2C%20");
    currentBike.addAllStolenBikes(populateHTMLidWithMostStolenInfoFromBikeArray);
    currentBike.addLocalStolenBikes(populateHTMLidWithMostStolenInfoFromBikeArray, addressWithNoCommas);
  });
});
