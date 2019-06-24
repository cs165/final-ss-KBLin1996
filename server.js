const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

// TODO(you): Update the contents of privateSettings accordingly, as you did
// in HW5, then uncomment this line.
const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet, as you did in HW5, then uncomment these lines.
const SPREADSHEET_ID = '1H9UiaW4_n7-B91SNdX_Fh9hIT4o5y0CLdhceEPYokxc';
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

// TODO(you): Add at least 1 GET route and 1 POST route.
async function onGet(req, res) {
	const month=req.params.month
	const day=req.params.date
	const result = await sheet.getRows();
	const rows = result.rows;
	console.log(rows);
	for(i=0;i<rows.length;i++){
		if(rows[i][0] === month+'/'+day)
		{
			res.json({'res':rows[i][1]})
			return
		}
	}
	res.json({'stat':'succ'})
}
app.get('/:month/:date', onGet)

async function onPost(req, res) {
	const month=req.params.month
	const day=req.params.date
	const messageBody = req.body;

	const result = await sheet.getRows();
	const rows = result.rows;
	set=false
	var i
	for(i=0;i<rows.length;i++){
		if(rows[i][0] === month+'/'+day)
		{
			await sheet.setRow(i,[month+'/'+day,messageBody.text])
			set=true
		}
	}
	if(set===false)
		await sheet.setRow(i,[month+'/'+day,messageBody.text])
}
app.post('/:month/:date', jsonParser, onPost)

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
