var quiz = {};//all variables will be contained within this array. This will stop the global namespace from being polluted.
quiz.data;
quiz.correct;
quiz.answered;

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
	var q = quiz.data.questions.question[number].q;
	var a = quiz.data.questions.question[number].a;
	var b = quiz.data.questions.question[number].b;
	var c = quiz.data.questions.question[number].c;
	var d = quiz.data.questions.question[number].d;
	var ex= quiz.data.questions.question[number].explanation;
	console.log(quiz.data.questions.question[number]);
	$("#question").text(q);
	$("#explain").text(ex);
	$("#explain").css("visibility","hidden");
	$("#aCheck").val(a['-answer']);
	$("#bCheck").val(b['-answer']);
	$("#cCheck").val(c['-answer']);
	$("#dCheck").val(d['-answer']);
	$("#aLabel").text(a['#text']);
	$("#bLabel").text(b['#text']);
	$("#cLabel").text(c['#text']);
	$("#dLabel").text(d['#text']);
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
	$("#answerdQuestion").text('Question:'+quiz.answered);
	$("#a").css( "background-color", "" );//resets the color to the original style
	$("#b").css( "background-color", "" );//resets the color to the original style
	$("#c").css( "background-color", "" );//resets the color to the original style
	$("#d").css( "background-color", "" );//resets the color to the original style
	$('#aCheck').attr('checked', false);  // Unchecks it
	$('#bCheck').attr('checked', false);  // Unchecks it
	$('#cCheck').attr('checked', false);  // Unchecks it
	$('#dCheck').attr('checked', false);  // Unchecks it

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

	$("#explain").css("visibility","visible");
	console.log('here');
	$('input:checkbox').each(function() {
	console.log('hereq');
		if(this.value=='false')
			$(this).parent().css( "background-color", "red" );
		else
			$(this).parent().css( "background-color", "green" );
	});

	console.log('here2');

		if ($.inArray('false',checkedValues)>=0){
			console.log('wrong');
		}
		else{
			quiz.correct=quiz.correct+1;
			$("#score").text('Score:'+quiz.correct);
		}
	}
}
$(quiz.init);
