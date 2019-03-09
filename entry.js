// NoService/services/GotoNPlay/entry.js
// Description:
// "GotoNPlay/entry.js" description.
// Copyright 2018 NOOXY. All Rights Reserved.
'use strict';

function Service(Me, NoService) {
  // Initialize your service here synchronous. Do not use async here!

  // Get the service socket of your service
  let ServiceSock = NoService.Service.ServiceSocket;
  let online_count = 0;

  // import NoService to GotoNPlay module
  const GotoNPlay = new (require('./gotoandPlay'))(Me, NoService);

  // Start defining servicefunctions

  // Input query and find playlist that match the result.
  ServiceSock.def('searchPlaylist', (json, entityID, returnJSON)=> {
    GotoNPlay.searchPlaylist(json.q, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get all gotoandPlay playlist catogroies.
  ServiceSock.def('getAllCatogories', (json, entityID, returnJSON)=> {
    GotoNPlay.getAllCatogories((err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Input catogory id and find playlist that match the result.
  ServiceSock.def('getCatogoryPlaylists', (json, entityID, returnJSON)=> {
    GotoNPlay.getCatogoryPlaylists(json.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist detail information by playlist id
  ServiceSock.def('getPlaylistMeta', (json, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistMeta(json.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getPlaylistTracks', (json, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(json.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getAudioBase64', (json, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(json.id, json.it, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get current online count
  ServiceSock.def('getOnlineCount', (json, entityID, returnJSON)=> {
    NoService.Service.Entity.getfliteredEntitiesList("service=gotoandPlay,mode=normal", (err, list)=> {
      returnJSON(false, {r:list.length});
    });
  });


  // Below operations should be accesible only for superuser

  // Create a playlist that contains audio sources
  ServiceSock.sdef('createPlaylist', (json, entityID, returnJSON)=> {
    GotoNPlay.createPlaylist(json.id, json.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Edit playlist's detail information
  ServiceSock.sdef('editPlaylistMeta', (json, entityID, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(json.id, json.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Append an track to the existed list.
  ServiceSock.sdef('addPlaylistTracks', (json, entityID, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(json.id, json.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Create a catogory that contains playlists
  ServiceSock.sdef('createCatogory', (json, entityID, returnJSON)=> {
    GotoNPlay.createCatogory(json.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('editCatogory', (json, entityID, returnJSON)=> {
    GotoNPlay.editCatogory(json.id, json.mt, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('addPlaylistTags', (json, entityID, returnJSON)=> {
    GotoNPlay.addPlaylistTags(json.tg, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('removePlaylistTags', (json, entityID, returnJSON)=> {
    GotoNPlay.removePlaylistTags(json.tg, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityID, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });


  // ServiceSocket.onConnect, in case on new connection.
  ServiceSock.on('connect', (entityID, callback) => {
    online_count++;
    ServiceSock.broadcastEvent("OnlineCountChanged", {c: online_count});
    callback(false);
  });
  // ServiceSocket.onClose, in case connection close.
  ServiceSock.on('close', (entityID, callback) => {
    online_count--;
    callback(false);
  });

  // Here is where your service start
  this.start = ()=> {
    GotoNPlay.launch();
  }

  // If the daemon stop, your service recieve close signal here.
  this.close = ()=> {
    // Close your service here synchronous. Do not use async here!
    // Saving state of you service.
    // Please save and manipulate your files in this directory
    GotoNPlay.close();
  }
}

// Export your work for system here.
module.exports = Service;
