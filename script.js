const json = {
  "pages": [{
    "elements": [{
      "type": "matrix",
      "name": "qualities",
      "title": "Übergabeformular",
      "columns": [{
        "value": 1,
        "text": "Zurückgegeben" },
      {
        "value": 2,
        "text": "Ausgeliehen" },
      {
        "value": 3,
        "text": "Ausgegeben" },
    ],

      "rows": [{
        "value": "asset",
        "text": "Das Asset wird" },
      ] },
/*
      {
        "type": "text",
        "name": "date",
        "title": "Datum"},
    */
      {
        "type": "text",
        "name": "itsm",
        "title": "Ticket-Nummer"},
      
    {
      "type": "text",
      "name": "person0",
      "title": "Das Asset wird übergeben von"},

      {
        "type": "matrix",
        "name": "",
        "title": "",
        "columns": [{
          "value": 1,
          "text": "Techniker:in" },
        {
          "value": 2,
          "text": "Kund:in" },
      ],
  
        "rows": [{
          "value": "asset",
          "text": "von" },
        ] },
  
      {
        "type": "text",
        "name": "person1",
        "title": "zu" },


        {
          "type": "matrix",
          "name": "",
          "title": "",
          "columns": [{
            "value": 1,
            "text": "Techniker:in" },
          {
            "value": 2,
            "text": "Kund:in" },
        ],
    
          "rows": [{
            "value": "asset",
            "text": "zu" },
          ] },

        {
          "type": "matrix",
          "name": "qualities",
          "title": "Betroffenes Asset",
          "columns": [{
            "value": 1,
            "text": "Laptop" },
          {
            "value": 2,
            "text": "Monitor" },
          {
            "value": 3,
            "text": "Docking-Station" },
          {
            "value": 4,
            "text": "Headset" },
          {
            "value": 5,
            "text": "Maus" },
          {
            "value": 6,
            "text": "Tastatur" },
            
        ],
    
          "rows": [{
            "value": "asset",
            "text": "Asset" },
          ] },
          {
            "type": "text",
            "name": "asset",
            "title": "Geben Sie die Asset-Numemr an, wenn es eine zugeordnete gibt" },
            {
              "type": "text",
              "name": "",
              "title": "Datum, Unterschift, Kund:in"},
              {
                "type": "text",
                "name": "",
                "title": "Datum, Unterschift, Techniker:in"},
              
            
    ] },
    
  ],


  "showQuestionNumbers": false };

  function getDate() {
    // Get the input field
    const dateField = document.getElementById('date_field');

    // Create a date picker using jQuery UI
    $(dateField).datepicker({
      dateFormat: 'yy-mm-dd', // Format the date as YYYY-MM-DD
      onSelect: function(selectedDate) {
        console.log('Selected date:', selectedDate);
        // You can use 'selectedDate' to populate your JSON object or perform any other actions.
      }
    });
  }

function createSurveyPdfModel(surveyModel) {

  let pdfWidth = !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
  let pdfHeight = !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
  let options = {
    fontSize: 14,
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bot: 10 },


    format: [pdfWidth, pdfHeight] };

  const surveyPDF = new SurveyPDF.SurveyPDF(json, options);
  if (surveyModel) {
    surveyPDF.data = surveyModel.data;
  }

  return surveyPDF;
}
function saveSurveyToPdf(filename, surveyModel) {
  createSurveyPdfModel(surveyModel).save(filename);
}
function SurveyPdfComponent() {
  const survey = new Survey.Model(json);
  survey.data = {
    "qualities": {
      "asset": 3,
      "does-what-it-claims": 4,
      "better-than-others": 3,
      "easy-to-use": 5 },

    "satisfaction-score": 4,
    "recommend": 5,
    "person0": "Vor- und Nachname",
    "person1": "Vor- und Nachname",
    "itsm": "ITSM-XXX-XXX",
    "date": "TT-MM-YY",
    "price-comparison": "Not sure",
    "current-price": "correct",
    "price-limits": {
      "highest": 450,
      "lowest": 200 },

    "asset": "Asset-Nummer" };

  const savePdf = function () {
    saveSurveyToPdf("surveyResult.pdf", survey);
  };
  const btnStyle = { marginLeft: "20px", marginTop: "20px", marginBottom: "20px" };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
  React.createElement("button", { className: "sd-btn", style: btnStyle, onClick: savePdf }, "PDF erstellen"), /*#__PURE__*/
  React.createElement(SurveyReact.Survey, { model: survey }));

}

const root = ReactDOM.createRoot(document.getElementById("surveyElement"));
root.render( /*#__PURE__*/React.createElement(SurveyPdfComponent, null));