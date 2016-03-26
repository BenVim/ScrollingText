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

            rollObj.init = function(_containerName, _showNum, _timeInterval, _listHeight, _animateSpeed){
                containerName   =  _containerName;
                showNum         = _showNum;
                timeInterval    = _timeInterval;
                animateSpeed    = _animateSpeed;
                listHeight      = _listHeight;
                onGetData();
            }

            function onGetData(){
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

            function startGo(){
                dataLen = rollData.length;
                for (var i = 0; i < showNum; i++) {
                    var data = rollData[i];
                    if(data) createView(data);
                }
                indexID = showNum-1;
                if(dataLen>showNum) timer();
            }

            function timer(){
                setInterval(rollUpdate, timeInterval);
            }

            function rollUpdate(argument) {
                getNextData();
                var element = document.getElementById(containerName);
                if(element.hasChildNodes()){
                    firstChild = element.firstChild;
                    $("#"+containerName).animate({'top':listHeight}, animateSpeed,animateComplete);    
                }
            }

            function animateComplete(){
                //动画完成后，删除最顶上的内容，并重设置容器坐标。
                var firstChild = null;
                var element = document.getElementById(containerName);
                if(element.hasChildNodes() && element.children.length>showNum){
                    firstChild = element.firstChild;
                    if(firstChild){
                        element.removeChild(element.firstChild);    
                        $("#"+containerName).css({'top':0});
                    }
                }else{
                    indexID--;
                    //console.log("faild" + element.children.length);
                    //console.log(element.hasChildNodes());
                    //console.log(element.children.length);
                }
            }

            function createView(data){
                $("#"+containerName).append(data);
            }

            function getNextData(){
                if(indexID < dataLen-1){
                    indexID++;
                }else{
                    indexID = 0;
                }

                var data  = rollData[indexID];
                //console.log(data, rollData.length, indexID);
                if(data) createView(data);
            }
            return rollObj;
        }
};