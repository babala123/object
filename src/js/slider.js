//创建构造函数
function Slider(containerId){
	this.containerId = $(containerId);  //获取页面中的大盒子
	//获取ul中的li
	this.ullis = $get($get(containerId,"ul")[0],"li");
	this.num = this.ullis.length;  //获取ullis的数组长度
	this.ollis = this.createList(); //创建并获取ol中所有的li
	this.indexA = 1;  //指定索引为1
	this.timer;
	this.init(this.indexA); //调用init函数
	this.ltBtn = $("ltBtn"); //获取左按钮
	this.rtBtn = $("rtBtn"); //获取右按钮
	this.mouseenter();  //调用mouseenter方法
	this.autoplay(this.indexA);  //调用自动轮播
	console.info(this.ollis);
}
//创建ol
Slider.prototype.createList = function(){
	var ol = $create("ol");   //创建ol标签      相当于document.createElement("ol");
	var lis = [];   //用来放置创建的所有li标签
	//创建ol中的li
	for(var i = 0; i < this.num; i ++){
		var li = $create("li");  //创建li标签
		ol.appendChild(li);  //将li标签添加到ol中
		lis.push(li);  //将li元素加到lis数组中
	}
	this.containerId.appendChild(ol); //将ol添加到指定的盒子中
	//设置左span
	var spanleft = $create("span"); //创建span元素
	spanleft.innerHTML = "&lt;"  //给span元素中添加内容<
	spanleft.id = "ltBtn"; //给span添加id属性
	this.containerId.appendChild(spanleft);  //将左span添加到指定的盒子中
	//设置右span
	var spanright = $create("span");  //创建右span元素
	spanright.innerHTML = "&gt;";  //给右spanf元素添加内容>
	spanright.id = "rtBtn";   //给右span添加id属性
	this.containerId.appendChild(spanright);  //将右span添加到指定的盒子中
	//设置显示文字的div
	var div = $create("div");  //创建div元素
	div.id = "msg"; //设置div的id属性
	this.containerId.appendChild(div); //将div添加到指定的盒子中
	return lis;
}
//初始化方法
Slider.prototype.init = function(index){
	this.moveto(index);
}
Slider.prototype.mouseenter = function(){
	var that = this;  //记录当前this对象
	for(var i = 0; i < this.num; i ++){
		this.ollis[i].index = i; //记录当前ol中li的下标
		//给ol中所有li元素添加鼠标移入事件
		this.ollis[i].onmouseenter = function(){
			that.moveto(this.index);  //调用moveto方法
		}
	}
	//给左按钮添加点击事件
	this.ltBtn.onclick = function(){
		//当索引值大于0时
		if(that.indexA > 0){
			that.indexA --; 
			that.moveto(that.indexA);
		}else{
			that.indexA = that.num - 1;
			that.moveto(that.indexA);
		}
	}
	//给右按钮添加点击事件
	this.rtBtn.onclick = function(){
		if(that.indexA < that.num - 1){
			that.indexA ++;
			that.moveto(that.indexA);
		}else{
			that.indexA = 0;
			that.moveto(that.indexA);
		}
	}
}
Slider.prototype.moveto = function(index){
	//将ul中的li元素全部隐藏，ol中的li元素全部设置背景为红色
	for(var i = 0;i < this.num; i ++){
		this.ullis[i].style.display = "none";
		this.ollis[i].style.backgroundColor = "red";
	}
	//ul中当前的li元素display为block
	this.ullis[index].style.display = "block";
	//ol中当前的li元素背景为蓝色
	this.ollis[index].style.backgroundColor = "blue";
	//给div中的添加内容为图片的alt属性值
	$("msg").innerHTML = this.ullis[index].firstChild.firstChild.alt;
}
//自动轮播
Slider.prototype.autoplay = function(indexA){
	var that = this; //记录当前this对象
	//设置计时器
	that.timer = setInterval(function(){
		indexA %= that.num; //让索引值产生循环
		that.moveto(indexA); //调用moveto方法
		indexA ++;
	},3000);
	//当鼠标移入大Div时，停止计时器
	that.containerId.onmouseenter = function(){
		clearInterval(that.timer);
		console.info(that.containerId);
	}
	//当鼠标移出时，开始自动轮播
	that.containerId.onmouseleave = function(){
		that.autoplay(indexA);
	}
}
