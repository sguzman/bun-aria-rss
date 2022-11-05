import * as fxp from 'fast-xml-parser';
import * as fs from 'fs';

// Path: src/index.ts

// List XML files in the current directory
const ls: string[] = fs.readdirSync("./data");

const xml: string[] = ls.filter((file: string) => file.endsWith(".xml"));

// Read the each XML file
xml.slice(10, 21).forEach((file: string, index: number) => {
 const data: string = fs.readFileSync(`./data/${file}`, "utf8");
 const json = new fxp.XMLParser().parse(data);
 if (json.rss?.channel.item) {
  const item = json.rss.channel.item;
  console.log('rss', index, item.length);
 } if (json.feed?.entry) {
  const entry = json.feed.entry;
  console.log('feed', index, entry.length);
 } else {
  console.log('bad obj', Object.keys(json));
 }
});