import * as fxp from 'fast-xml-parser';
import * as md5 from 'js-md5';
import * as fs from 'fs';

// Path: src/index.ts

// List XML files in the current directory
const ls: string[] = fs.readdirSync("./data/rss");
const xml: string[] = ls.filter((file: string) => file.endsWith(".xml"));


// Read the each XML file
xml.forEach((file: string, index: number) => {
 try {
  const data: string = fs.readFileSync(`./data/rss/${file}`, "utf8");
  const json = new fxp.XMLParser().parse(data);
  let items: any[] = [];

  if (json.rss) {
   if (json.rss.channel) {
    if (json.rss.channel.item) {
     if (json.rss.channel.item.length) {
      items = json.rss.channel.item;
      console.log('rss', index, json.rss.channel.item.length);
     }
    }
   }

  } else if (json.feed) {
   if (json.feed.entry) {
    items = json.feed.entry;
    console.log('feed', index, json.feed.entry.length);
   }

  } else if (json['rdf:RDF']) {
   if (json['rdf:RDF'].item) {
    items = json['rdf:RDF'].item;
    console.log('rdf', index, json['rdf:RDF'].item.length);
   }
  }

  if (!Array.isArray(items)) {
   items = [];
  }

  items.forEach((item) => {
   const str = JSON.stringify(item, null, 2);
   const hash = md5(str);
   const writePath = `./data/items/${hash}.json`;
   fs.writeFileSync(writePath, str);
  });
 } catch (e) {
  console.error(e);
 }
});

console.log('done');