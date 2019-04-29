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
  // Get programs.
  ServiceSock.sdef('updateChatroomSettings', (data, entityID, returnJSON)=> {
    GotoNPlay.updateChatroomSettings(data, (err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getChatroomSettings', (data, entityID, returnJSON)=> {
    GotoNPlay.getChatroomSettings((err, result)=> {
      returnJSON(false, result);
    });
  });
  // Get programs.
  ServiceSock.sdef('updateReact', (data, entityID, returnJSON)=> {
    GotoNPlay.updateFromGitAndComplieReact((err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getPrograms', (data, entityID, returnJSON)=> {
    GotoNPlay.getPrograms((err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.sdef('updatePrograms', (data, entityID, returnJSON)=> {
    GotoNPlay.updatePrograms(data, (err)=> {
      if(!err) {
        ServiceSock.emitAll("ProgramsChanged", data);
      }
      returnJSON(err, null);
    });
  });

  // Push notification.
  ServiceSock.def('pushNotification', (data, entityID, returnJSON)=> {
    ServiceSock.emitAll('Notification', data);
    returnJSON(false, null);
  });

  // Input query and find playlist that match the result.
  ServiceSock.def('searchPlaylist', (data, entityID, returnJSON)=> {
    GotoNPlay.searchPlaylist(data.q, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get all gotoandPlay playlist catogroies.
  ServiceSock.def('getAllCatogories', (data, entityID, returnJSON)=> {
    GotoNPlay.getAllCatogories((err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Input catogory id and find playlist that match the result.
  ServiceSock.def('getCatogoryMeta', (data, entityID, returnJSON)=> {
    GotoNPlay.getCatogoryMeta(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist detail information by playlist id
  ServiceSock.def('getPlaylistMeta', (data, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistMeta(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getPlaylistTracks', (data, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getAudioBase64', (data, entityID, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(data.id, data.it, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get current online count
  ServiceSock.def('getOnlineCount', (data, entityID, returnJSON)=> {
    returnJSON(false, online_count);
  });


  // Below operations should be accesible only for superuser

  // Create a playlist that contains audio sources
  ServiceSock.sdef('createPlaylist', (data, entityID, returnJSON)=> {
    GotoNPlay.createPlaylist(data.id, data.mt, (err, result)=> {
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
  ServiceSock.sdef('editPlaylistMeta', (data, entityID, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(data.id, data.mt, (err, result)=> {
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
  ServiceSock.sdef('addPlaylistTracks', (data, entityID, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(data.id, data.mt, (err, result)=> {
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
  ServiceSock.sdef('createCatogory', (data, entityID, returnJSON)=> {
    GotoNPlay.createCatogory(data.mt, (err, result)=> {
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
  ServiceSock.sdef('editCatogory', (data, entityID, returnJSON)=> {
    GotoNPlay.editCatogory(data.id, data.mt, (err)=> {
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
  ServiceSock.sdef('addPlaylistTags', (data, entityID, returnJSON)=> {
    GotoNPlay.addPlaylistTags(data.tg, (err)=> {
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
  ServiceSock.sdef('removePlaylistTags', (data, entityID, returnJSON)=> {
    GotoNPlay.removePlaylistTags(data.tg, (err)=> {
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
    ServiceSock.emitAll("OnlineCountChanged", online_count);
    callback(false);
  });
  // ServiceSocket.onClose, in case connection close.
  ServiceSock.on('close', (entityID, callback) => {
    online_count--;
    ServiceSock.emitAll("OnlineCountChanged", online_count);
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
