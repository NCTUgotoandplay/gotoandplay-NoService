// gotoandPlay.js
// Description:
// "gotoandPlay.js" is a extension module for gotoandPlay.
// Copyright 2018 NOOXY. All Rights Reserved.

'use strict';
let models_dict = require('./models.json')

function gotoandPlay(Me, NoService) {
  let Settings = Me.Settings;
  let _models;
  let _on_handler = {};

  // define you own funciton to be called in entry.js
  this.whateverfunction = (callback)=> {
    callback(false, 'haha');

    // call onwhateverfunction_called handler
    if(_on_handler['whateverfunction_called'])
      _on_handler['whateverfunction_called']();
  };

  // on event register
  this.on = (event, callback)=> {
    _on_handler[event] = callback;
  };

  this.launch = (callback)=> {
    NoService.Database.Model.doBatchSetup(models_dict, (err, models)=> {
      _models = models;
      if(callback)
        callback(err);
    });
  };

  this.searchPlaylist = (query, callback)=> {
    _models.Playlist.searchAll(query, (err, result)=> {
      if(err) {
        callback(err);
      }
      else {
        let _dict = {};
        for(let i=0; i<result.length; i++) {
          _dict[result[i].PlaylistId] = result[i];
        }
        callback(err, _dict);
      }
    });
  };

  this.getAllCatogories = (callback)=> {
    _models.Catogory.getAll((err, result)=> {
      if(err) {
        callback(err);
      }
      else {
        let _dict = {};
        for(let i=0; i<result.length; i++) {
          _dict[result[i].CatogoryId] = result[i];
        }
        callback(err, _dict);
      }
    });
  };

  this.getCatogoryMeta = (catogoryid, callback)=> {
    _models.Catogory.get(catogoryid, callback);
  };

  this.getPlaylistMeta = (playlistid, callback)=> {
    _models.Playlist.get(playlistid, callback);
  };

  this.getPlaylistTracks = ()=> {

  };

  this.getAudioBase64 = ()=> {

  };

  this.createPlaylist = ()=> {

  };

  this.editPlaylistMeta = ()=> {

  };

  this.addPlaylistTracks = ()=> {

  };

  this.createCatogory = ()=> {

  };

  this.editCatogory = ()=> {

  };

  this.addPlaylistTags = ()=> {

  };

  this.removePlaylistTags = ()=> {

  };

  this.close = ()=> {

  };
}

module.exports = gotoandPlay;
