const { verifySignUp } = require("../middleware");
const AuthCtl = require("../controllers/auth.controller");
const WorkareanotesCtl = require("../controllers/workareanotes.controller");
const RoomparticipantsCtl = require("../controllers/roomparticipants.controller");
const BibleCtl = require("../controllers/bible.controller");
const ChatCtl = require("../controllers/chat.controller");
const ChatscheduleCtl = require("../controllers/chat_schedular.controller");
const StrongCtl = require("../controllers/strong.controller");
const WorkAreaCtl = require("../controllers/workarea.controller");
const PeronalfavCtl = require("../controllers/personalfav.controller");
const JourneyCtl = require("../controllers/journey.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    //login ctl 
    app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
    ], AuthCtl.signup);
    app.post("/api/auth/search", AuthCtl.search);
    app.post("/api/auth/signin", AuthCtl.signin);
    app.post("/api/auth/update", AuthCtl.update);
    //city state country
    app.post("/api/auth/getcountry", AuthCtl.getCounty);
    app.post("/api/auth/getstate", AuthCtl.getState);
    app.post("/api/auth/getcity", AuthCtl.getCity);
    //ChatCtl
    app.post("/api/auth/chat", ChatCtl.chat_history);
    app.post("/api/auth/chatdetail", ChatCtl.getchatdetails);
    app.get("/api/auth/chatd", ChatCtl.getchatdetail);
    app.post("/api/auth/searchbysender", ChatCtl.searchbysender);

    //ChatscheduleCtl
    app.post("/api/auth/SeachBycalender", ChatscheduleCtl.SeachBycalender);
    app.post("/api/auth/schedule", ChatscheduleCtl.chat_scheduler);
    app.post("/api/auth/schedulesearch", ChatscheduleCtl.schedule_search);
    app.post("/api/auth/getschedule", ChatscheduleCtl.get_schedule);

    //biblectl
    app.get("/api/auth/getTestaments", BibleCtl.getTestaments);
    app.post("/api/auth/getChapters", BibleCtl.getChapters);
    app.post("/api/auth/getVerses", BibleCtl.getVerses);
    app.post("/api/auth/fetchBibleData", BibleCtl.fetchBibleData);
    app.post("/api/auth/GetAllBible", BibleCtl.GetAllBible);
    app.post('/api/auth/fetchStrongData', BibleCtl.fetchStrongData);
    app.post('/api/auth/fetchCroessData', BibleCtl.fetchCroessData);
    //WorkareanotesCtl
    app.post('/api/auth/workareanote', WorkareanotesCtl.workareanote);
    app.post('/api/auth/getworkareanote', WorkareanotesCtl.getworkareanotes);
    app.delete('/api/auth/deteteworkareanotes/:id', WorkareanotesCtl.deleteworkareanotes);
    app.put('/api/auth/updateworkareanote/:id', WorkareanotesCtl.updateworkareanote);

    // StrongCtl
    app.post("/api/auth/GetAllStrong", StrongCtl.GetAllStrong);
    app.post("/api/auth/Strongcode", StrongCtl.GetAllStrongcode);

    //RoomparticipantsCtl 
    app.get("/api/auth/roomdetails", RoomparticipantsCtl.getroomdetails);
    app.get("/api/auth/GetAllActiveChats", RoomparticipantsCtl.GetAllActiveChats);
    app.post("/api/auth/closeChat", RoomparticipantsCtl.closeChat);
    app.post('/api/auth/updateChatStatus/:id1/:id2', RoomparticipantsCtl.updateChatStatus);
    app.get("/api/auth/GetAllChats", RoomparticipantsCtl.GetAllChats);
    app.post("/api/auth/roompar", RoomparticipantsCtl.room_participant);

    app.post("/api/auth/workarea", WorkAreaCtl.workarea);
    app.post("/api/auth/getworkarea", WorkAreaCtl.getworkarea);
    app.delete("/api/auth/deleteworkarea/:id", WorkAreaCtl.deleteworkarea);

    app.post("/api/auth/personalfav", PeronalfavCtl.personalfav);
    app.post("/api/auth/getpersonalfav", PeronalfavCtl.getpersonalfav);
    app.delete("/api/auth/deletepersonalfav/:id", PeronalfavCtl.deletepesonalfav);

    app.post("/api/auth/journey", JourneyCtl.Journey);
    app.post("/api/auth/journeylist", JourneyCtl.Journeylist);
    app.delete("/api/auth/deletejourney/:id", JourneyCtl.JourneyDelete);

    app.post("/api/auth/initiateChat", ChatCtl.initiateChat);

    
};