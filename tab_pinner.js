// Copyright (c) 2015 Brandon Buck, All Rights Reserved

var PIN_UNPIN_TAB = "tab_pinner_pin_unpin_tab",
    UNPIN_ALL = "tab_pinner_unpin_all_tabs",
    PIN_ALL = "tab_pinner_pin_all_tabs";
    
var forEachTab = function(fn) {
  chrome.windows.getCurrent({populate: true}, function(curWindow) {
    curWindow.tabs.forEach(fn);
  });
};

chrome.commands.onCommand.addListener(function(command) {
  if (command === PIN_UNPIN_TAB) {
    forEachTab(function(tab) {
      if (tab.active) {
        chrome.tabs.update(tab.id, {pinned: !tab.pinned});
      }
    });
  } else if (command === UNPIN_ALL) {
    forEachTab(function(tab) {
      chrome.tabs.update(tab.id, {pinned: false});
    });
  } else if (command === PIN_ALL) {
    forEachTab(function(tab) {
      chrome.tabs.update(tab.id, {pinned: true});
    });
  } else {
    return;
  }
});

