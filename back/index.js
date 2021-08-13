const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(
  express.static(path.join(__dirname, "../client/dist/"), { index: false })
);

app.use((req, res, next) => {
  let oneMatch = false;
  fs.readFileSync('locales').toString().split('\r\n').map((locale) => {
    if (req.url.startsWith(`/${locale}`)) {
      oneMatch = true;
      next();
    }
  });
  if (!oneMatch) {
    res.redirect(`/en-US${req.url}`);
  }
});

app.get("/*", (req, res) => {
  var regex = new RegExp( "([a-zA-Z]{2}(-[a-zA-Z]{2})?)[/]?", "g" );
  const locale = regex.exec(req.url)[1]
  res.sendFile(path.join(__dirname, `../client/dist/${locale}/index.html`));
});

app.listen(3000);
