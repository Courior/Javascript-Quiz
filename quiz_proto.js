var Quiz = function () {
  this.data = undefined;
  this.correct = undefined;
  this.answered = undefined;
  this.currentQuestion = {};
  this.ajaxSettings= {
    method  : 'get',
    url     : '/quiz/JavaScript-Quiz/questions.xml',
    timeout : 3000,
    success : this.parseXml,
		error   : this.errorHandler,
		complete: this.completeHandler
	};


  	console.log("init ");
  	this.correct=0;
  	this.answered=1;
  	$("#answerdQuestion").text('Question:'+this.answered);
  //	$.getJSON( "questions.json", this.populateData);
  /*	$.ajax({
      type: "GET",
      url: "questions.xml",
      dataType: "xml",
      success: this.parseXml
  	});*/
    //make AJAX call
    $.ajax(this.ajaxSettings);

};

Quiz.prototype = {
  parseXml: function(xml){
  	//create array questions
  	var questions = [];
  	console.log("parseXml");
  	console.log(xml);
  	//console.log($(xml).find('question').each().text());
  /*	var question = $(xml).find('question')
  	.each(function(question){
  		console.log(question);
  		//add each question to data json
  		//add each text to question
  		console.log($(question).find('text').text());
  		//add each explanaion to question
  		console.log($(question).find('explanation').text());

  		//add each answer to question

  	})*/
  	//add each question to array
  },
  errorHandler: function(err){
      console.log(err);
  },

  completeHandler: function (){
      console.log('AJAX call is complete');
  },
  getXml: function(data){
  	console.log(data);
  	console.log($(data).find('question[number="1"]').text());
  },

  populateData: function(data){
		// take data in report and output it to the report table
		this.data = data;
		$q = this.data.questions.question[1];
		console.log($q);
		this.outputRandomQuestion();
	},
  outputRandomQuestion: function(){
  	$("#nav").empty();
  	console.log('Length='+this.data.questions.question.length);
  	var number = Math.floor((Math.random() * this.data.questions.question.length-1)+1);
  	console.log('Random Number='+number);
  	this.currentQuestion= this.data.questions.question[number];
  	console.log(this.data.questions.question[number]);
  	$("#question").text(this.currentQuestion.q);
  	$("#explain").text(this.currentQuestion.ex);
  	//$("#explain").css("visibility","hidden");
  	$("#aCheck").val(this.currentQuestion.a['-answer']);
  	$("#bCheck").val(this.currentQuestion.b['-answer']);
  	$("#cCheck").val(this.currentQuestion.c['-answer']);
  	$("#dCheck").val(this.currentQuestion.d['-answer']);
  	$("#aLabel").text(this.currentQuestion.a['#text']);
  	$("#bLabel").text(this.currentQuestion.b['#text']);
  	$("#cLabel").text(this.currentQuestion.c['#text']);
  	$("#dLabel").text(this.currentQuestion.d['#text']);
  	var $answer= $('<input/>').attr({ type: 'button', name:'btn_a',id:'btn_a', value:'Answer'});
  	if(this.data.questions.question.length>2)
  		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next'});
  	else
  		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next',disabled:'disabled'});
  	$("#nav").append($answer);
  	$("#nav").append($next);
  	$answer.on("click",this.answer);
  	$next.on("click",this.nextQuestion);
  	this.data.questions.question.splice(number,1);
  },

  nextQuestion: function(){
  	this.answered=this.answered+1;
  	//needs to be changed
  	$("#quiz").attr("class", "unanseredQuiz");
  	$("#answerdQuestion").text('Question:'+this.answered);
  	$(".correct").removeClass("correct");
  	$('.answerCheckbox:checked').attr('checked', false);  // Unchecks it


  	this.outputRandomQuestion();
  },
  answer: function(){
  	$("#aCheck").css("color","blue");
  	$("#alert").text('');
  	var checkedValues =[];
  	checkedValues = $('input:checkbox:checked').map(function() {
  		return this.value;
  	}).get();


  		console.log(checkedValues.length);
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
  			$(this).parent().addClass("correct");
  		}
  	});

  	console.log('here2');

  		if ($.inArray('false',checkedValues)>=0){
  			console.log('wrong');
  		}
  		else{
  			this.correct=this.correct+1;

  		}
  		$("#score").text('Score:'+this.correct);
  	}
  }
};

$(function () {
  quiz = new Quiz();
});
