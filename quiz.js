var ns = {};//all variables will be contained within this array. This will stop the global namespace from being polluted.
ns.data;
ns.correct;
ns.answered;

ns.init = function(){
	console.log("init ");
	ns.correct=0;
	ns.answered=1;
	$("#answerdQuestion").text('Question:'+ns.answered);
	$.getJSON( "questions.json", ns.populateData);	
 }
ns.getXml= function(){
	var xml = $.parseXML(questions.xml),
	$xml = $( xml ),
	$test = $xml.find('question[number]="1"');
	console.log($test.text());       
 }
 ns.populateData= function(data){
		// take data in report and output it to the report table
		ns.data = data;
		$q = ns.data.questions.question[1];
		console.log($q);
		ns.outputRandomQuestion();
	}
ns.outputRandomQuestion= function(){
	$("#nav").empty();
	console.log('Length='+ns.data.questions.question.length);
	var number = Math.floor((Math.random() * ns.data.questions.question.length-1)+1);
	console.log('Random Number='+number);
	var q = ns.data.questions.question[number].q;
	var a = ns.data.questions.question[number].a;
	var b = ns.data.questions.question[number].b;
	var c = ns.data.questions.question[number].c;
	var d = ns.data.questions.question[number].d;
	var ex= ns.data.questions.question[number].explanation;
	console.log(ns.data.questions.question[number]); 
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
	if(ns.data.questions.question.length>2)
		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next'});
	else
		var $next= $('<input/>').attr({ type: 'button', name:'btn_b',id:'btn_b', value:'Next',disabled:'disabled'});
	$("#nav").append($answer);
	$("#nav").append($next);
	$answer.on("click",ns.answer);
	$next.on("click",ns.nextQuestion);
	ns.data.questions.question.splice(number,1);
}	

ns.nextQuestion= function(){
	ns.answered=ns.answered+1;
	$("#answerdQuestion").text('Question:'+ns.answered);
	$("#a").css( "background-color", "" );//resets the color to the original style
	$("#b").css( "background-color", "" );//resets the color to the original style
	$("#c").css( "background-color", "" );//resets the color to the original style
	$("#d").css( "background-color", "" );//resets the color to the original style
	$('#aCheck').attr('checked', false);  // Unchecks it
	$('#bCheck').attr('checked', false);  // Unchecks it
	$('#cCheck').attr('checked', false);  // Unchecks it
	$('#dCheck').attr('checked', false);  // Unchecks it

	ns.outputRandomQuestion();
}
ns.answer = function(){
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
			ns.correct=ns.correct+1;
			$("#score").text('Score:'+ns.correct);
		}
	}
}
$(ns.init);
