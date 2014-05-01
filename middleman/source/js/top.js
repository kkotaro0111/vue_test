/* top.js */

var app = app || {};

$(function(){
  var contents = new Vue({
    el: "#links",
    data:{
      conts: [],
      shown: true 
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
      },
      hide: function(){
        this.$set("shown", false);
      },
      show: function(){
        this.$set("shown", true);
      }
    }
  });

  var pages = new Vue({
    el: "#pages",
    data: {
      currentPage: 0,
      name: "",
      pages: [],
      message: ""
    },
    created: function(){
      console.log("pages created", arguments);
    },
    ready: function(){
      console.log("pages ready", arguments);
    },
    attached: function(){
      console.log("pages attached", arguments);
    },
    detached: function(){
      console.log("pages detached", arguments);
    },
    beforeDestroy: function(){
      console.log("pages beforeDestroy", arguments);
    },
    afterDestory: function(){
      console.log("pages afterDestroy", arguments);
    },
    methods: {
      next: function(e){
        if( this.currentPage + 1 === this.pages.length ){
          contents.show();
          this.clear();
        }else{
          this.currentPage = ( this.currentPage + this.pages.length + 1 ) % this.pages.length;
        }
      },
      keyup: function(){
        //console.log("keyup", arguments);
        console.log("modelcheck", this);
      },
      setData: function(cont){
        this.$set("currentPage", 0);
        this.$set("pages", cont.pages);
        this.$set("name", cont.name);

        console.log( this.name);
        console.log( this.currentPage);

        contents.hide();
      },
      clear: function(){
        this.$set("pages", []);
        this.$set("name", "");
        this.$set("currentPage", 0);
        this.$set("message", "");
      }
    }
  });

  window.contents = contents;
  window.pages = pages;


});
