const webConsole = document.getElementById('webConsole');

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

  var profileSave = { profileName, values: {WEBHOOK_URL, content, includeEmbed, title, description,
    image, thumbnail, color, username, avatar_url} };
  console.log(profileSave)

  var profiles = JSON.parse( localStorage.getItem("profiles") );
  if (profiles == null) { profiles = [] }
  profiles.push(profileSave);

  localStorage.setItem( "profiles", JSON.stringify(profiles) );
  updateProfileList();
}

// Load data from a profile object
function profileLoad(profile) {
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

  let profiles = JSON.parse( localStorage.getItem('profiles') );
  let fieldData = profiles[profile].values
  console.log("Loading profile with ID: " + profile)
  console.log(fieldData)

  WEBHOOK_URL.value = fieldData.WEBHOOK_URL;
  content.value = fieldData.content;
  title.value = fieldData.title;
  description.value = fieldData.description;
  image.value = fieldData.image;
  thumbnail.value = fieldData.thumbnail;
  color.value = fieldData.color;
  username.value = fieldData.username;
  avatar_url.value = fieldData.avatar_url;
}

// Generates the list of found profiles on the profile bar
function updateProfileList() {
  // Dictionary
  let profileBar = document.getElementById('profileBar');
  let profileList = document.getElementById('profileList');
  let profiles = JSON.parse( localStorage.getItem('profiles') );

  // Reset profileList
  profileList.remove();
  var newProfileList = document.createElement("div");
  newProfileList.id = 'profileList';
  profileBar.appendChild(newProfileList);

  // Print profile array to conole
  console.log("Current Profiles:");
  console.log(profiles)


  // Generate profile buttons
  for (i = 0; i < profiles.length; i++) {
    // Making sure it logs all of my profiles
    console.log("Profile Number: " + i + "; Profile Name: " + profiles[i].profileName);

    // Create div for profile section
    var profileElement = document.createElement("div");
    newProfileList.appendChild(profileElement);
    profileElement.outerHTML = "<div id='profile' onclick='profileLoad("+ i +")'> " +
    profiles[i].profileName +
    "</div> <button class=deleteButton onclick=deleteProfile("+ i + ")>Delete '" + profiles[i].profileName + "'</button>"
  }
}

function deleteProfile(profile) {
  console.log("Deleting Profile ID: " + profile)
  let profiles = JSON.parse( localStorage.getItem("profiles") );
  profiles.splice(profile, 1);
  localStorage.setItem("profiles", JSON.stringify(profiles) );
  webConsole.innerHTML = "Deleted Profile " + profile;
  updateProfileList();
}
