const authKey : string = 'V0Qymz87GOEf8exHwk8CCakfH6ElFyz2UlOwKzYX64Q';

const phantomKey : string = '7526519133105226';

const linkedInCookie = '9516048315%3AhH5pwTKReC0wJg%3A18%3AAYf50dGiz15WZiKHrp-4R9N9GigtuVPuKAe8yvIDUg'

const func = async () => {
  const argumentData = {
    csvName: "result",
    spreadsheetUrl: profileUrl,
    sessionCookie: linkedInCookie,
    numberOfLinesPerLaunch: 1,
    numberMaxOfPosts: 50,
  };

  const requestData = {
    id: phantomKey,
    argument: JSON.stringify(argumentData),
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Phantombuster-Key": "vGNRnnRnAHWcryacc94gK4PThVXg7WacXNCM5zjM0hk",
    },
    body: JSON.stringify(requestData),
  };

  const response1 = await fetch(
    "https://api.phantombuster.com/api/v2/agents/save",
    options
  );

  const data = await response1.json();

  const launchOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Phantombuster-Key": "vGNRnnRnAHWcryacc94gK4PThVXg7WacXNCM5zjM0hk",
    },
    body: JSON.stringify({ id: data.id }),
  };

  await sleep(90000);
  const fetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Phantombuster-Key": "vGNRnnRnAHWcryacc94gK4PThVXg7WacXNCM5zjM0hk",
    },
  };

  const res = await fetch(
    `https://api.phantombuster.com/api/v2/agents/fetch-output?id=${profileId}`,
    fetchOptions
  );

}