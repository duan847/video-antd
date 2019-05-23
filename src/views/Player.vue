<template>
    <div>
        <a-divider orientation="left"><h3>{{name}}</h3></a-divider>
        <a-row type="flex" justify="space-around" align="middle">
            <a-col :xs="22" :sm="18" :md="18" :lg="18" :xl="16">
                <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-fluid">
                    <source type="application/x-mpegURL">
                </video>
            </a-col>
        </a-row>

        <!--播放线路、集数。少于五集，在同一个tab中显示-->
        <a-tabs v-if="urlList!== undefined &&urlList!== null && urlList.length <= 5">
            <a-tab-pane tab="播放源" key="1">
                <a-button v-for="(url,index) in urlList" :key="index" @click="switchUrl(url.url,url.name,index)" class="episodes">{{url.name}}
                </a-button>
            </a-tab-pane>
            <a-button slot="tabBarExtraContent" :loading="loading" @click="updateAllInfoById">更新集数</a-button>
        </a-tabs>
        <a-tabs v-else>
            <a-tab-pane v-for="(line,index) in this.reversedMessage" :key="index">

                <span slot="tab">线路{{index}}</span>
                <a-button v-for="(url,index) in line" :key="index" @click="switchUrl(url.url,url.name,index)" class="episodes">{{url.name}}</a-button>
            </a-tab-pane>
            <a-button slot="tabBarExtraContent" :loading="loading" @click="updateAllInfoById">更新集数</a-button>
        </a-tabs>
        <a-row>
        <a-divider dashed orientation="left">简 介</a-divider>
        <div>{{videoDetail.synopsis}}</div>
        </a-row>
    </div>
</template>
<script>
    import {selectUrlPageById, getDetailById, updateAllInfoById} from '@/api/video'
    // import videojs from 'video.js'
    // import 'video.js/dist/video-js.css'

    export default {
        name: 'player',
        data() {
            return {
                videoDetail: {},
                urlSize: -1,
                urlList: null,
                id:  this.$route.params.id || this.$route.query.id,
                name: null,
                player: null,
                loading: false,
                urlIndex: 0
            }
        },
        created() {
            Promise.all([selectUrlPageById(this.id, {size: this.urlSize}),getDetailById(this.id)]).then(resp =>{
                this.videoDetail = resp[1]
                this.name = resp[1].name
                document.title = this.name

                this.urlList = resp[0].records
                this.initVideo()
            })
        },
        computed: {
            reversedMessage: function () {
                let arr = []
                const map = {}
                const list = this.urlList

                if (!list) return {}
                for (let i = 0; i < list.length; i++) {
                    if (i !== 0 && list[i - 1].line !== list[i].line) {
                        map[list[i - 1].line] = arr
                        arr = []
                    }
                    arr.push(list[i])
                }
                map[list[list.length - 1].line] = arr
                return map
            },title:function(){
                window.console.log(this.name)
                if(!this.name) {
                    return ''
                }
                return this.name + ' - ' + this.urlList[this.urlIndex].name
            }
        },
        beforeDestroy() {
            //销毁视频播放器
            if (this.player) {
                this.player.dispose()
            }
        },
        methods: {
            //根据id更新视频所有信息
            updateAllInfoById() {
                this.loading = true
                updateAllInfoById(this.videoDetail.id).then(resp => {
                    if (resp) {
                        this.$message.success('更新集数成功');
                        this.selectUrlPageById()
                    }
                    this.loading = false
                }).catch(()=> {
                    this.$message.error('抱歉，由于集数较多或网络不好，更新较慢，请稍等后手动刷新本页面');
                    this.loading = false
                })
            },
            //切换到下一集
            switchNext(){
                this.urlIndex = this.urlIndex + 1
                const url = this.urlIndex < this.urlList.length ? this.urlList[this.urlIndex].url : null
                if(url) {
                    this.$message.success('播放：' + this.name + " - " +this.urlList[this.urlIndex].name);
                    this.switchUrl(url,this.urlList[this.urlIndex].name,this.urlIndex)
                } else {
                    this.$message.error('已经是最后一集');
                }
            },
            switchUrl(url,name,index) {
                this.player.src(url);
                this.player.load(url);
                this.urlIndex = index
                document.title = this.title
                this.player.removeChild('TitleBar')
                this.player.addChild('TitleBar', {text:this.title});
            },
            initVideo() {
                const Component = videojs.getComponent('Component');
                const TitleBar = videojs.extend(Component, {
                    constructor: function (player, options) {
                        Component.apply(this, arguments);
                        if (options.text) {
                            this.updateTextContent(options.text);
                        }
                    },
                    createEl: function () {
                        return videojs.dom.createEl('div', {
                            className: 'vjs-title-bar',
                            style:' background: rgba(0, 0, 0, 0.3);' +
                                '  color: white;' +
                                '  font-size: 1.5em;' +
                                '  padding: .5em;' +
                                '  position: absolute;' +
                                '  top: 0;' +
                                '  left: 0;' +
                                '  width: 100%;'
                        });
                    },
                    updateTextContent: function (text) {
                        if (typeof text !== 'string') {
                            text = 'Title Unknown';
                        }
                        videojs.dom.emptyEl(this.el());
                        videojs.dom.appendContent(this.el(), text);
                    }
                });
                videojs.registerComponent('TitleBar', TitleBar);


                const _this = this
                const options= {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    // //自动播放属性,muted:静音播放，autoplay:自动播放
                    autoplay: "autoplay",
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //倍速
                    playbackRates: [0.5, 1,1.25, 1.5, 2, 4],
                    responsive: true,
                    notSupportedMessage:"视频加载失败，正在切换视频源",
                    sources: [{
                        type: "application/x-mpegURL",
                        src: this.urlList[this.urlIndex].url,
                    }],
                    userActions: {
                        hotkeys: function(event) {
                            // `this` is the player in this context
                            // 左键
                            if (event.which === 37 ) {
                                this.currentTime(this.currentTime() - 10)
                            }
                            // 上键
                            if (event.which === 38 ) {
                                this.volume(this.volume() + 0.1)
                            }
                            // `y` key = play
                            if (event.which === 39) {
                                this.currentTime(this.currentTime() + 10)
                            }
                            // 下键
                            if (event.which === 40 ) {
                                this.volume(this.volume() - 0.1)
                            }
                        }
                    },
                    controlBar: {
                        //音量条竖着显示
                        volumePanel: {
                            inline: false
                        },
                        captionsButton:false,
                        subtitlesButton: false,
                    }
                }
                //初始化视频方法
                this.player = videojs('myVideo', options,function(){
                    // 结束，如果有下一集自动播放下一集
                    this.on('ended', function() {
                        _this.switchNext()
                    })
                    // 错误，如果有下一集自动不放下一集
                    this.on('error', function() {
                        _this.$message.error("视频加载失败，切换到下一个资源")
                        _this.switchNext()
                    })
                })
                this.player.addChild('TitleBar', {text:this.title});
            }
        }
    }
</script>

<style scoped>
    .episodes{
        margin:0.12em;
    }

</style>
