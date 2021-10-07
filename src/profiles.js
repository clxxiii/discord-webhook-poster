function profileSave() {
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
  var profileName = document.getElementById('profileName').value

  var profileSave = {WEBHOOK_URL, content, includeEmbed, title, description,
    image, thumbnail, color, username, avatar_url};


  localStorage.setItem(profileName, JSON.stringify( profileSave ) );
}

function profileLoad() {
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
  var profileName = document.getElementById('profileName')

  let fieldData = JSON.parse( localStorage.getItem(profileName.value) );

  console.log(fieldData)

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
}
