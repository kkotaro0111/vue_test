/* top.js */

var app = app || {};

$(function(){
  var contents = new Vue({
    el: "#links",
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
      console.log("attached", arguments);
    },
    detached: function(){
      console.log("detached", arguments);
    },
    beforeDestroy: function(){
      console.log("beforeDestroy", arguments);
    },
    afterDestory: function(){
      console.log("afterDestroy", arguments);
    },
    methods: {
      selectCont: function(e){
        var idx = parseInt($(e.target).attr("id").replace(/#?cont/, ""));
        pages.setData(this.conts[idx]);
      }
    }
  });

  var pages = new Vue({
    el: "#pages",
    created: function(){
      console.log("created", arguments);
    },
    ready: function(){
      console.log("ready", arguments);
    },
    attached: function(){
      console.log("attached", arguments);
    },
    detached: function(){
      console.log("detached", arguments);
    },
    beforeDestroy: function(){
      console.log("beforeDestroy", arguments);
    },
    afterDestory: function(){
      console.log("afterDestroy", arguments);
    },
    methods: {
      next: function(e){
        this.index = ( this.index + this.pages.length + 1 ) % this.pages.length;
      },
      setData: function(cont){
        console.log("setData", cont);
        this.$set("index", 0);
        this.$set("pages", cont.pages);
        this.$set("name", cont.name);
      }
    }
  });

  window.contents = contents;


});
