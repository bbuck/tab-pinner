// Copyright (c) 2015 Brandon Buck, All Rights Reserved

const PIN_UNPIN_TAB = "tab_pinner_pin_unpin_tab",
  UNPIN_ALL = "tab_pinner_unpin_all_tabs",
  PIN_ALL = "tab_pinner_pin_all_tabs";

/**
 * Sets all given tabs to the given pinned state.
 *
 * @param {Array} tabs The tabs to set the pinned state of.
 * @param {boolean} pinned The pinned state to set the tabs to.
 */
function setTabsPinnedState(tabs, pinned) {
  if (!pinned) {
    // Reverse the order so that the first tab is the last tab to be unpinned.
    // This keeps the tab order the same when unpinning.
    tabs.reverse();
  }
  tabs.forEach((tab) => chrome.tabs.update(tab.id, { pinned: pinned }));
}

/**
 * Toggles the pinned state of the given tabs. If any of the tabs are unpinned, pin them. Otherwise, unpin them.
 *
 * @param {Array} tabs The tabs to toggle the pinned state of.
 */
function togglePins(tabs) {
  // If any tab is unpinned, pin all tabs
  const hasUnpinnedTabs = tabs.some((tab) => !tab.pinned);
  setTabsPinnedState(tabs, hasUnpinnedTabs);
}

/**
 * Runs the given function with all tabs in the current window.
 *
 * @param {Function} fn The function to run with all tabs.
 */
function withAllTabs(fn) {
  chrome.windows.getCurrent({ populate: true }, function (curWindow) {
    fn(curWindow.tabs);
  });
}

/**
 * Runs the given function with all user selected tabs in the current window.
 *
 * @param {Function} fn The function to run with all user selected tabs.
 */
function withSelectedTabs(fn) {
  chrome.tabs.query({ currentWindow: true, highlighted: true }, (tabs) => {
    fn(tabs);
  });
}

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case PIN_UNPIN_TAB:
      withSelectedTabs((tabs) => {
        togglePins(tabs);
      });
      break;
    case UNPIN_ALL:
      withAllTabs((tabs) => {
        setTabsPinnedState(tabs, false);
      });
      break;
    case PIN_ALL:
      withAllTabs((tabs) => {
        setTabsPinnedState(tabs, true);
      });
      break;
    default:
      break;
  }
});
