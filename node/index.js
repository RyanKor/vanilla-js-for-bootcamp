// sudo npm install nodemon -g을 사용해서 서버 실행과 관련한 모듈을 설치한다.
// 명령어는 > node nodemon
const fs = require("fs"); //file system
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
// data.json에 있는 정보를 읽어들인다. console.log(json)으로 확인가능
const laptopData = JSON.parse(json);
// console.log(laptopData); 을 통해 Json 형태로 콘솔창에 정보 확인 가능
const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id; //ID from url

  // PRODUCTS OVERVIEW, Routing situation 1
  if (pathName === "/products" || pathName === "/") {
    //   If everything is ok, the response will be 200 code.
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      "utf-8",
      (err, data) => {
        let overviewOutput = data;

        fs.readFile(
          `${__dirname}/templates/template-card.html`,
          "utf-8",
          (err, data) => {
            const cardsOutput = laptopData
              .map((el) => replaceTemplate(data, el))
              .join("");
            overviewOutput = overviewOutput.replace("{%CARDS%}", cardsOutput);

            res.end(overviewOutput);
          }
        );
      }
    );
  }

  // LAPTOP DETAIL, Routing situation 2
  else if (pathName === "/laptop" && id < laptopData.length) {
    res.writeHead(200, { "Content-type": "text/html" });

    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (err, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        res.end(output);
      }
    );
  }

  // IMAGES, Routing situation 3
  else if (/\.(jpg|jpeg|png|gif)$/i.test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
      res.writeHead(200, { "Content-type": "image/jpg" });
      res.end(data);
    });
  }

  // URL NOT FOUND, Routing situation 4
  else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("URL was not found on the server!");
  }
});

// Keep listening certain port and IP address
server.listen(1337, "127.0.0.1", () => {
  console.log("Listening for requests now");
});

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%ID%}/g, laptop.id);
  return output;
}
