document.addEventListener("DOMContentLoaded", ()=>{
  const collectButton = document.getElementById('collect');
  const openButton = document.getElementById('open');


  collectButton.addEventListener("click", () => {
    tabUrls = chrome.tabs.query({currentWindow:true}, (allTabs) =>{

      allTabs = allTabs.map(tab => tab.url);

      chrome.storage.sync.set({'userTabs': allTabs});

      let num = document.createElement("h2");
      num.innerHTML = `(${allTabs.length})`;

      collectButton.appendChild(num);

    });

  });


  openButton.addEventListener("click", () => {

    chrome.storage.sync.get('userTabs', (userTabs) => {

      if(userTabs.userTabs){

        userTabs.userTabs.forEach(url =>{
          chrome.tabs.create({'url': url});
        });
      }

    });
  });
}, false);
