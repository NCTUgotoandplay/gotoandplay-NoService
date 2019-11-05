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
  ServiceSock.sdef('addSuggestedInfoCards', (data, entityId, returnJSON)=> {
    GotoNPlay.addSuggestedInformationCards(data, (err, result)=> {
      returnJSON(false, result);
    });
  });
  // Get programs.
  ServiceSock.sdef('deleteSuggestedInfoCards', (data, entityId, returnJSON)=> {
    GotoNPlay.deleteSuggestedInformationCards(data, (err, result)=> {
      returnJSON(false, result);
    });
  });
  // Get programs.
  ServiceSock.sdef('updateSuggestedInfoCards', (data, entityId, returnJSON)=> {
    GotoNPlay.updateSuggestedInformationCards(data, (err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getSuggestedInfoCards', (data, entityId, returnJSON)=> {
    GotoNPlay.getSuggestedInformationCards((err, result)=> {
      returnJSON(false, result);
    });
  });

  ServiceSock.def('getAllInfoCards', (data, entityId, returnJSON)=> {
    GotoNPlay.getAllInformationCards((err, result)=> {
      returnJSON(false, result);
    });
  });

  ServiceSock.def('getInfoCard', (data, entityId, returnJSON)=> {
    GotoNPlay.getInformationCard(data, (err, result)=> {
      returnJSON(false, result);
    });
  });

  ServiceSock.sdef('createInfoCard', (data, entityId, returnJSON)=> {
    GotoNPlay.createInformationCard(data, (err, result)=> {
      returnJSON(false, err?err.toString():'OK');
    });
  });

  ServiceSock.sdef('updateInfoCard', (data, entityId, returnJSON)=> {
    GotoNPlay.updateInformationCard(data, (err, result)=> {
      returnJSON(false, err?err.toString():'OK');
    });
  });
  // Get programs.
  ServiceSock.sdef('updateChatroomSettings', (data, entityId, returnJSON)=> {
    GotoNPlay.updateChatroomSettings(data, (err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getChatroomSettings', (data, entityId, returnJSON)=> {
    GotoNPlay.getChatroomSettings((err, result)=> {
      returnJSON(false, result);
    });
  });
  // Get programs.
  ServiceSock.sdef('updateAboutUsInfoCardId', (data, entityId, returnJSON)=> {
    GotoNPlay.updateAboutUsInfoCardId(data, (err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getAboutUsInfoCardId', (data, entityId, returnJSON)=> {
    GotoNPlay.getAboutUsInfoCardId((err, result)=> {
      returnJSON(false, result);
    });
  });
  // Get programs.
  ServiceSock.sdef('updateReact', (data, entityId, returnJSON)=> {
    GotoNPlay.updateFromGitAndComplieReact((err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.def('getPrograms', (data, entityId, returnJSON)=> {
    GotoNPlay.getPrograms((err, result)=> {
      returnJSON(false, result);
    });
  });

  // Get programs.
  ServiceSock.sdef('updatePrograms', (data, entityId, returnJSON)=> {
    GotoNPlay.updatePrograms(data, (err)=> {
      if(!err) {
        ServiceSock.emitAll("ProgramsChanged", data);
      }
      returnJSON(err, null);
    });
  });

  // Get programs.
  ServiceSock.sdef('updateAudioSettings', (data, entityId, returnJSON)=> {
    GotoNPlay.updateAudioSettings(data, (err)=> {
      if(!err) {
        ServiceSock.emitAll("AudioSettingsChanged", data);
      }
      returnJSON(err, null);
    });
  });

  // Get programs.
  ServiceSock.sdef('getAudioSettings', (data, entityId, returnJSON)=> {
    GotoNPlay.getAudioSettings((err, result)=> {
      returnJSON(err, result);
    });
  });

  // Push notification.
  ServiceSock.def('pushNotification', (data, entityId, returnJSON)=> {
    ServiceSock.emitAll('Notification', data);
    returnJSON(false, null);
  });

  // Input query and find playlist that match the result.
  ServiceSock.def('searchPlaylist', (data, entityId, returnJSON)=> {
    GotoNPlay.searchPlaylist(data.q, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get all gotoandPlay playlist catogroies.
  ServiceSock.def('getAllCatogories', (data, entityId, returnJSON)=> {
    GotoNPlay.getAllCatogories((err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Input catogory id and find playlist that match the result.
  ServiceSock.def('getCatogoryMeta', (data, entityId, returnJSON)=> {
    GotoNPlay.getCatogoryMeta(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist detail information by playlist id
  ServiceSock.def('getPlaylistMeta', (data, entityId, returnJSON)=> {
    GotoNPlay.getPlaylistMeta(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getPlaylistTracks', (data, entityId, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(data.id, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get playlist's tracks in list by playlist id
  ServiceSock.def('getAudioBase64', (data, entityId, returnJSON)=> {
    GotoNPlay.getPlaylistTracks(data.id, data.it, (err, result)=> {
      returnJSON(false, {r: result});
    });
  });

  // Get current online count
  ServiceSock.def('getOnlineCount', (data, entityId, returnJSON)=> {
    returnJSON(false, online_count);
  });


  // Below operations should be accesible only for superuser

  // Create a playlist that contains audio sources
  ServiceSock.sdef('createPlaylist', (data, entityId, returnJSON)=> {
    GotoNPlay.createPlaylist(data.id, data.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Edit playlist's detail information
  ServiceSock.sdef('editPlaylistMeta', (data, entityId, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(data.id, data.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Append an track to the existed list.
  ServiceSock.sdef('addPlaylistTracks', (data, entityId, returnJSON)=> {
    GotoNPlay.editPlaylistMeta(data.id, data.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // Create a catogory that contains playlists
  ServiceSock.sdef('createCatogory', (data, entityId, returnJSON)=> {
    GotoNPlay.createCatogory(data.mt, (err, result)=> {
      returnJSON(false, {r: result});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('editCatogory', (data, entityId, returnJSON)=> {
    GotoNPlay.editCatogory(data.id, data.mt, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('addPlaylistTags', (data, entityId, returnJSON)=> {
    GotoNPlay.addPlaylistTags(data.tg, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });

  // edit a catogory that contains playlists
  ServiceSock.sdef('removePlaylistTags', (data, entityId, returnJSON)=> {
    GotoNPlay.removePlaylistTags(data.tg, (err)=> {
      returnJSON(false, {e: err});
    });
  },
  // In case auth fail.
  ()=>{
    NoService.Service.getEntityOwner(entityId, (err, username)=> {
      console.log('GotoNPlay editPlaylistMeta Auth Failed. Username: '+username);
    });
  });


  // ServiceSocket.onConnect, in case on new connection.
  ServiceSock.on('connect', (entityId, callback) => {
    online_count++;
    ServiceSock.emitAll("OnlineCountChanged", online_count);
    callback(false);
  });
  // ServiceSocket.onClose, in case connection close.
  ServiceSock.on('close', (entityId, callback) => {
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
