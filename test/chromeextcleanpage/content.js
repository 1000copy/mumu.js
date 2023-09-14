var  selectedElement;
var selectedElementStack = [];
//2023-8-17reco
//  歪打正着。之前这两个事件，一个忘了addEventListener前面加的document，
// 结果在chrome扩展内反而可以挂接，而加了document的却不行。因为这点差异，
// 我就去掉document，发现两个都可以挂接了。
/*
Interest Points

1. 如何创建内容脚本？Chrome extension - Content Script
2. 差别在何处？document.addEventListener vs. addEventListener.
Difference between document.addEventListener and window.addEventListener?
https://stackoverflow.com/questions/12045440/difference-between-document-addeventlistener-and-window-addeventlistener
3. 如何注入css和js到当前内容内？
4. 如何创建后台脚本？ service work script - background script
5. 如何添加和删除class？

Offical guide : https://developer.chrome.com/docs/extensions/

*/
function copyDivToClipboard(element) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}
addEventListener("keypress", (e) => {
    // console.log(e.key)
    if(e.key == 1){
      if(!selectedElement)return;
      // console.log(2)
      let element = selectedElement.parentElement
      if(!element)return;
      // console.log(3)
      if (element == selectedElement)return ;
      // console.log(4)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      element.classList.add('selected')
      selectedElementStack.push(selectedElement)
      selectedElement = element
    }else if (e.key == 2){
      console.log(2)
      if(selectedElementStack.length == 0 )return ;
      console.log(3)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      element = selectedElementStack.pop()
      element.classList.add('selected')
      selectedElement = element
    }else if (e.key == 0){
      // console.log(2)
      if(selectedElementStack.length == 0 )selectedElementStack = [] ;
      // console.log(3)
      if (selectedElement){
        selectedElement.classList.remove('selected')
      }
      // save to sync storage as key :[xpath]
      var key = window.location.href
      var xpath = getDomPath(selectedElement)
      chrome.storage.sync.get(key).then((result) => {
        if(result[key] == undefined){
          var value = []
          value.push(xpath)
          var pair = {}
          pair[key] = value
          chrome.storage.sync.set(pair).then(() => {
            console.log("Value is set");
          });        
        }else{
          result[key].push(xpath)
          var value = result[key]
          var pair = {}
          pair[key] = value
          chrome.storage.sync.set(pair).then(() => {
            console.log("Value is set");
          });
        }
      });
      selectedElement.remove()
      selectedElement = undefined
    }else if (e.key == 9){
      if(selectedElement)
        copyDivToClipboard(selectedElement)
    }else if(e.key == 8){
        var t=document.title
        e=window.location.href
        n=document.createElement("a");
        n.setAttribute("href",e)
        n.innerText=`[${t}](${e})`
        document.body.appendChild(n);
        var r=document.createRange()
        o=window.getSelection()
        r.selectNode(n)
        o.removeAllRanges()
        o.addRange(r)
        document.execCommand("copy")
        document.body.removeChild(n)
    }else if(e.key == 6){
      var key = window.location.href
      var value = []
      var pair = {}
      pair[key] = value
      chrome.storage.sync.set(pair).then(() => {
        console.log(`clear for ${key}`);
        location.reload()
      });        
    }
  });
addEventListener('click', e => {
    var x = e.clientX
    var y = e.clientY
    let element = document.elementFromPoint(x,y);
    if(!element)return;
    // if(!element.classList.contains('selectable'))return ;
    if (element == selectedElement)return ;
    element.classList.add('selected')
    if(selectedElement){
      selectedElement.classList.remove('selected')
    }
    selectedElement = element
}, {passive: true})
  // function findelements(x,y){
  //   let output = document.getElementById("output");
  //   output.innerHTML = ""
  //   if (document.elementsFromPoint) {
  //     let elements = document.elementsFromPoint(x,y);
  //     elements.forEach((elt, i) => {
  //       output.textContent += elt.localName + elt.className??"";
  //       if (i < elements.length - 1) {
  //         output.textContent += " < ";
  //       }
  //     });
  //     // elements[0].style.borderColor ="red"
  //     // elements[0].style.borderWidth = 2

  //   } else {
  //     output.innerHTML =
  //       '<span style="color: red;">' +
  //       "Browser does not support <code>document.elementsFromPoint()</code>" +
  //       "</span>";
  //   }
  // }
function getDomPath(el) {
  if (!el) {
    return;
  }
  var stack = [];
  var isShadow = false;
  while (el.parentNode != null) {
    // console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    // get sibling indexes
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    // if ( el.hasAttribute('id') && el.id != '' ) { no id shortcuts, ids are not unique in shadowDom
    //   stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    // } else
    var nodeName = el.nodeName.toLowerCase();
    if (isShadow) {
      nodeName += "::shadow";
      isShadow = false;
    }
    if ( sibCount > 1 ) {
      stack.unshift(nodeName + ':nth-of-type(' + (sibIndex + 1) + ')');
    } else {
      stack.unshift(nodeName);
    }
    el = el.parentNode;
    if (el.nodeType === 11) { // for shadow dom, we
      isShadow = true;
      el = el.host;
    }
  }
  stack.splice(0,1); // removes the html element
  return stack.join(' > ');
}
if(document.readyState !== 'complete') {
    window.addEventListener('load',afterWindowLoaded);
} else {
    afterWindowLoaded();
}

function afterWindowLoaded(){
    //Everything that needs to happen after the window is fully loaded.
     console.log("load fire")
    var key = window.location.href
    chrome.storage.sync.get(key).then((result) => {
      // console.log(result[key])
      var a = result[key]
      for (var i = a.length - 1; i >= 0; i--) {
        var element = document.querySelector(a[i])
        element && element.remove()
      }
    });
}