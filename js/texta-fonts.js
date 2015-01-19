/*jshint browser: true, undef: true, unused: true, evil: true */

/*

 MyFonts Webfont Build ID 2956117, 2015-01-19T16:16:42-0500

 The fonts listed in this notice are subject to the End User License
 Agreement(s) entered into by the website owner. All other parties are
 explicitly restricted from using the Licensed Webfonts(s).

 You may obtain a valid license at the URLs below.

 Webfont: Texta-Heavy by Latinotype
 URL: http://www.myfonts.com/fonts/latinotype/texta/heavy/

 Webfont: Texta-It by Latinotype
 URL: http://www.myfonts.com/fonts/latinotype/texta/italic/

 Webfont: Texta-Regular by Latinotype
 URL: http://www.myfonts.com/fonts/latinotype/texta/regular/


 License: http://www.myfonts.com/viewlicense?type=web&buildid=2956117
 Licensed pageviews: 10,000
 Webfonts copyright: Copyright (c) 2014 by Daniel Hernandez &amp; Miguel Hernandez. All rights reserved.

 ? 2015 MyFonts Inc
*/

( function() {

var customPath = '../fonts/';

// add MyFonts counter
var count = document.createElement("script");
count.type = "text/javascript";
count.async = true;
count.src = "//hello.myfonts.net/count/2d1b55";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(count, s);

var browserVersion, webfontType;

var woffEnabled = true;
var svgEnabled = true;
var woff2Enabled = true;

var path = customPath;
var wfpath = path;

var browsers = [{
    regex: "MSIE (\\d+\\.\\d+)",
    versionRegex: "new Number(RegExp.$1)",
    type: [{
      version: 9,
      type: "woff"
    }, {
      version: 5,
      type: "eot"
    }]
  }, {
    regex: "Trident/(\\d+\\.\\d+); (.+)?rv:(\\d+\\.\\d+)",
    versionRegex: "new Number(RegExp.$3)",
    type: [{
      version: 11,
      type: "woff"
    }]
  }, {
    regex: "Firefox[/s](\\d+\\.\\d+)",
    versionRegex: "new Number(RegExp.$1)",
    type: [{
      version: 3.6,
      type: "woff"
    }, {
      version: 3.5,
      type: "ttf"
    }]
  }, {
    regex: "Chrome/(\\d+\\.\\d+)",
    versionRegex: "new Number(RegExp.$1)",
    type: [{
      version: 36,
      type: "woff2"
    }, {
      version: 6,
      type: "woff"
    }, {
      version: 4,
      type: "ttf"
    }]
  }, {
    regex: "Mozilla.*Android (\\d+\\.\\d+).*AppleWebKit.*Safari",
    versionRegex: "new Number(RegExp.$1)",
    type: [{
      version: 4.1,
      type: "woff"
    }, {
      version: 3.1,
      type: "svg#wf"
    }, {
      version: 2.2,
      type: "ttf"
    }]
  }, {
    regex: "Mozilla.*(iPhone|iPad).* OS (\\d+)_(\\d+).* AppleWebKit.*Safari",
    versionRegex: "new Number(RegExp.$2) + (new Number(RegExp.$3) / 10)",
    unhinted: true,
    type: [{
      version: 5,
      type: "woff"
    }, {
      version: 4.2,
      type: "ttf"
    }, {
      version: 1,
      type: "svg#wf"
    }]
  }, {
    regex: "Mozilla.*(iPhone|iPad|BlackBerry).*AppleWebKit.*Safari",
    versionRegex: "1.0",
    type: [{
      version: 1,
      type: "svg#wf"
    }]
  }, {
    regex: "Version/(\\d+\\.\\d+)(\\.\\d+)? Safari/(\\d+\\.\\d+)",
    versionRegex: "new Number(RegExp.$1)",
    type: [{
      version: 5.1,
      type: "woff"
    }, {
      version: 3.1,
      type: "ttf"
    }]
  }, {
    regex: "Opera/(\\d+\\.\\d+)(.+)Version/(\\d+\\.\\d+)(\\.\\d+)?",
    versionRegex: "new Number(RegExp.$3)",
    type: [{
      version: 24,
      type: "woff2"
    }, {
      version: 11.1,
      type: "woff"
    }, {
      version: 10.1,
      type: "ttf"
    }]
  }],
  browLen = browsers.length,
  suffix = "",
  i = 0;
a: for (; i < browLen; i++) {
  var browser = browsers[i];
  var regex = RegExp( browser.regex );

  if ( regex.test( navigator.userAgent ) ) {
    browserVersion = eval( browser.versionRegex );
    var typeLen = browser.type.length;
    for ( j = 0; j < typeLen; j++ ) {
      var browserType = browser.type[j];

      if ( browserVersion >= browserType.version ) {
        suffix = browser.unhinted ? '_unhinted' : '';
        webfontType = browserType.type;
        var isWoffType = webfontType != 'woff' || woffEnabled;
        var isWoff2Type = webfontType != 'woff2' || woff2Enabled;
        var isSvgType = webfontType != 'svg#wf' || svgEnabled;

        if ( isWoffType && isWoff2Type && isSvgType  ) {
          break a;
        }
      }
    }
  } else {
    webfontType = "woff";
  }
}




// use unhinted on Mac & Android
var isMacAndroid = /(Macintosh|Android)/.test( navigator.userAgent );
if ( isMacAndroid && webfontType != 'svg#wf' ) {
  suffix = "_unhinted";
}

var head = document.getElementsByTagName("head")[0],
  stylesheet = document.createElement("style");
stylesheet.setAttribute("type", "text/css");
head.appendChild(stylesheet);

var fonts = [{
    fontFamily: "Texta Heavy",
    url: wfpath + "2D1B55_0" + suffix + "_0." + webfontType
  }, {
    fontFamily: "Texta Italic",
    url: wfpath + "2D1B55_1" + suffix + "_0." + webfontType
  }, {
    fontFamily: "Texta Regular",
    url: wfpath + "2D1B55_2" + suffix + "_0." + webfontType
  }];

for ( var len = fonts.length, css = "", i = 0; i < len; i++ ) {
  var format = "svg#wf" == webfontType ? 'format("svg")' : "ttf" == webfontType ? 'format("truetype")' : "eot" == webfontType ? "" : 'format("' + webfontType + '")',
    css = css + ("@font-face{font-family: " + fonts[i].fontFamily + ";src:url(" + fonts[i].url + ")" + format +
      ";");

  if ( fonts[i].fontWeight ) {
    css += "font-weight: " + fonts[i].fontWeight + ";";
  }

  if ( fonts[i].fontStyle ) {
    css += "font-style: " + fonts[i].fontStyle + ";";
  }

  css += "}";
}


if ( stylesheet.styleSheet ) {
  stylesheet.styleSheet.cssText = css;
} else {
  stylesheet.innerHTML = css;
}

})();
