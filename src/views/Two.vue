<template>
    <div align="center">
        <div style="width:80%">
            <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-fluid" >
                <source type="application/x-mpegURL">
            </video>
        </div>
    </div>
</template>

<script>
    import {selectUrlPageById, getDetailById} from '@/api/video'
    import video from 'video.js'
    import 'video.js/dist/video-js.css'

    export default {
    data(){
        return {
            urlSize: -1,
            urlList: null,
            id: this.$route.params.id,
            name:null
        }
    },
        created() {
            this.selectUrlPageById()
            this.getDetailById()

        },
        methods: {
            getDetailById(){
                getDetailById(this.id).then(resp => {
                    this.name = resp.name
                    document.title = this.name
                })
            },
            selectUrlPageById(){
                selectUrlPageById(this.$route.params.id,{size:this.urlSize}).then(resp => {
                this.urlList = resp.records
                this.initVideo();
                    // document.title = this.name + ' - ' +this.urlList[0].name
            })
        },
            initVideo() {
                // console.log(this.urlList)
                //初始化视频方法
                let myPlayer = video('myVideo', {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    autoplay: "muted",
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "500px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "400px",
                    //倍速
                    playbackRates: [0.5, 1, 1.5, 2, 4],
                    responsive: true,
                    sources: [{
                        type: "application/x-mpegURL",
                        src:this.urlList[0].url,
                    }],
                    userActions: {
                        hotkeys: function (event) {
                            // `this` is the player in this context
                            // `x` key = pause
                            if (event.which === 88) {
                                this.pause();
                            }
                            // `y` key = play
                            if (event.which === 89) {
                                this.play();
                            }
                        }
                    }
                });
                myPlayer.on('pause', function() {

                    // Modals are temporary by default. They dispose themselves when they are
                    // closed; so, we can create a new one each time the player is paused and
                    // not worry about leaving extra nodes hanging around.
                    var modal = myPlayer.createModal('This is a modal!');

                    // When the modal closes, resume playback.
                    modal.on('modalclose', function() {
                        myPlayer.play();
                    });
                });
            }, created() {
                //接收路由参数，params方式
                // console.log(this.$route.params.id)
            }
        }
    }
</script>

<style scoped>

</style>
