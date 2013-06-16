$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function loadAdditionalGalleryImages(){
  var imageList = $('#gallery section ul');
  $.each(galleryImages, function(index, node){
    var theimg = $('<img/>',{
      src:"images/gallery/thumbnails/" + node.name,
      alt:node.title,
      title:node.title
    });
    var thelink = $('<a/>', {
      href:"images/gallery/" + node.name,
      title:node.title,
      class:"gallery-item lightbox-photo"
    });
    thelink.append(theimg);
    var listElement = $('<li/>').append(thelink);
    imageList.append(listElement);

  });
  // /<li class="four columns"><a href="images/gallery/LesandPam_116.jpg" title="Photo Title Here" class="gallery-item lightbox-photo"><img src="images/gallery/thumbnails/LesandPam_116.jpg" alt=""></a></li>
};

function requireauth(){
  // $('#contact-form').slideUp('fast');
  $('#thanxforrsvp').hide();
  $('#identity').hide();
  $('#auth').show();
  $('#entry_1110146062').val("");
  $('#entry_907370162').val("");
  $('#entry_1036320101').val("");
  $('#entry_700903665').val("");
  $('#entry_1504355738').val("");
}

function authenticated(data){
  // $('#form-bg').removeClass('hidden');
  // $('#contact-form').slideDown('slow');
  $('#auth').hide();
  $('#identity').show();
   $('#identityimg').css('background-image', 'url("' + data.ThumbnailImageUrl + '")');
  // $('#identity').text(data.FullName);
  $('#send').text("Send RSVP for " + data.FullName);
  //Name
  $('#entry_1110146062').val(data.FullName);
  //Email
  if(data.Email && data.Email.length > 0)
    $('#entry_907370162').val(data.Email[0].Value);
  //Auth Mechanism
  $('#entry_1036320101').val(data.Provider);
  //Username
  $('#entry_700903665').val(data.ProfileName);
  //message
  $('#entry_1504355738').val("");

  // $('#identity img').attr('src', data.ThumbnailImageUrl);
  
}

function sendRSVP(){
  var rsvpdata = $('#rsvp-form').serializeObject();
  $('#identity').hide();
  $('#thanxforrsvp').show();
  $.ajax({
    type: "POST",
    url: "https://docs.google.com/a/lesstroud.com/forms/d/1moZdFQuKX3HXw38UIYSnKz3TGAZ8TXUXZh9qaWFJuT4/formResponse",
    data: rsvpdata,
    dataType: "jsonp"
  });
}









