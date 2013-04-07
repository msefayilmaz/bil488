var $jq = jQuery.noConflict();

 var timer = null;

function execute(searchString,rowCount,time){
    if(time == "")
    {
        time = 5;
    }
    time = time * 1000;
    clearInterval(timer);
    timer = setInterval(function() { getTweets(searchString,rowCount); }, time);

}

function getTweets(searchString, rowCount) {
     
    if (searchString == "") {
        searchString = escape("msefayilmaz");
    }
    if (rowCount == "") {
        rowCount = '25';
    }
   
    $jq.ajax({
        url: 'http://search.twitter.com/search.json?q=' + searchString + '&rpp=' + rowCount,
        dataType: 'jsonp',
        success: function (_json) {
            $jq('#twitlist ul').remove();
            $jq('#twitlist').append('<ul></ul>');
            var $listItems = $jq('#twitlist').find('ul');
            
            $jq.each(_json.results, function (key) {
                
                var html = '<img class = "t_icon" src="' + _json.results[key].profile_image_url + '"/>';
                html += '<p class="p_italics">From: ' + _json.results[key].from_user_name + ' (@' + _json.results[key].from_user + ')' + ' Created: ' + _json.results[key].created_at + '</p>';
                html += '<div class="t_body">' + _json.results[key].text + '</div>';
                
                 $listItems.append('<li>' + html + '</li>');
                
            });
        
            $jq('#twitlist').append(listItems);
            $jq('#b1').html('Search <img class="button1" />');
            
        }
    
    

    });
              
}