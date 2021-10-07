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

  console.log(WEBHOOK_URL);

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
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": Missing webhook url";
  }
  else {
    webConsole.innerHTML = "Attempt " + fetchAttempts + ": you fucked it up a lot somehow, maybe try slowing down?";
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

  console.log(p)
  fetchAttempts++;
  try {
    response = await fetch(url, params);
    return response.status;
  }
  catch (error) {
    return 0;
  }
}
