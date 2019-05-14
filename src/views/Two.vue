<template>
    <div  style="width: 100%">
        <a-row :gutter="10">
            <a-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
            <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-fluid" >
                <source type="application/x-mpegURL">
            </video>
            </a-col>
        </a-row>
        <!--            播放线路、集数。少于五集，在同一个tab中显示-->
        <a-tabs v-if="urlList!== undefined &&urlList!== null && urlList.length <= 5">
            <a-tab-pane tab="播放源" key="1">
            <a-button  v-for="(url,index) in urlList" :key="index" @click="switchUrl(url.url)">{{url.name}}</a-button>
            </a-tab-pane>
            <a-button slot="tabBarExtraContent" @click="updateAllInfoById">更新集数</a-button>
        </a-tabs>
        <a-tabs v-else>
            <a-tab-pane v-for="(url,index) in urlList" :key="index" >

                <span slot="tab" v-if="index === 0 || url.line !== urlList[index-1].line">线路{{url.line}}</span>
                <a-button @click="switchUrl(url.url)">{{url.name}}</a-button>
            </a-tab-pane>
            <a-button slot="tabBarExtraContent" @click="updateAllInfoById">更新集数</a-button>
        </a-tabs>
    </div>
</template>

<script>
    import {selectUrlPageById, getDetailById, updateAllInfoById} from '@/api/video'
    import video from 'video.js'
    import 'video.js/dist/video-js.css'

    export default {
    data(){
        return {
            videoDetail:null,
            urlSize: -1,
            urlList: null,
            id: this.$route.params.id,
            name:null,
            player: null
        }
    },
        created() {
            this.selectUrlPageById()
            this.getDetailById()

        },
        methods: {
            //根据id更新视频所有信息
            updateAllInfoById() {
                updateAllInfoById(this.videoDetail.id).then(resp =>{
                    if(resp) {
                        this.$message.success('更新集数成功');
                        this.selectUrlPageById()
                    }
                })
            },
            switchUrl(url){
                this.player.src(url);
                this.player.load(url);
            },
            getDetailById(){
                getDetailById(this.id).then(resp => {
                    this.videoDetail = resp
                    this.name = resp.name
                    document.title = this.name
                })
            },
            selectUrlPageById(){
                selectUrlPageById(this.$route.params.id,{size:this.urlSize}).then(resp => {
                this.urlList = resp.records
                this.initVideo()
            })
        },
            initVideo() {
                // console.log(this.urlList)
                //初始化视频方法
                this.player = video('myVideo', {
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
                // myPlayer.on('pause', function() {
                //
                //     // Modals are temporary by default. They dispose themselves when they are
                //     // closed; so, we can create a new one each time the player is paused and
                //     // not worry about leaving extra nodes hanging around.
                //     var modal = myPlayer.createModal('This is a modal!');
                //
                //     // When the modal closes, resume playback.
                //     modal.on('modalclose', function() {
                //         myPlayer.play();
                //     });
                // });
            }, created() {
            }
        }
    }
</script>

<style scoped>

</style>
