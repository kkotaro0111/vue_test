/* top.js */

var app = app || {};

$(function(){
  $.ajax({
    url: "./json/data.json",
    dataType: "json",
  }).then(function(data){
    console.log(data);
    app.data = data;
  });

  var contents = new Vue({
    el: "#main",
    data:{
      name: "",
      pages: [],
      currentPage: 0
    },
    methods: {
      setContent: function(e){
        console.log(this, e, e.currentTarget, e.target );
        var t$ = $(e.target);
        if( t$.hasClass("cont")){
          var conts$ = $("#links").find(".cont");
          var contindex = conts$.index(t$);

          var usedata = app.data[contindex];
          if( usedata ){
            this.name = usedata.name;
            this.pages = usedata.pages;
          }
        }
      },
      next: function(e){
        this.currentPage = ( this.currentPage + this.pages.length + 1 ) % this.pages.length;
      }
    }
  });

  window.contents = contents;

});
