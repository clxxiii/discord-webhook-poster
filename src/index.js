// Auto-resize textarea
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function onLoad() {
  let fieldData = JSON.parse( localStorage.getItem("fieldData") );
  console.log("Logging Previous Send (Saved from last session)");
  console.log(fieldData);

  var WEBHOOK_URL = document.getElementById('webhookUrl');
  var content = document.getElementById('content');
  var includeEmbed = document.getElementById('includeEmbed');
  var title = document.getElementById('embedTitle');
  var description = document.getElementById('embedDesc');
  var image = document.getElementById('embedImage');
  var thumbnail = document.getElementById('embedThumbnail');
  var color = document.getElementById('embedColor');
  var username = document.getElementById('username');
  var avatar_url = document.getElementById('avatar');

  WEBHOOK_URL.value = fieldData.WEBHOOK_URL;
  content.value = fieldData.content;
  includeEmbed.value = fieldData.includeEmbed;
  title.value = fieldData.title;
  description.value = fieldData.description;
  image.value = fieldData.image;
  thumbnail.value = fieldData.thumbnail;
  color.value = fieldData.color;
  username.value = fieldData.username;
  avatar_url.value = fieldData.avatar_url;

  updateProfileList();
}

// Collapse embed fields when "include embeds" is off
function embedFieldToggle() {
  var includeEmbed = document.getElementById('includeEmbed').checked;
  var embedElements = document.getElementById('embedElements');

  if (includeEmbed) {
    embedElements.setAttribute("style", "margin-bottom: 0%; transform: translateY(0px) scaleY(1)")
    console.log("make hidden")
  }
  else {
    embedElements.setAttribute("style", "margin-bottom: -27rem; transform: translateY(-50%) scaleY(0)")
    console.log("make visible")
  }
}

var fetchAttempts = 0;

async function onSendMessageClick() {
  var WEBHOOK_URL = document.getElementById('webhookUrl').value;
  var content = document.getElementById('content').value;
  var includeEmbed = document.getElementById('includeEmbed').checked;
  var title = document.getElementById('embedTitle').value;
  var description = document.getElementById('embedDesc').value;
  var image = document.getElementById('embedImage').value;
  var thumbnail = document.getElementById('embedThumbnail').value;
  var color = document.getElementById('embedColor').value;
  var username = document.getElementById('username').value;
  var avatar_url = document.getElementById('avatar').value;
  var webConsole = document.getElementById('webConsole');

  // Save text to local storage
  let localSave = {WEBHOOK_URL, content, includeEmbed, title, description,
    image, thumbnail, color, username, avatar_url};
  console.log(localSave);
  localStorage.setItem("fieldData", JSON.stringify(localSave) );

  if (includeEmbed) {
    var embed = [
      {
        title: title,
        description: description,
        thumbnail: { url: thumbnail },
        color: parseInt(color.replace('#',''), 16),
        image: { url: image },
        author: {
          name: username,
          icon_url: avatar_url
      }
    } ];
  } else { var embed = []; }
  var payload = {
    content: content,
      embeds: embed ,
      username: username,
      avatar_url: avatar_url
  }
  var httpCode =  await sendPayload(payload, WEBHOOK_URL);
  console.log(httpCode);
  if (httpCode == 400) {
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": Webhook failed to send: please check your parameters and try again";
  }
  else if (httpCode == 204) {
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": Webhook posted successfully!";
  }
  else if (httpCode == 0) {
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": Missing Webhook URL";
  }
  else {
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": " + httpCode;
  }
}

async function sendPayload(p, url) {
  let params = {
    headers: {
      'Content-Type': "application/json"
    },
    method: 'POST',
    body: JSON.stringify(p)
  };

  fetchAttempts++;
  try {
    response = await fetch(url, params);
    return response.status;
  }
  catch (error) {
    return 0;
  }
}
