var quiz = {};//all variables will be contained within this array. This will stop the global namespace from being polluted.
quiz.data;
quiz.correct;
quiz.answered;
quiz.currentQuestion={};
quiz.init = function(){

	console.log("init ");
	quiz.correct=0;
	quiz.answered=1;
	$("#answerdQuestion").text('Question:'+quiz.answered);
	$.getJSON( "questions.json", quiz.populateData);
 }
quiz.getXml= function(){
	var xml = $.parseXML(questions.xml),
	$xml = $( xml ),
	$test = $xml.find('question[number]="1"');
	console.log($test.text());
 }
 quiz.populateData= function(data){
		// take data in report and output it to the report table
		quiz.data = data;
		$q = quiz.data.questions.question[1];
		console.log($q);
		quiz.outputRandomQuestion();
	}
quiz.outputRandomQuestion= function(){
	$("#nav").empty();
	console.log('Length='+quiz.data.questions.question.length);
	var number = Math.floor((Math.random() * quiz.data.questions.question.length-1)+1);
	console.log('Random Number='+number);
	quiz.currentQuestion= quiz.data.questions.question[number];
	console.log(quiz.data.questions.question[number]);
	$("#question").text(quiz.currentQuestion.q);
	$("#explain").text(quiz.currentQuestion.ex);
	//$("#explain").css("visibility","hidden");
	$("#aCheck").val(quiz.currentQuestion.a['-answer']);
	$("#bCheck").val(quiz.currentQuestion.b['-answer']);
	$("#cCheck").val(quiz.currentQuestion.c['-answer']);
	$("#dCheck").val(quiz.currentQuestion.d['-answer']);
	$("#aLabel").text(quiz.currentQuestion.a['#text']);
	$("#bLabel").text(quiz.currentQuestion.b['#text']);
	$("#cLabel").text(quiz.currentQuestion.c['#text']);
	$("#dLabel").text(quiz.currentQuestion.d['#text']);
	var $answer= $('<input/>').attr({ type: 'button', name:'btn_a',id:'btn_a', value:'Answer'});
	if(quiz.data.questions.question.length>2)
		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next'});
	else
		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next',disabled:'disabled'});
	$("#nav").append($answer);
	$("#nav").append($next);
	$answer.on("click",quiz.answer);
	$next.on("click",quiz.nextQuestion);
	quiz.data.questions.question.splice(number,1);
}

quiz.nextQuestion= function(){
	quiz.answered=quiz.answered+1;
	//needs to be changed
	$("#quiz").attr("class", "unanseredQuiz");
	$("#answerdQuestion").text('Question:'+quiz.answered);
	$(".correct").removeClass("correct");
	$('.answerCheckbox:checked').attr('checked', false);  // Unchecks it


	quiz.outputRandomQuestion();
}
quiz.answer = function(){
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
			quiz.correct=quiz.correct+1;

		}
		$("#score").text('Score:'+quiz.correct);
	}
}
$(quiz.init);
