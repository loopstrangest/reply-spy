const { TwitterApi } = require("twitter-api-v2");
const tokens = require("./keys.json");

const client = new TwitterApi(tokens.bearer_token);

async function fetchTwitterData(inputUser) {
  async function fetchData() {
    //check whether account doesn't exist
    try {
      var userCheck = await client.v2.userByUsername(inputUser);
    } catch (error) {
      return new Promise(function (resolve, reject) {
        resolve("error");
      });
    }
    const user = await client.v2.userByUsername(inputUser);
    //check whether account has been suspended
    if (user.errors && user.errors[0].title == "Forbidden") {
      return new Promise(function (resolve, reject) {
        resolve("error");
      });
    }
    const userID = user.data.id;
    const userInfo = await client.v2.user(userID, {
      "user.fields": ["profile_image_url", "protected"],
    });
    //check whether account is private
    if (userInfo.data.protected) {
      return new Promise(function (resolve, reject) {
        resolve(inputUser);
      });
    }
    const userpfpURL = userInfo.data.profile_image_url.replace(
      "normal",
      "400x400"
    );
    const repliesToUser = await client.v2.userMentionTimeline(userID, {
      max_results: 100,
      expansions: ["author_id"],
    });

    //use pagination to get more replies
    for (i = 2; i <= 10; i++) {
      await repliesToUser.fetchNext();
    }

    var replyCount = 0;
    const replierCounts = [];

    for (const reply of repliesToUser) {
      replyCount += 1;
      const replier_id = reply.author_id;
      replierCounts[replier_id] = replierCounts[replier_id]
        ? replierCounts[replier_id] + 1
        : 1;
    }

    //Get ordered list (object) of repliers
    var sortedReplierArray = [];
    for (var entry in replierCounts) {
      sortedReplierArray.push([entry, replierCounts[entry]]);
    }
    sortedReplierArray.sort(function (a, b) {
      return b[1] - a[1];
    });

    var maxRepliers = 24;
    var numRepliers = sortedReplierArray.length;
    if (numRepliers > maxRepliers) {
      sortedReplierArray = sortedReplierArray.slice(0, maxRepliers);
      numRepliers = maxRepliers;
    }

    //Get the usernames for the top repliers
    const sortedReplierList = [];
    const replierProfilePicsList = [];
    for (const entry of sortedReplierArray) {
      var replier_id = entry[0];
      const replierInfo = await client.v2.user(replier_id, {
        "user.fields": ["profile_image_url"],
      });
      const username = replierInfo.data.username;
      const pfpURL = replierInfo.data.profile_image_url;
      sortedReplierList.push(username);
      replierProfilePicsList.push(pfpURL.replace("normal", "400x400"));
    }

    return [
      inputUser,
      userpfpURL,
      numRepliers,
      sortedReplierList,
      replierProfilePicsList,
    ];
  }
  return new Promise(function (resolve, reject) {
    fetchData().then(
      (response) => {
        var result = response;
        resolve(result);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

exports.fetchTwitterData = fetchTwitterData;
