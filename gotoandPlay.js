// gotoandPlay.js
// Description:
// "gotoandPlay.js" is a extension module for gotoandPlay.
// Copyright 2018 NOOXY. All Rights Reserved.

'use strict';
let models_dict = require('./models.json')
const fs = require('fs');

const { exec, execSync } = require('child_process');

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
      if(!fs.existsSync('./timetable.json')) {
        fs.writeFileSync('./timetable.json', '{"show_days": [0, 0, 0, 0, 0, 0, 0], "show_segments":[], "segments":{}}');
      }
      if(!fs.existsSync('./chatroom.json')) {
        fs.writeFileSync('./chatroom.json', '{"channel_id": null, "welcome_message":null}');
      }
      if(!fs.existsSync('./suggested_info_cards.json')) {
        fs.writeFileSync('./suggested_info_cards.json', '[]');
      }
      if(!fs.existsSync('./about_us_info_card_id.json')) {
        fs.writeFileSync('./about_us_info_card_id.json', '');
      }
      if(!fs.existsSync('./audio.json')) {
        fs.writeFileSync('./audio.json', '{"audio_source": null, "do_audio_source_alter":false, "alternative_audio_source": null}');
      }
    });
  };

  this.updateFromGitAndComplieReact = (callback)=> {
    exec('chmod +x '+__dirname+'/update_react.sh' , (err, stdout, stderr) => {
      if(err) {
        callback(err, false);
      }
      else {
        exec(__dirname+'/update_react.sh '+Settings.react_path, (err, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          callback(err, err);
        });
      }
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

  this.updatePrograms = (data, callback)=> {
    try {
      fs.writeFileSync('./timetable.json', JSON.stringify(data));
      callback(false);
    }
    catch(err) {
      callback(err);
    }
  };

  this.getPrograms = (callback)=> {
    try {
      let result = JSON.parse(fs.readFileSync('./timetable.json', 'utf8'));
      callback(false, result);
    }
    catch(err) {
      callback(err);
    }
  };

  this.getAudioSettings = (callback)=> {
    try {
      let result = JSON.parse(fs.readFileSync('./audio.json', 'utf8'));
      callback(false, result);
    }
    catch(err) {
      callback(err);
    }
  };

  this.updateAudioSettings = (data, callback)=> {
    try {
      fs.writeFileSync('./audio.json', JSON.stringify(data));
      callback(false);
    }
    catch(err) {
      callback(err);
    }
  };

  this.updateChatroomSettings = (data, callback)=> {
    try {
      fs.writeFileSync('./chatroom.json', JSON.stringify(data));
      callback(false);
    }
    catch(err) {
      callback(err);
    }
  };

  this.getChatroomSettings = (callback)=> {
    try {
      let result = JSON.parse(fs.readFileSync('./chatroom.json', 'utf8'));
      callback(false, result);
    }
    catch(err) {
      callback(err);
    }
  };

  this.updateAboutUsInfoCardId = (data, callback)=> {
    try {
      fs.writeFileSync('./about_us_info_card_id.json', JSON.stringify(data));
      callback(false);
    }
    catch(err) {
      callback(err);
    }
  };

  this.getAboutUsInfoCardId = (callback)=> {
    try {
      let result = JSON.parse(fs.readFileSync('./about_us_info_card_id.json', 'utf8'));
      callback(false, result);
    }
    catch(err) {
      callback(err);
    }
  };

  this.createInformationCard = (meta, callback)=> {
    let uuid = NoService.Library.Utilities.generateGUID();
    if(!meta.Title) {
      callback(new Error('Please input title for your information card.'));
    }
    else {
      meta.CardId = uuid;
      _models.InformationCard.create(meta, callback);
    }
  };

  this.updateInformationCard = (meta, callback)=> {
    if(!meta.CardId) {
      callback(new Error('Please specify your card id for your information card.'));
    }
    else {
      _models.InformationCard.update(meta, callback);
    }
  };

  this.getInformationCard = (CardId, callback)=> {
    if(!CardId) {
      callback(new Error('Please specify your card id for your information card.'));
    }
    else {
      _models.InformationCard.get(CardId, callback);
    }
  };

  this.getSuggestedInformationCards = (callback)=> {
    try {
      let result = JSON.parse(fs.readFileSync('./suggested_info_cards.json', 'utf8'));
      callback(false, result);
    }
    catch(err) {
      callback(err);
    }
  };

  this.addSuggestedInformationCards = (CardId, callback)=> {
    this.getSuggestedInformationCards((err, cards)=> {
      if(err) {
        callback(err);
      }
      else {
        if(!cards.includes(CardId)) {
          cards.push(CardId);
          this.updateSuggestedInformationCards(cards, callback);
        }
      }
    });
  };

  this.deleteSuggestedInformationCards = (CardId, callback)=> {
    this.getSuggestedInformationCards((err, cards)=> {
      if(err) {
        callback(err);
      }
      else {
        if(cards.includes(CardId)) {
          let index = cards.indexOf(CardId);
          if (index > -1) {
            cards.splice(index, 1);
          }
          this.updateSuggestedInformationCards(cards, callback);
        }
        else {
          callback(false);
        }
      }
    });
  };

  this.updateSuggestedInformationCards = (data, callback)=> {
    try {
      fs.writeFileSync('./suggested_info_cards.json', JSON.stringify(data));
      callback(false);
    }
    catch(err) {
      callback(err);
    }
  };

  this.getAllInformationCards = (callback)=> {
    _models.InformationCard.getAll(callback);
  };

  this.close = ()=> {

  };
}

module.exports = gotoandPlay;
