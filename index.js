const fs = require("fs/promises");
(async () => {
  const indexPath = "./index.html";
  const initHtml = async () => {
    try {
      await fs.access(indexPath);
    } catch (e) {
      const boilerplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Page Title</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * {
        box-sizing: border-box;
      }

      /* Style the body */
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
      }

      /* Header/logo Title */
      .header {
        padding: 80px;
        text-align: center;
        background: #1abc9c;
        color: white;
      }

      /* Increase the font size of the heading */
      .header h1 {
        font-size: 40px;
      }

      /* Style the top navigation bar */
      .navbar {
        overflow: hidden;
        background-color: #333;
      }

      /* Style the navigation bar links */
      .navbar a {
        float: left;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 20px;
        text-decoration: none;
      }

      /* Right-aligned link */
      .navbar a.right {
        float: right;
      }

      /* Change color on hover */
      .navbar a:hover {
        background-color: #ddd;
        color: black;
      }

      /* Column container */
      .row {
        display: -ms-flexbox; /* IE10 */
        display: flex;
        -ms-flex-wrap: wrap; /* IE10 */
        flex-wrap: wrap;
      }

      /* Create two unequal columns that sits next to each other */
      /* Sidebar/left column */
      .side {
        -ms-flex: 30%; /* IE10 */
        flex: 30%;
        background-color: #f1f1f1;
        padding: 20px;
      }

      /* Main column */
      .main {
        -ms-flex: 70%; /* IE10 */
        flex: 70%;
        background-color: white;
        padding: 20px;
      }

      /* Fake image, just for this example */
      .fakeimg {
        background-color: #aaa;
        width: 100%;
        padding: 20px;
      }

      /* Footer */
      .footer {
        padding: 20px;
        text-align: center;
        background: #ddd;
      }

      /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
      @media screen and (max-width: 700px) {
        .row {
          flex-direction: column;
        }
      }

      /* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
      @media screen and (max-width: 400px) {
        .navbar a {
          float: none;
          width: 100%;
        }
      }
    </style>
  </head>
  <body></body>
</html>
`;
      await fs.writeFile(indexPath, boilerplate, "utf-8");
    }
  };
  const myfilework = await fs.open("./myfile.txt", "r");
  console.log("ami file open korbo");
  //   myfilework.on("change", async function abc() {
  //   console.log("ami change hoise")
  //   }

  myfilework.on("change", async function () {
    let size = (await myfilework.stat()).size;
    let buf = Buffer.alloc(size);
    let offset = 0;
    let length = buf.byteLength;
    let position = 0;

    await myfilework.read(buf, offset, length, position);

    const mytext = buf.toString("utf-8");
    await initHtml();
    const appendToBody = async (content) => {
      const html = await fs.readFile(indexPath, "utf-8");
      const updatedHTML = html.replace("</body>", `${content}\n</body>`);
      await fs.writeFile(indexPath, updatedHTML, "utf-8");
    };

    const appendToBodyRow = async (content) => {
      const html = await fs.readFile(indexPath, "utf-8");
      // Wrap the content in a <div class="row"> and place it above </body>
      const updatedHTML = html.replace(
        "</body>",
        `<div class="row">${content}</div>\n</body>`
      );
      await fs.writeFile(indexPath, updatedHTML, "utf-8");
    };
    const appendHeader = async () => {
      const header = `<div class="header">
      <h1>My Website</h1>
      <p>A website created by me.</p>
    </div>`;

      await appendToBody(header);
    };
    const appendNavbar = async () => {
      const navbar = `    <div class="navbar">
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#" class="right">Link</a>
    </div>`;
      await appendToBody(navbar);
    };
    const appendAbout = async () => {
      const about = `    <div class="side">
        <h2>About Me</h2>
        <h5>Photo of me:</h5>
        <div class="fakeimg" style="height: 200px">Image</div>
        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        <h3>More Text</h3>
        <p>Lorem ipsum dolor sit ame.</p>
        <div class="fakeimg" style="height: 60px">Image</div>
        <br />
        <div class="fakeimg" style="height: 60px">Image</div>
        <br />
        <div class="fakeimg" style="height: 60px">Image</div>
      </div>
      <div class="main">
        <h2>TITLE HEADING</h2>
        <h5>Title description, Dec 7, 2017</h5>
        <div class="fakeimg" style="height: 200px">Image</div>
        <p>Some text..</p>
        <p>
          Sunt in culpa qui officia deserunt mollit anim id est laborum
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco.
        </p>
        <br />
        <h2>TITLE HEADING</h2>
        <h5>Title description, Sep 2, 2017</h5>
        <div class="fakeimg" style="height: 200px">Image</div>
        <p>Some text..</p>
        <p>
          Sunt in culpa qui officia deserunt mollit anim id est laborum
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco.
        </p>
      </div>`;
      await appendToBodyRow(about);
    };

    const appendFooter = async () => {
      const footer = `<div class="footer">
      <h2>Footer</h2>
    </div>`;
      await appendToBody(footer);
    };

    const removeHtml = async (content) => {
      const html = await fs.readFile(indexPath, "utf-8");
      // Use regex to remove the <div class="row">...</div> section
      const regex = new RegExp(
        `<div class="${content}">[\\s\\S]*?<\\/div>`,
        "g"
      );
      const updatedHTML = html.replace(regex, "");
      await fs.writeFile(indexPath, updatedHTML, "utf-8");
    };
    if (mytext.startsWith("create header")) {
      await appendHeader();
    } else if (mytext.startsWith("create navbar")) {
      await appendNavbar();
    } else if (mytext.startsWith("create aboutme")) {
      await appendAbout();
    } else if (mytext.startsWith("create title")) {
      await appendTitle();
    } else if (mytext.startsWith("create footer")) {
      await appendFooter();
    } else if (mytext.startsWith("delete header")) {
      await removeHtml("header");
    } else if (mytext.startsWith("delete navbar")) {
      await removeHtml("navbar");
    } else if (mytext.startsWith("delete aboutme")) {
      await removeHtml("row");
    } else if (mytext.startsWith("delete footer")) {
      await removeHtml("footer");
    }
  });

  const cctv = fs.watch("./myfile.txt");
  for await (let y of cctv) {
    if (y.eventType == "change") {
      myfilework.emit("change");
    }
  }
})();
