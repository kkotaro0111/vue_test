/* base.js */

var djs = {};//Default setting JavaScript
 
djs.w = window;
djs.d = djs.w.document;

//IEでconsole未定義エラーを出さないようにする。
(function(win){
  if(!win.console){
    win.console = {};
  }
  var names = [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn' ];
  for(var i = 0, len = names.length; i < len; i++){
    if( !win.console[names[i]] ){
      win.console[names[i]] = function(){};
    }
  }
})(djs.w);


//Safari等、bindが実装されてない実装系に対してbindに対応させる
if(!Function.prototype.hasOwnProperty("bind")){
  Function.prototype.bind = function(){
    var func = this;
    var t = arguments[0];
    var len = arguments.length;
    var newargary = [];
    for(var i = 1; i < len; i++){
      newargary.push(arguments[i]);
    }
    return function(){
      return func.apply(t, newargary);
    }
  }
}

(function(){
  djs.b = {};

  function setBrowser(browser){
    djs.b.value = browser;
    djs.b["is"+browser] = true;
    djs.b.modern = !/^ie/i.test(browser);
  }

  if(typeof djs.d.documentElement.style.maxHeight !== "undefined"){
    if(!/*@cc_on!@*/false){
      if(typeof djs.w.mozAnimationStartTime !== "undefined"){
        setBrowser("firefox");
      }else if(typeof djs.w.opera !== "undefined"){
        setBrowser("opera");
      }else{
        if(typeof djs.w.Image === "function"){
          setBrowser("chrome");
        }else if(typeof djs.w.Image === "object"){
          setBrowser("safari");
        }else{
          setBrowser("other");
        }
      }
    }else if(typeof djs.d.documentMode !== "undefined"){
      setBrowser("ie"+djs.d.documentMode);
    }else{
      setBrowser("ie7");
    }
  }else{
    setBrowser("ie6");
  }
})();


if(typeof jQuery !== "undefined"){

  console.info("jQuery version : " + jQuery().jquery);

  if(typeof jQuery.effects != "undefined"){
    console.log("jQuery ui version: " + $.effects.version);
  }

  djs.cookie = {
    datevalue: {
      weekname:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthname:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    get: function(key){
      var cookies = djs.d.cookie;
      var cookiesarray = cookies.split(";");
      var len = cookiesarray.length;
      var reg = new RegExp("^\\s*" + key + "=");
      for(var i = 0; i < len; i++){
        if(reg.test(cookiesarray[i])){
          return unescape(cookiesarray[i].split("=")[1]);
        }
      }
    },
    set: function(key, value, expires){
      var cookieRecipe = key + "=" + escape(value) + ";";
      if(expires||false){
        //Expires format: Mon, 31-Jan-2011 12:34:56 GMT
        var normalexp = new Date(expires);
        if(!/Invalid Date/.test(normalexp.toString)){
          var normalexpstring = this.datevalue.weekname[normalexp.getUTCDay()] + ", " +
            normalexp.getUTCDate() + "-" +
            this.datevalue.monthname[normalexp.getUTCMonth()] + "-" +
            normalexp.getUTCFullYear() + " " +
            normalexp.getUTCHours() + ":" +
            normalexp.getUTCMinutes() + ":" +
            normalexp.getUTCSeconds() + " " +
            "GMT";
          cookieRecipe += " " + "expires=" + normalexpstring + ";";
        }
      }
      djs.d.cookie = cookieRecipe;
    }
  };
}
