const apps = ["Tonit-React-iOS", "Tonit-React-Android"];

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function checkForEle() {
  // The app link in the breadcrums
  var button = getElementByXpath(`//html/body/div[1]/div[1]/div/nav/ol/li[3]/a`);
  return button;
}

function retries() {
  const element = checkForEle();
  if (element) return new Promise((res) => res(element));

  return new Promise((res) => {
    setTimeout(() => {
      retries().then(res);
    }, 250);
  });
}

function nextApp() {
  const parts = window.location.href.split("/");
  const currentApp = apps.findIndex(a => {
    return parts.includes(a);
  });

  return [apps[Math.max(0, currentApp)], apps[(currentApp + 1) % apps.length]];
}

function run() {
  retries().then(button => {

    var btn = document.createElement("BUTTON");

    btn.innerHTML = "Switch";

    btn.onclick = () => {
      const [current, next] = nextApp();
      window.location.href = window.location.href.replace(current, next);
    };

    button.parentNode.appendChild(btn);
  });
}

run();
