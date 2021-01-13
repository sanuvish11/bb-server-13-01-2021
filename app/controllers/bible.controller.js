
const db = require("../models");
const config = require("../config/auth.config");
var async = require('async');
const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const Bible = db.bible;
const Op = db.Sequelize.Op;
exports.GetAllBible = (req, res) => {
    Bible.findAll({
        where: {
            type: {
                [Op.like]: req.body.type
            },
            book: {
                [Op.like]: req.body.book
            },
            chapter: {
                [Op.like]: req.body.chapter
            }

        }
    }).then(data => {
        //  res.send(data);s
        res.json(data);
        console.log(data)
    })
}

exports.fetchCroessData = (req, res) => {
    //const reference = req.body.reference; //"love";//req.body.query;
    const version = req.body.version;
    const value = req.body.value; //req.body.bible;
    let jsonResponse = new Array();
    let links = new Array();
    let divs = new Array();
    let st = 0;
    // https://www.stepbible.org/rest/search/masterSearch/version=ESV%7Ctext=pain/en?lang=en
    const url = 'https://www.stepbible.org/rest/search/masterSearch/version=' + version + '%7Ctext=' + value + '/en?lang=en'
    //const url = 'https://www.stepbible.org/rest/search/masterSearch/version=ESV%7Ctext=Walk%7Creference=Mat/en?lang=en'
    // const vgmUrl = 'https://www.stepbible.org/rest/search/masterSearch/version=ESV%7Ctext=Love/en?lang=en';
    console.log(url)
    fetch(url).then(res => res.text()).then(response => {
        // console.log(response);
        let start = new Date();
        const $ = cheerio.load(response);
        let strongs = new Array();
        var verse;

        $('div span').each(function () {
            let v = $(this).find('.verseNumber').text();
            if (v.length < 1) {

            } else {
                verse = $(this).find('.verseNumber').text();
                divs.push(verse);
            }
            if (1) {

                var link = $(this).attr('strong');
                var value = $(this).text();
                strongs.push(st, { "verse": verse, "strong": link, "value": value });
                st++;
            }
        });

        $("div").each((index, element) => {

            jsonResponse.push($(element).text());

        });
        res.send({ "strongs": divs, "count": divs.length, "verses": jsonResponse });
        console.log({ "raw": response.body, "json": JSON.parse(response), "jsonresponse": jsonResponse, "strongs": strongs });

    }).catch(err => {
        console.log(err);
    });
}

exports.fetchBibleData = (req, res) => {
    const param = req.body.query;
    const bible = req.body.bible;
    let jsonResponse = new Array();
    let links = new Array();
    let verses = new Array();
    let st = 0;
    const url = 'https://www.stepbible.org/rest/search/masterSearch/version=' + bible + '%7Ctext=' + param + '/en?lang=en'
    const vgmUrl = 'https://www.stepbible.org/rest/search/masterSearch/version=ESV%7Ctext=Love%7Creference=Matt//////en?lang=en';

    fetch(url).then(res => res.text()).then(response => {
        let start = new Date();
        const $ = cheerio.load(response);
        let strongs = new Array();
        var verse;

        $('div.passageContentHolder span').each(function () {

            let v = $(this).find('.verseNumber').text();
            if (v.length < 1) {

            } else {
                verse = $(this).find('.verseNumber').text();
                verses.push(verse);

            }
            if (1) {

                if (typeof verse !== 'undefined' && verse !== null) {

                } else {

                }

                var link = $(this).attr('strong');
                var value = $(this).text();

                if (link === undefined) { } else {

                }
                strongs.push(st, { "verse": verse, "strong": link, "value": value });
                st++;
            }
        });
        $("div").each((index, element) => {

            jsonResponse.push($(element).text());

        });
        console.log(strongs.length + " START => " + start + " END => " + new Date());
        strongs = strongs.filter(function (element) {
            return element.strong !== undefined;
        });

        res.send({ "raw": response.body, "json": JSON.parse(response), "jsonresponse": jsonResponse, "strongs": strongs, "verses": verses });
    }).catch(err => {
        console.log(err);
    });

}

exports.fetchStrongData = (req, res) => {

    console.log
    const bible = req.body.bible;
    const param = req.body.strong;
    let jsonResponse = new Array();
    let links = new Array();
    let divs = new Array();
    let st = 0;
    
    const url = 'https://www.stepbible.org/rest/search/masterSearch/version=' + bible + '%7Cstrong=' + param + '/en?lang=en'

    fetch(url).then(res => res.text()).then(response => {
        console.log("Response is" + response);
        let start = new Date();
        const $ = cheerio.load(response);
        let strongs = new Array();
        var verse;

        $('div span').each(function () {
            let v = $(this).find('.verseNumber').text();
            if (v.length < 1) {

            } else {
                verse = $(this).find('.verseNumber').text();
                divs.push(verse);
            }
            if (1) {

                var link = $(this).attr('strong');
                var value = $(this).text();
                strongs.push(st, { "verse": verse, "strong": link, "value": value });
                st++;
            }
        });

        $("div").each((index, element) => {

            jsonResponse.push($(element).text());

        });


        res.send({ "strongs": divs, "count": divs.length, "verses": jsonResponse });
        //console.log({"raw": response.body, "json":JSON.parse(response.body), "jsonresponse":jsonResponse, "strongs": strongs});

    }).catch(err => {
        console.log(err);
    });

}
exports.getVerses = (request, response) => {
    const book = request.body.book;
    const chapter = request.body.chapter;
    var unirest = require("unirest");

    var req = unirest("GET", "https://ajith-holy-bible.p.rapidapi.com/GetVerses");

    req.query({
        "Book": "Luke",
        "chapter": "1",
        "VerseFrom": "5",
        "VerseTo": "8"
    });

    req.headers({
        "x-rapidapi-key": "467e08f456msh93507c6001f4f3ap17790ejsn02e9191fc71a",
        "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}
exports.getTestaments = (request, response) => {
    var unirest = require("unirest");

    var req = unirest("GET", "https://ajith-holy-bible.p.rapidapi.com/GetBooks");

    req.headers({
        "x-rapidapi-key": "467e08f456msh93507c6001f4f3ap17790ejsn02e9191fc71a",
        "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        response.send(res.body);
        console.log(res.body);
    });
}


exports.getChapters = (request, response) => {
    const book = request.body.book;
    const chapter = request.body.chapter;
    var unirest = require("unirest");
    var req = unirest("GET", "https://ajith-holy-bible.p.rapidapi.com/GetChapter");
    req.query({
        "Book": book,
        "chapter": chapter
    });

    req.headers({
        "x-rapidapi-key": "467e08f456msh93507c6001f4f3ap17790ejsn02e9191fc71a",
        "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}
