module.exports = io => {

  io.on('connection', function(socket){
    console.log('a user connected');
    var defaultResp = getChatResponse();
    io.emit('chat-message', getChatResponse());

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat-message', function(msg){
      var resp = getChatResponse(msg);
      setTimeout(function(){
        io.emit('chat-message', resp);
      },1000);
    });

  });
}

function getChatResponse(msg){
  console.log(msg);
  if(!msg || msg == ""){
    return chatResponses['hello, hi'].resp;
  }
  var respMsg;

  if(chatResponses[msg.toLowerCase()]){
    return chatResponses[msg.toLowerCase()].resp;
  }

  var keys = Object.keys(chatResponses),
      obj ={};

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i],
        subkeys = key.split(/,\s?/),
        target = chatResponses[key];
    // delete obj[key];
    subkeys.forEach(function(key) { obj[key] = target; })
  }

  if(obj[msg.toLowerCase()]){
    return obj[msg.toLowerCase()].resp;
  }else{
    return chatResponses.default.resp;
  }

}

var chatResponses = {
  "default": {
    resp: {
      msg: "Type help for instructions",
      type: "text_template"
    }
  },
  "hello, hi": {
    resp: {
      msg: "Hi,there. Type yes to Get Started",
      type: "text_template"
    }
  },
  "help, yes":{
    resp: {
      msg:"Type 'image' for a image template \n"+
          "Type 'button' for a button template\n"+
          "Type 'video' for a video template.",
      type: "text_template"
    }
  },
  "image, media-image": {
    resp: {
      msg:"Text with Media\nType video for video template",
      type:"media_template",
      media: {
        url: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTkyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE5MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTYyOGMyY2NlOTEgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNjI4YzJjY2U5MSI+PHJlY3Qgd2lkdGg9IjE5MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI3MC4wNTQ2ODc1IiB5PSIxMDQuNSI+MTkyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==",
        type: "image",
      },
      buttons: [
        {
          "type": "web_url",
          "url": "http://www.google.com/",
          "title": "View Website",
        }
      ]
    }
  },
  "video, media-video": {
    resp: {
      msg:"Text with Media",
      type:"media_template",
      media: {
        url: "/video/video.mp4",
        type: "video",
      },
      buttons: [
        {
          "type": "web_url",
          "url": "http://www.google.com/",
          "title": "View Website",
        }
      ]
    }
  },
  "button": {
    resp: {
      msg: "Text with Image",
      type: "button_template",
      buttons: [
        {
          "type":"web_url",
          "url":"https://www.google.com",
          "title":"Visit Site"
        },
        {
          "type":"web_url",
          "url":"https://www.messenger.com",
          "title":"Visit Messenger"
        }
      ]
    }
  }
}
