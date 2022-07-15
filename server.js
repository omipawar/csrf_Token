var cookieParser = require('cookie-parser')
var csurf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')

// // create express app
var app = express()


var csrfProtection = csurf({ cookie: true })
// We need cookie-parser to be initialized as well.
app.use(cookieParser())

app.all('/api', csrfProtection, function (req, res) {
    let cookies = req.csrfToken();
    res.cookie('XSRF-TOKEN', cookies);
    res.json({ token: cookies });
})

app.get("/", (req, res) => {
    res.status(200).json({ msg: "blasnk" })
})

app.post("/api/post", csrfProtection, (req, res) => {
    res.status(200).json({ msg: "this is from post" })
});
app.put("/api/put", csrfProtection, (req, res) => {
    res.status(200).json({ msg: "this is from put" })
});
app.delete("/api/delete", csrfProtection, (req, res) => {
    res.status(200).json({ msg: "this is from delete" })
});

app.listen(8000, () => {
    console.log("server running on 8000")
})

