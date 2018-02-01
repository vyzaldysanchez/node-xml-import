const express = require('express');
const xmlToJs = require('xml2js');

const Credit = require('./../models/credit');
const router = express.Router();
const parser = new xmlToJs.Parser();
const xmlExpected = 'xml-file';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'XML Upload' });
});


/* POST upload file */
router.post('/upload-xml', (req, res, next) => {
  const xml = req.files[xmlExpected].data.toString();

  parser.parseString(xml, (err, { students }) => {
    if (err) {
      return next(err);
    }

    console.log(JSON.stringify(students.students, null, 2));

    const data = students.students.map((row) => {
      const { name, lastName, cardId, career, financialRequest } = row.student[0];

      console.log(row.student);

      return { 
        fullName: `${name[0]} ${lastName[0]}`,
        cardId: cardId[0],
        career: career[0],
        creditAmount: financialRequest[0]
      }
    });

    Credit.insertMany(data, (err) => {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  });

});

module.exports = router;
