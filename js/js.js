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


var galleryImages = [{ 
    name:"LesandPam_170.jpg",
    title:""
  },{ 
    name:"LesandPam_184.jpg",
    title:""
  },{ 
    name:"LesandPam_136.jpg",
    title:""
  },{ 
    name:"DSCN0167.jpg",
    title:""
  },{ 
    name:"IMGP0448.JPG_3.jpg",
    title:""
  },{ 
    name:"IMG_0837.jpg",
    title:""
  },{ 
    name:"LesandPam_021.jpg",
    title:""
  },{ 
    name:"LesandPam_143.jpg",
    title:""
  },{ 
    name:"mallie yard.jpg",
    title:""
  },{ 
    name:"LesandPam_102.jpg",
    title:""
  },{ 
    name:"LesandPam_142.jpg",
    title:""
  },{ 
    name:"DSC_0311.JPG_2.jpg",
    title:""
  },{ 
    name:"PC010082.jpg",
    title:""
  },{ 
    name:"PC010075_2.jpg",
    title:""
  },{ 
    name:"IMG_0570.jpg",
    title:""
  },{ 
    name:"DSC_0067_24.jpg",
    title:""
  },{ 
    name:"DSC_0164.JPG",
    title:""
  },{ 
    name:"Seminar.jpg",
    title:""
  },{ 
    name:"LesandPam_132.jpg",
    title:""
  },{ 
    name:"LesandPam_168.jpg",
    title:""
  },{ 
    name:"DSC_0231.JPG_2.jpg",
    title:""
  },{ 
    name:"DSC_0059.jpg",
    title:""
  },{ 
    name:"LesandPam_133.jpg",
    title:""
  },{ 
    name:"LesandPam_191.jpg",
    title:""
  },{ 
    name:"DSC_0035.jpg",
    title:""
  },{ 
    name:"LesandPam_150.jpg",
    title:""
  },{ 
    name:"LesandPam_011.jpg",
    title:""
  },{ 
    name:"LesandPam_063.jpg",
    title:""
  },{ 
    name:"LesandPam_178.jpg",
    title:""
  },{ 
    name:"DSC_0005_22.jpg",
    title:""
  },{ 
    name:"LesandPam_125.jpg",
    title:""
  },{ 
    name:"PC010059_2.jpg",
    title:""
  },{ 
    name:"IMGP0449.JPG_6.jpg",
    title:""
  },{ 
    name:"DSC_0269.JPG_12.jpg",
    title:""
  },{ 
    name:"DSC_0204.JPG",
    title:""
  },{ 
    name:"IMGP0650.jpg",
    title:""
  },{ 
    name:"DSC_0355.jpg",
    title:""
  },{ 
    name:"LesandPam_188.jpg",
    title:""
  },{ 
    name:"LesandPam_058.jpg",
    title:""
  },{ 
    name:"IMGP0464.JPG_5.jpg",
    title:""
  },{ 
    name:"LesandPam_065.jpg",
    title:""
  },{ 
    name:"IMG_0494.jpg",
    title:""
  },{ 
    name:"PC010132_2.jpg",
    title:""
  },{ 
    name:"My CowGirl_3.jpg",
    title:""
  },{ 
    name:"LesandPam_129.jpg",
    title:""
  },{ 
    name:"IMG_0692.jpg",
    title:""
  },{ 
    name:"PC010106_2.jpg",
    title:""
  },{ 
    name:"IMG_0029_6.jpg",
    title:""
  },{ 
    name:"LesandPam_117.jpg",
    title:""
  },{ 
    name:"DSC_0172.JPG",
    title:""
  },{ 
    name:"DSC_0037.jpg",
    title:""
  },{ 
    name:"LesandPam_120.jpg",
    title:""
  },{ 
    name:"LesandPam_017.jpg",
    title:""
  },{ 
    name:"IMGP0653.jpg",
    title:""
  },{ 
    name:"LesandPam_005.jpg",
    title:""
  },{ 
    name:"LesandPam_072.jpg",
    title:""
  },{ 
    name:"Kiawah May 2004 014_3.jpg",
    title:""
  },{ 
    name:"LesandPam_014.jpg",
    title:""
  },{ 
    name:"LesandPam_059.jpg",
    title:""
  }
];

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










