// Copyright (c) 2015 Brandon Buck, All Rights Reserved

const PIN_UNPIN_TAB = "tab_pinner_pin_unpin_tab";
const UNPIN_ALL = "tab_pinner_unpin_all_tabs";
const PIN_ALL = "tab_pinner_pin_all_tabs";

/**
 * Handles keyboard shortcut commands, responding only to the tab pin/unpin
 * commands.
 * @param {string} command The name of the keyboard shortcut that was used.
 */
async function handleCommand(command) {
  const currentWindow = await chrome.windows.getCurrent({ populate: true });

  switch (command) {
    case PIN_UNPIN_TAB:
      await Promise.all(
        currentWindow.tabs
          .filter((t) => t.active)
          .map((tab) => chrome.tabs.update(tab.id, { pinned: !tab.pinned })));
      break;

    case UNPIN_ALL:
      await Promise.all(
        currentWindow.tabs.map((t) => chrome.tabs.update(t.id, { pinned: false })));
      break;

    case PIN_ALL:
      await Promise.all(
        currentWindow.tabs.map((t) => chrome.tabs.update(t.id, { pinned: true })));
      break;
  }
}

chrome.commands.onCommand.addListener(handleCommand);
