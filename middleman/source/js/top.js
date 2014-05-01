/* top.js */

var app = app || {};

$(function(){
  var contents = new Vue({
    el: "#main",
    data:{
      conts: [],
      name: "",
      pages: [],
      currentPage: 0
    },
    created: function(){
      console.log("created", arguments);
      var self = this;
      $.ajax({
        url: "./json/data.json",
        dataType: "json",
      }).then(function(data){
        console.log(data);
        self.conts = data;
      });
    },
    ready: function(){
      console.log("ready", arguments);
    },
    attached: function(){
      console.log("attached", artuments);
    },
    detached: function(){
      console.log("detached", artuments);
    },
    beforeDestroy: function(){
      console.log("beforeDestroy", artuments);
    },
    afterDestory: function(){
      console.log("afterDestroy", artuments);
    },
    methods: {
      setContent: function(e){
        console.log(this, e, e.currentTarget, e.target );
        var t$ = $(e.target);
        if( t$.hasClass("cont")){
          var conts$ = $("#links").find(".cont");
          var contindex = conts$.index(t$);

          var usedata = this.conts[contindex];
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
