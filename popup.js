document.addEventListener('DOMContentLoaded', function () {

    generateMarkdown().then(result => document.getElementById("txtMarkdown").value = result);

    var btnCopy = document.getElementById("btnCopy");
    btnCopy.addEventListener('click', copyToClipboard);
  });


async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function generateMarkdown() {
  let tab = await getCurrentTab();

  return "[" + tab.title + "](" + tab.url + ")";
}

function copyToClipboard() {
  // Get the text field
  var copyText = document.getElementById("txtMarkdown");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
}
