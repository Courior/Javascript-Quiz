var Quiz = function () {
  this.data = undefined;
  this.correct = 0;
  this.answered = undefined;
  this.test = "this";
  this.currentQuestion = {};
  this.ajaxSettings= {
    method  : 'get',
    url     : './questions.xml',
    timeout : 3000,
    context : this,
    success : this.parseXml,
		error   : this.errorHandler,
		complete: this.completeHandler
	};


  	console.log("init ");
  	this.correct=0;
  	this.answered=1;
    //make AJAX call
    $.ajax(this.ajaxSettings);

};

Quiz.prototype = {
  parseXml: function(xml){
  	//create array questions
  	var questions = [];
  	console.log("parseXml");
  	console.log(xml);
    //get each question
    $(xml).find("question").each(function()
            {
        //create question json
        var question = {};
        //add questions text to question json
        question.text = $(this).find("text").text();
        //add ecplanation text to question json
        question.explanation = $(this).find("explanation").text();
        //add each answer to question
        question.answers = [];
        $(this).find("answer").each(function()
          {
            answer={};
            answer.text=$(this).text();
            answer.result=$(this).attr("result");
            answer.id=$(this).attr("id");
            question.answers.push(answer);
          }

        );
        //output question to console.log

        questions.push(question);
      });//end of $(xml).find("question")
      console.log(this.test);
      this.populateData(questions);
      //this.data.questions= questions;
      //console.log(this);
  },
  errorHandler: function(err){
      console.log(err);
  },

  completeHandler: function (){
      console.log('AJAX call is complete');
	  $("#ansBtn").on("click",this.answer.bind(this));
	  $("#nxtBtn").on("click",this.nextQuestion.bind(this));
  },
  getXml: function(data){
  	console.log(data);
  	console.log($(data).find('question[number="1"]').text());
  },

  populateData: function(data){
		// take data in report and output it to the report table
		this.data = data;
    console.log(this.data);
		$q = this.data[1];
		console.log($q);
		
		this.outputRandomQuestion();
	},
  outputRandomQuestion: function(){
    $("#question").empty();
  	var number = Math.floor((Math.random() * this.data.length-1)+1);
  	this.currentQuestion= this.data[number];
	console.log(this.currentQuestion);
    var template=Handlebars.compile($('#questionTemplate').html());
    var temp= template(this.currentQuestion);
  /*	$("#question").text(this.currentQuestion.text);
  	$("#explain").text(this.currentQuestion.explanation);
  	//$("#explain").css("visibility","hidden");
  	$("#aCheck").val(this.currentQuestion.answers[0].result);
  	$("#bCheck").val(this.currentQuestion.answers[1].result);
  	$("#cCheck").val(this.currentQuestion.answers[2].result);
  	$("#dCheck").val(this.currentQuestion.answers[3].result);
  	$("#aLabel").text(this.currentQuestion.answers[0].text);
  	$("#bLabel").text(this.currentQuestion.answers[1].text);
  	$("#cLabel").text(this.currentQuestion.answers[2].text);
  	$("#dLabel").text(this.currentQuestion.answers[3].text);*/
    $("#question").append(temp);
	$("#answerdQuestion").text('Question:'+this.answered);

  	if(this.data.length>1)
  		$("#nxtBtn").prop('disabled',false);
  	else
  		$("#nxtBtn").prop('disabled',true);
  	
  	this.data.splice(number,1);
  },

  nextQuestion: function(event){

  	this.answered=this.answered+1;
  	//needs to be changed
  	$("#quiz").attr("class", "unanseredQuiz");
  	$("#answerdQuestion").text('Question:'+this.answered);
  	//$(".correct").removeClass("correct");
  	$('.answerCheckbox:checked').attr('checked', false);  // Unchecks it

  	this.outputRandomQuestion();
  },

  answer: function(){
	 console.log(this.correct);
  	$("#aCheck").css("color","blue");
  	$("#alert").text('');
  	var checkedValues =[];
    var uncheckedValues =[];
  	checkedValues = $('input:checkbox:checked.answerCheckbox').map(function() {
  		return this.value;
  	}).get();
    unCheckedValues = $('input:checkbox:not(:checked).answerCheckbox').map(function() {
  		return this.value;
  	}).get();


  		console.log(checkedValues.length);
      console.log(unCheckedValues.length);
  	if (checkedValues.length != 0) {
  		//need to be changed
  		$("#quiz").attr("class", "anseredQuiz");
  	//$("#explain").css("visibility","visible");
  	console.log('here');
  	//use current question json data to get correct answer and mark it so
  	$('input:checkbox').each(function() {
  	console.log('hereq');
  	//needs to be changed
  		if(this.value==='false'){
  			//$(this).parent().css( "background-color", "red" );
  		}
  		else{
  			$(this).parent().parent().addClass("correct");
  		}
  	});

  	console.log('here2');

  		if ($.inArray('false',checkedValues)>=0){
  			console.log('wrong');
  		}
  		else{
			if ($.inArray('true',unCheckedValues)>=0){
					console.log('wrong');
				}
			else{
					console.log(this.correct);
					 this.correct=this.correct+1;
			}
  		}
		console.log(this.correct);
  		$("#score").text('Score:'+this.correct);
  	}
  }
};

$(function () {
  var quiz = new Quiz();
});
