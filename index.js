$(document).ready(function(){
	$(".check-box").on("click",function(){
		color = $("#color").val();
		if(color == "#000000"){
			errs = $(".msg-box").find(".msg");
			if(errs.length == 0){
				err = "<div class='msg shadow border-danger p-3 ml-auto mr-auto'><a class='close-btn'>&#10005;</a><h5 class='warning text-danger text-center'>Please choose a color..!</h5></div>";
				$(err).appendTo(".msg-box");
			}
		}else{
			var check_node = `<div class='check-node' style='background-color:${color};'></div>`;
			$(check_node).appendTo(this);
			ai_turn();
			check_for_win();
		}
	});
	function check_for_win(){
		var routes = ['r1','r2','r3','r4','r5','r6','r7','r8'];
		var route = {
			r1 : ['a1','a2','a3'],
			r2 : ['a1','b1','c1'],
			r3 : ['c1','c2','c3'],
			r4 : ['b1','b2','b3'],
			r5 : ['a1','b2','c3'],
			r6 : ['a3','b2','c1'],
			r7 : ['a2','b2','c2'],
			r8 : ['a3','b3','c3']
		};
		c = 0;
		you = 0;
		ai = 0;

			for(var j=0;j<8;j++){
				for(var n=0;n<3;n++){
					var id = "#" + route[routes[j]][n];
					var node = $(id).find(".check-node");
					var this_color = $(node).css("background-color");
					if(node.length != 0){
						if(this_color == "rgb(17, 17, 17)"){
							ai++;
						}else{
							you++;
						}
						c++;
					}
				}				
				if(you > 2){
					console.log('won');
					$("#fade").addClass("wrapper");
					$(".winner").removeClass("hide");
					//$("#fade").removeClass("hide");
					var win_msg = $(".winner").find(".win-msg");
					var score = $(".score").text();
					console.log(score);
					var new_score = parseInt(score) + parseInt(10);

					document.getElementById("demo").innerHTML = new_score;
					$(win_msg).text("Congratulations you have won..!");	
					//alert("Congratulations you have won..!");
					break;
				}
				if(ai > 2){
					$("#fade").addClass("wrapper");
					$(".winner").removeClass("hide");
					var win_msg = $(".winner").find(".win-msg");
					$(win_msg).text("You lost");
					console.log('you lost');
					break;
				}
				c=0;
				you=0;
				ai=0;
			}
	}
	m=0;
	function ai_turn(){
		var routes = ['r1','r2','r3','r4','r5','r6','r7','r8'];
		var route = {
			r1 : ['a1','a2','a3'],
			r2 : ['a1','b1','c1'],
			r3 : ['c1','c2','c3'],
			r4 : ['b1','b2','b3'],
			r5 : ['a1','b2','c3'],
			r6 : ['a3','b2','c1'],
			r7 : ['a2','b2','c2'],
			r8 : ['a3','b3','c3']
		};
		var check_node = "<div class='check-node'></div>";
		for(var r=0;r<9;r++){
			var path = route[routes[r]];
			for(var t=0;t<3;t++){
				var node_id = "#" + path[t];
				var node_1 = $(node_id).find(".check-node");
				if(node_1.length >0){
					m++;
				}
			}
			if(m>1){
				var sel_id_2 = "#" + path[2];
				var new_nodes = $(sel_id_2).find(".check-node");
				if(new_nodes.length == 0){
					$(check_node).appendTo(sel_id_2);
					break;
				}
				
			}else if(m == 1){
				var sel_id_1 = "#" + path[1];
				var new_nodes_2 = $(sel_id_1).find(".check-node");
				if(new_nodes_2.length == 0){
					$(check_node).appendTo(sel_id_1);
					break;
				}
				
			}
		}
		/*
		//console.log(m);
		check_box = {
			1:"a1",
			2:"a2",
			3:"a3",
			4:"b1",
			5:"b2",
			6:"b3",
			7:"c1",
			8:"c2",
			9:"c3"
		};
		for(var z=1;z<9;z++){
			//console.log( check_box[z]);
			var new_node = "<div class='check-node'></div>";
			var box_id = "#" + check_box[z];
			var check_boxes = $(box_id).find(".check-node");
			if(check_boxes.length == 0){
				$(new_node).appendTo(box_id);
				return true;
				break;
			}
		}
		*/
	}
	$(document).on("click",".close-btn",function(){
		$(".msg").hide();
	});
	$(".play-again").on("click",function(){
		$(".check-node").remove();
		$(".winner").addClass("hide");
		$("#fade").removeClass("wrapper");
	});
	
});
