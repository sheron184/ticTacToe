/*
Tic tac toe game
VERSION 1.2
2nd Edition
SJTECH Creation
*/
$(document).ready(function(){
	round = 0;
	checked_boxes=[];
	//fixing height
	var width = $(".check-box").width();
	var h = width + 37;
	var height = h + "px";
	$(".check-box").css("height",height);

	$(".check-box").on("click",function(){
		round++;
		color = $("#color").val();
		checked_id = $(this).attr("id");
		checked_boxes.push(checked_id);

		//console.log(checked_id);
		if(color == "#000000"){
			errs = $(".msg-box").find(".msg");
			if(errs.length == 0){
				err = "<div class='msg shadow border-danger p-3 ml-auto mr-auto'><a class='close-btn'>&#10005;</a><h5 class='warning text-danger text-center'>Please choose a color..!</h5></div>";
				$(err).appendTo(".msg-box");
			}
		}else{
			check_node = `<div class='check-node' style='background-color:${color};'></div>`;
			var isFilled = $(this).find(".check-node");
			if(isFilled.length == 0){
				$(check_node).appendTo(this);
			}
			
			
			ai_turn(checked_id,round,checked_boxes);
			check_for_win();
			
		}
	});

	//====================================************============================================//
	function checkedBoxes(){
		var allcheckedboxes=0;
			var boxArr = ['#a1','#a2','#a3','#b1','#b2','#b3','#c1','#c2','#c3'];
			for(var q=0;q<boxArr.length;q++){
						
					var tt_id = boxArr[q];
					//console.log(tt_id);
					var tt_node = $(tt_id).find(".check-node");
					if(tt_node.length !=0){
							allcheckedboxes++;
							console.log("gotvld ");
					}
						
			}
			console.log(allcheckedboxes);
			return allcheckedboxes;
	}

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
		var c = 0;
		var you = 0;
		var ai = 0;
		var fails =0;
			for(var j=0;j<8;j++){
				for(var n=0;n<3;n++){
					var id = "#" + route[routes[j]][n];
					var node = $(id).find(".check-node");
					var this_color = $(node).css("background-color");
					if(node.length != 0){
						//countBoxes++;
						if(this_color == "rgb(17, 17, 17)"){
							ai++;
						}else{
							you++;
						}
						c++;
					}
				}	

				//console.log(ai);
				if(you>2 && ai>2){
					console.log('tie');
					$("#fade").addClass("wrapper");
					$(".winner").removeClass("hide");
					var win_msg = $(".winner").find(".win-msg");
					$(win_msg).text("It's a TIE,Well Played");
					round=0;
					break;
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
					round=0;
					break;
				}
				if(you<=2){
					fails++;
				}
				if(ai > 2){
					console.log("lost");
					$("#fade").addClass("wrapper");
					$(".winner").removeClass("hide");
					var win_msg = $(".winner").find(".win-msg");
					$(win_msg).text("You lost");
					console.log('you lost');
					round=0;
					break;
				}
				if(ai<=2){
					fails++;
				}
				console.log(fails);
				if(fails==2){
					console.log("avbe");
					var allcheckedboxes=0;
					var boxArr = ['#a1','#a2','#a3','#b1','#b2','#b3','#c1','#c2','#c3'];
					for(var q=0;q<boxArr.length;q++){
						
							var tt_id = boxArr[q];
							//console.log(tt_id);
							var tt_node = $(tt_id).find(".check-node");
							if(tt_node.length !=0){
								 allcheckedboxes++;
								 console.log("gotvld ");
							}
						
					}
					console.log(allcheckedboxes);
					if(allcheckedboxes==9){
						console.log("no result");
						$("#fade").addClass("wrapper");
						$(".winner").removeClass("hide");
						var win_msg = $(".winner").find(".win-msg");
						$(win_msg).text("No Result, Sorry!");
						fails=0;
						round=0;
						allcheckedboxes=0;
					}
				}
				allcheckedboxes=0;
				fails=0;
				c=0;
				you=0;
				ai=0;
			}
			
	}
	m=0;
	function ai_turn(id,round,picked_boxes){
		var allcheckedboxes_1 = checkedBoxes();
		//console.log(id)
		 routes = ['r1','r2','r3','r4','r5','r6','r7','r8'];
		 route = {
			r1 : ['a1','a2','a3'],
			r2 : ['a1','b1','c1'],
			r3 : ['c1','c2','c3'],
			r4 : ['b1','b2','b3'],
			r5 : ['a1','b2','c3'],
			r6 : ['a3','b2','c1'],
			r7 : ['a2','b2','c2'],
			r8 : ['a3','b3','c3']
		};
		//find which routes belong to the checked id 
		//r_find=0;
		found_paths = [];
		for(var i=0;i<8;i++){
			var path = route[routes[i]];
			//console.log(path);
			for(var f=0;f<3;f++){
				if(path[f] == id){
					found_paths.push(path);
					break;
				}
			}
		}
		//console.log(found_paths);
		rounds = found_paths.length;
		 check_node = "<div class='check-node'></div>";

		if(round==1){
			for(var r=0;r<rounds;r++){
				var path = found_paths[r];
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
	}else if(round>1){
		//console.log(round);
		//console.log("yo");
		if(round==2){
			var previous_checked_Box = picked_boxes[0];
			//console.log(previous_checked_Box);
		}
		if(round>2){
			var previous_checked_Box = picked_boxes.pop();
			//console.log(previous_checked_Box);
		}

		//console.log(previous_checked_Box);
		oneboxleft = check_1boxleft_routes(1); // =================>>>(1) getting one box left routes
		//console.log(oneboxleft);

		if(oneboxleft.length>0){
			var player = "ai";
			var twoBlackBoxesCheckedRoutes = checkTwoOnes(oneboxleft,player);// find routes with 2 black boxes are checked 
			if(twoBlackBoxesCheckedRoutes.length>0){
				checkThis(twoBlackBoxesCheckedRoutes[0]);
			}else{
				var player = "opp";
				var oppTwoBoxes = checkTwoOnes(oneboxleft,player);
				if(oppTwoBoxes.length>0){
					//console.log(oppTwoBoxes[0]);
					checkThis(oppTwoBoxes[0]);
				}else{
					checkThis(oneboxleft[0]);
				}
			}
		}else{
			var twoBoxLeft = check_1boxleft_routes(2);
			if(twoBoxLeft.length>0){
				
			}

		}


		
	}
		
	var allcheckedboxes_2 = checkedBoxes();
	if(allcheckedboxes_1 == allcheckedboxes_2 && allcheckedboxes_2<9){
		ai_turn(id,round,picked_boxes);
	}	
	}
	function check_1boxleft_routes(emptyBoxes){
		var oneBoxLeftRoutes = [];
		for(i=0;i<8;i++){ 
			var path = route[routes[i]];
			//console.log(path);
			//console.log(path);
			//var oneBoxLeftRoutes = [];
			empty=0;
			for(var boxes=0;boxes<3;boxes++){
				var bx_id = "#"+path[boxes];
				var is_checked = $(bx_id).find(".check-node");
				if(is_checked.length==0){
					empty++;
				}
			}
			//console.log(path);
			//console.log(empty);
			if(emptyBoxes==1){
				if(empty==1){
					//console.log(path);
					oneBoxLeftRoutes.push(path);
				}
			}else if(emptyBoxes==2){
				if(empty==2){
					oneBoxLeftRoutes.push(path);
				}
			}
			
		}
		//console.log(oneBoxLeftRoutes);
		return oneBoxLeftRoutes;
	}
	function checkTwoOnes(oneboxlefted,player){
		//console.log("yo");
		var foundedBoxes = [];
		for(var i=0;i<oneboxlefted.length;i++){
			var rt = oneboxlefted[i];
			var path =rt;
			//console.log(rt);
			
			var found=0;
			for(var rr=0;rr<3;rr++){
				var boxId = "#"+ path[rr];
				var isChecked = $(boxId).find(".check-node");
				//console.log(isChecked);
				if(isChecked.length != 0){
					var boxColor = $(isChecked).css("background-color");
					//console.log(boxColor);
					if(player == "ai"){
						if(boxColor == "rgb(17, 17, 17)"){
							found++;
						}
					}else if(player == "opp"){
						if(boxColor != "rgb(17, 17, 17)"){
							found++;
						}
					}
					
					//console.log(isChecked);
				}
			}
			if(found>1){
				foundedBoxes.push(path);
			}
		}
		//console.log(`${foundedBoxes} - ${player}`);
		return foundedBoxes;
	}
	
	function checkThis(rtue){
		for(var w=0;w<3;w++){
			var id = rtue[w];
			var rid = "#"+id;
			var nde = $(rid).find(".check-node");
			if(nde.length==0){
				$(check_node).appendTo(rid);
				break;
			}
		}
		
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
