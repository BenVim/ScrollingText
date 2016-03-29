
///雇佣动态显示滚动显示
///加载完成，获取所有LI数据。并删除节点中的数据

var rollTextControl = {
　　　　createObj: function(){
            var rollObj = {};
            var containerName = null; //列表的容器。用于删除，和创建子对象
            var showNum = 1; //显示的数量
            var timeInterval = 1000;//间隔1秒操作一次。
            var rollData = null;//列表数据
            var dataLen = 0;
            var listHeight = -32;
            var indexID = 0;
            var animateSpeed = 1000;
            var direction = 1;//方向
            var auto = true;//自动还是手动。
            var horizontal =  true;//水平还是垂直
            var isAmimate = false;

            rollObj.init = function(_containerName, _showNum, _timeInterval, _listHeight, _animateSpeed, _dir, _auto, _horizontal){
                containerName   = _containerName;
                showNum         = _showNum;
                timeInterval    = _timeInterval;
                animateSpeed    = _animateSpeed;
                listHeight      = _listHeight;
                direction       = _dir;
                auto            = _auto;
                horizontal      = _horizontal;
                onGetData();
            }

            rollObj.next = function(){
                if(!auto && rollData.length>showNum){//数量必须大于显示数量才可以控制
                    direction = -1;
                    if(isAmimate){return;}
                    isAmimate = true;
                    rollUpdate(); 
                }
            }

            rollObj.pre = function(){
                if(!auto && rollData.length>showNum){
                    direction = 1;
                    if(isAmimate){return;}
                    isAmimate = true;
                    rollUpdate();
                }
            }

            function contorlOp(){

            }

            function onGetData(){//获取数据
                var element = document.getElementById(containerName);
                rollData = [];
                if(element){
                    while(element.hasChildNodes()) {
                        var obj = element.removeChild(element.firstChild).cloneNode(true);
                        if(obj){
                            var str = obj.tagName;
                            if(str)str=str.toLocaleLowerCase();
                            if(str=="li") rollData.push(obj); 
                        }
                    }
                }
                if(rollData!=null) startGo();
            }

            function startGo(){//初始化视图
                dataLen = rollData.length;
                for (var i = 0; i < showNum; i++) {
                    var data = rollData[i];
                    if(data) createView(data);
                }
                indexID = showNum-1;
                if(dataLen>showNum) timer();
            }

            function timer(){
                if(auto)setInterval(rollUpdate, timeInterval);
            }

            function rollUpdate(argument) {
                var nodeChild = null;
                getNextData();

                var element = document.getElementById(containerName);
                var offset ;
                if(direction<0)
                    offset = listHeight * direction;//方向控制
                else
                    offset = 0;

                if(horizontal)
                    $("#"+containerName).animate({"top":offset}, animateSpeed,animateComplete);    
                else
                    $("#"+containerName).animate({"left":offset}, animateSpeed,animateComplete);    
            }

            function animateComplete(){
                isAmimate =false;
                //动画完成后，删除最顶上的内容，并重设置容器坐标。
                var nodeChild = null;
                var element = document.getElementById(containerName);
                if(element.hasChildNodes() && element.children.length>showNum){
                    //nodeChild = direction<0 ?  element.firstChild: element.lastChild; //根据方向删除哪个节点
                    //if(nodeChild && nodeChild!=undefined){
                        if(direction<0){
                            $("#"+containerName).children(":first").remove();
                        }else{
                            $("#"+containerName).children(":last").remove();   
                        }
                        
                        //element.removeChild(nodeChild);    
                        if(horizontal)
                            $("#"+containerName).css({"top":0});
                        else
                            $("#"+containerName).css({"left":0});
                    //}
                }else{
                    //console.log("---");
                }
            }

            function createView(data){
                if(direction<0){//根据方向添加节点
                    $("#"+containerName).append(data);
                }else{
                    $("#"+containerName).prepend(data);
                    if(horizontal)
                    $("#"+containerName).css({"top":listHeight*-direction});
                    else
                    $("#"+containerName).css({"left":listHeight*-direction});
                }
            }

            function getNextData(){
                var index;
                if(direction<0){
                   if(indexID < dataLen-1){
                        indexID++;
                    }else{
                        indexID = 0;
                    } 
                    index = indexID;
                }else{
                    if(indexID < showNum){
                        index = dataLen+indexID-showNum; //反访问数据指针位置计算。小于显示数的时候计算公式
                    }else{
                        index = indexID - showNum;//大于显示数的时候，计算公式不一样。
                    }

                    if(indexID >0){
                        indexID--;
                    }else{
                        indexID = dataLen-1;
                    }
                }
                
                var data  = rollData[index];
                if(data) createView(data);
            }
            return rollObj;
        }
};