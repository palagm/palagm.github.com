var lazyLoader = {
  	scrollable: undefined,
    cache: [],
    mobileScreenSize: 500,
    //tinyGif: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',

    addObservers: function(element) {
      // addEventListener('scroll', lazyLoader.throttledLoad);
      // addEventListener('resize', lazyLoader.throttledLoad);
      // element.addEventListener('scroll', lazyLoader.throttledLoad);
      // element.addEventListener('resize', lazyLoader.throttledLoad);
    },

    removeObservers: function(element) {
      // removeEventListener('scroll', lazyLoader.throttledLoad, false);
      // removeEventListener('resize', lazyLoader.throttledLoad, false);
      // element.removeEventListener('scroll', lazyLoader.throttledLoad);
      // element.removeEventListener('resize', lazyLoader.throttledLoad);
    },

    throttleTimer: new Date().getTime(),

    throttledLoad: function() {
      var now = new Date().getTime();
      if ((now - lazyLoader.throttleTimer) >= 200) {
        lazyLoader.throttleTimer = now;
        lazyLoader.loadVisibleImages();
      }
    },

    loadVisibleImages: function() {
      // var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      // var pageHeight = window.innerHeight || document.documentElement.clientHeight;
      var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      var pageWidth = window.innerWidth || document.documentElement.clientWidth;
      var range = {
        min: scrollX - 200,
        max: scrollX + pageWidth + 600
      };

      var i = 0;
      while (i < lazyLoader.cache.length) {
        var image = lazyLoader.cache[i];
        // var imagePosition = getOffsetTop(image);
        // var imagePosition = getOffsetLeft(image);
        var imageRect = image.getBoundingClientRect();
        var imageHeight = image.height || 0;
        var imageWidth = image.width || 0;

        if ((imageRect.left >= range.min - imageWidth) && (imageRect.left <= range.max)) {
          var mobileSrc = image.getAttribute('data-src-mobile');

          image.onload = function() {
            this.className = 'lazy-loaded';
          };

          if (mobileSrc && screen.width <= lazyLoader.mobileScreenSize) {
            image.src = mobileSrc;
          }
          else {
            image.src = image.getAttribute('data-src');
          }

          image.removeAttribute('data-src');
          image.removeAttribute('data-src-mobile');

          lazyLoader.cache.splice(i, 1);
          continue;
        }

        i++;
      }

      if (lazyLoader.cache.length === 0) {
        lazyLoader.removeObservers(scrollable);
      }
    },

    init: function(scrollable_element) {
      scrollable = scrollable_element;
      // Patch IE7- (querySelectorAll)
      if (!document.querySelectorAll) {
        document.querySelectorAll = function(selector) {
          var doc = document,
              head = doc.documentElement.firstChild,
              styleTag = doc.createElement('STYLE');
          head.appendChild(styleTag);
          doc.__qsaels = [];
          styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
          window.scrollBy(0, 0);
          return doc.__qsaels;
        }
      }

      // addEventListener('load', function _lazyLoaderInit() {
        var imageNodes = scrollable.querySelectorAll('img[data-src]');

        for (var i = 0; i < imageNodes.length; i++) {
          var imageNode = imageNodes[i];

          // Add a placeholder if one doesn't exist
          //imageNode.src = imageNode.src || lazyLoader.tinyGif;

          lazyLoader.cache.push(imageNode);
        }

        lazyLoader.addObservers(scrollable);
        lazyLoader.loadVisibleImages();

        // removeEventListener('load', _lazyLoaderInit, false);
      // });
    }
  };

  // For IE7 compatibility
  // Adapted from http://www.quirksmode.org/js/findpos.html
  function getOffsetTop(el) {
    var val = 0;
    if (el.offsetParent) {
      do {
        val += el.offsetTop;
      } while (el = el.offsetParent);
      return val;
    }
  }
  function getOffsetLeft(el) {
    var val = 0;
    if (el.offsetParent) {
      do {
        val += el.offsetLeft;
      } while (el = el.offsetParent);
      return val;
    }
  }