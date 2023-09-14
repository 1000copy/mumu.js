var key = "key"
var value = "value"
chrome.storage.local.set({ "key": value }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get("key").then((result) => {
  console.log("Value currently is " ,result);
});

var key = "key"
var value = ["v1","v2"]
chrome.storage.local.set({ "key": value }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get("key").then((result) => {
  console.log("Value currently is " ,result);
});

var key = "key"
var value = {a:1,b:2}
chrome.storage.local.set({ "key": value }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get("key").then((result) => {
  console.log("Value currently is " ,result);
});
var key = "url3"
// url :[xpath]
chrome.storage.local.get(key).then((result) => {
  console.log("Value currently is " ,result.key);
});

var key = "url3"
var value = ["xpath1","xpath2","xpath3","xpath4","xpath5"]
chrome.storage.local.set({ "key": value }).then(() => {
  console.log("Value is set");
});

chrome.storage.local.get("key").then((result) => {
  console.log("Value currently is " ,result.key);
});
