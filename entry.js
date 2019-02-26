// NoService/services/GotoNPlay/entry.js
// Description:
// "GotoNPlay/entry.js" description.
// Copyright 2018 NOOXY. All Rights Reserved.
'use strict';

function Service(Me, NoService) {
  // Initialize your service here synchronous. Do not use async here!

  // Get the service socket of your service
  let ServiceSock = NoService.Service.ServiceSocket;
  // BEWARE! To prevent callback error crash the system.
  // If you call an callback function which is not NoService provided. Such as setTimeout(callback, timeout).
  // You need to wrap the callback funciton by NoService.SafeCallback.
  // E.g. setTimeout(NoService.SafeCallback(callback), timeout)
  let safec = NoService.SafeCallback;

  // import NoService to GotoNPlay module
  const GotoNPlay = new (require('./gotoandPlay'))(Me, NoService);

  GotoNPlay.on('OnlineCountChanged', ()=> {
    ServiceSock.broadcastEvent();
  });

  ServiceSock.def('searchPlayList', (json, entityID, returnJSON)=> {
    returnJSON(false, null);
  });

  ServiceSock.def('getCatogoryPlayLists', (json, entityID, returnJSON)=> {
    returnJSON(false, null);
  });

  ServiceSock.def('getPlaylistMeta', (json, entityID, returnJSON)=> {
    returnJSON(false, null);
  });

  ServiceSock.def('getPlaylistItems', (json, entityID, returnJSON)=> {
    returnJSON(false, null);
  });

  ServiceSock.def('getAudioBase64', (json, entityID, returnJSON)=> {
    returnJSON(false, null);
  });

  ServiceSock.def('getOnlineCount', (json, entityID, returnJSON)=> {
    NoService.Service.Entity.getfliteredEntitiesList("service=gotoandPlay,mode=normal", (err, list)=> {
      returnJSON(false, {r:list.length});
    });
  });

  // Safe define a ServiceFunction.
  ServiceSock.sdef('editPlaylistMeta', (json, entityID, returnJSON)=> {
    // Code here for JSONfunciton
    // Return Value for ServiceFunction call. Otherwise remote will not recieve funciton return value.
    let json_be_returned = {
      d: 'Hello! NOOXY Service Framework!'
    }
    // First parameter for error, next is JSON to be returned.
    returnJSON(false, json_be_returned);
  },
  // In case fail.
  ()=>{
    console.log('Auth Failed.');
  });

  // Safe define a ServiceFunction.
  ServiceSock.sdef('addPlaylistItems', (json, entityID, returnJSON)=> {
    // Code here for JSONfunciton
    // Return Value for ServiceFunction call. Otherwise remote will not recieve funciton return value.
    let json_be_returned = {
      d: 'Hello! NOOXY Service Framework!'
    }
    // First parameter for error, next is JSON to be returned.
    returnJSON(false, json_be_returned);
  },
  // In case fail.
  ()=>{
    console.log('Auth Failed.');
  });

  // ServiceSocket.onConnect, in case on new connection.
  ServiceSock.on('connect', (entityID, callback) => {
    callback(false);
  });
  // ServiceSocket.onClose, in case connection close.
  ServiceSock.on('close', (entityID, callback) => {
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
