window.onload=function(){
			//getElementsByClassName兼容
			if(!document.getElementsByClassName){
				document.getElementsByClassName=function(cls){
					var ret=[];
					var els=document.getElementsByTagName("*")
					for(var i=0;i<els.length;i++){
						var clsArr=els[i].className.split(" ")
						for(var j=0;j<clsArr.length;j++){
							if(clsArr[j]==cls){
								ret.push(els[i])
							}
						}
					}
					return ret;
				}
			}
			var cartTable=document.getElementById("cartTable");
			var tr= cartTable.children[1].rows;
			var checkInputs=document.getElementsByClassName("check");
			var checkAllInputs=document.getElementsByClassName("check-all");
			var selectedTotal=document.getElementById("selectedTotal");
			var priceTotal=document.getElementById("priceTotal");
			var selected=document.getElementById("selected");
			var foot=document.getElementById("foot");
			var selectedViewList=document.getElementById("selectedViewList");
			var deleteAll=document.getElementById("deleteall");
			var jiesuan=document.getElementById("jiesuan");
			//浮层的显示隐藏
			selected.onclick=function(){
				if(foot.className=="foot"){
					if(selectedTotal.innerHTML!=0){
					foot.className="foot show";	
					}
				}else{
					foot.className="foot";
				}
			}
			selectedViewList.onclick=function(e){
				e=e||window.e;//兼容IE的事件对象
				var el=e.srcElement||e.target;//兼容火狐的target
				if(el.className=="del"){
					var index=el.getAttribute("index");
					var input=tr[index].getElementsByTagName("input")[0];
					input.checked=false;
					input.onclick()
				}	
			}
			//小计数量的增删
			for(var i=0;i<tr.length;i++){
				tr[i].onclick=function(e){
					var e=e||window.e;
					var el=e.srcElement||e.target;
					var cls=el.className;
					var input=this.getElementsByTagName("input")[1];
					var reduce=this.getElementsByTagName("span")[1];
					var val=parseInt(input.value);
					switch(cls){
						case "add":
							input.value=val+1;
							if(input.value>1){
								reduce.innerHTML="-";
							}
							getSubTotal(this);
							break;
						case "reduce":
							input.value=val-1;
							if(input.value<=1){
								reduce.innerHTML="";
								input.value=1;
							}
							getSubTotal(this);
							break;
						case "delete":
							var cof=confirm("确定删除该商品么？");//点击删除
							if(cof){
								this.parentNode.removeChild(this);
							}
						default:
							break;
					}
					getTotal();
				}
				//点击全部删除
				deleteAll.onclick=function(){
					if (selectedTotal.innerHTML != 0) {
		            var con = confirm('确定删除所选商品吗？'); //弹出确认框
		            if (con) {
		                for (var i = 0; i < tr.length; i++) {
		                    // 如果被选中，就删除相应的行
		                    if (tr[i].getElementsByTagName('input')[0].checked) {
		                        tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
		                        i--; //回退下标位置
		                    }
		                }
		            }
		       	 } else {
		            alert('请选择商品！');
		        }
		       		 getTotal(); //更新总数
			}
								
				//输入框的小计
				tr[i].getElementsByTagName("input")[1].onkeyup=function(){
					var tr=this.parentNode.parentNode;
					var reduce=tr.getElementsByTagName("span")[1];
					var val=parseInt(this.value);
					if(isNaN(val)||val<1){
						val=1;
					}
					this.value=val;
					if(val<=1){
						reduce.innerHTML="";this.value
					}else{
						reduce.innerHTML="-";
					}
					getSubTotal(this.parentNode.parentNode);
					getTotal();
				}


			}
			//小计部分的计算函数
			function getSubTotal(tr){
				var tds=tr.cells;
				var price=parseFloat(tds[2].innerHTML);
				var input=tr.getElementsByTagName("input")[1];
				var count=parseInt(input.value);
				var subTotal=parseFloat(price*count).toFixed(2);
				tds[4].innerHTML=subTotal;
			}
			//计算总的数量和总的价格
			function getTotal(){
				var selected=0;
				var price=0;
				htmlStr="";
				for(var i=0;i<tr.length;i++){
					if(tr[i].getElementsByTagName("input")[0].checked){
						tr[i].className="on";
						selected+=parseInt(tr[i].getElementsByTagName("input")[1].value);
						price+=parseFloat(tr[i].cells[4].innerHTML);
						htmlStr += '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">取消选择</span></div>'
					}else{
						tr[i].className="";
					}
				}
				selectedTotal.innerHTML=selected;
				priceTotal.innerHTML=price.toFixed(2);
				selectedViewList.innerHTML=htmlStr;
				if(selected==0){
					foot.className="foot";
				}

			}
			for(var i=0;i<checkInputs.length;i++){
				checkInputs[i].onclick=function(){
					if(this.className==="check-all check"){
						for(var j=0;j<checkInputs.length;j++){
							checkInputs[j].checked=this.checked;
						}
					}
					if(this.checked==false){
						for(var k=0;k<checkAllInputs.length;k++){
							checkAllInputs[k].checked=false;
						}
					}
					getTotal();
				}
		}
			// 默认全选
		    checkAllInputs[0].checked = true;
		    checkAllInputs[0].onclick();
	}