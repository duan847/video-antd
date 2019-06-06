<template>
    <div>
        <div>
            <labal>我的名字</labal><a-input placeholder="给自己一个响亮的名字" :value="userName"/>
            <a-switch checkedChildren="在线" unCheckedChildren="离线" defaultChecked :change="changeConnection"/>
        </div>
        <div>
            <labal>接收人</labal><a-input :value="receiveName"/>
        </div>
        <div >
            <labal>消息</labal><a-input :value="sendMsg"/>
            <a-button type="primary" :click="sendMsg">Primary</a-button>
            <p>{{receiveMsg}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SocketIM",
        data(){
          return {
              stompClient:null,
              connected: false,
              userName: 'one',
              receiveName: 'two',
              sendMsg: '测试',
              receiveMsg: '',
          }
        },
        method:{
            changeConnection(checked){
                window.console.log(checked)
            },
            sendMsg(){
                this.stompClient.send("/queue", {}, JSON.stringify({ 'name': this.sendMsg, 'toId': this.receiveName}));
            }
        },
        created(){
            const socket = new SockJS("ws://localhost:8080/queueServer?id=1");
            this.stompClient = Stomp.over(socket);
            // var headers = {
            //     login: 'mylogin',
            //     passcode: 'mypasscode',
            //     // additional header
            //     'client-id': 'my-client-id'
            // };
            this.stompClient.connect({"Auth-Token":"bb"}, function() {
                this.connected = true
                this.stompClient.subscribe('/user/'+this.userName+'/message', function(response){
                    this.receiveMsg += response.body
                });
            });
        }
    }
</script>

<style scoped>

</style>
