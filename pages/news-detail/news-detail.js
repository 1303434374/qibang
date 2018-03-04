let dedecms = require('../../utils/dedecms.js')
let WxParse = require('../../wxParse/wxParse.js');

Page({

    data: {
        show: true,
        nav: {
            page: 3,
            open: -1
        },
        detail: {}
    },

    onLoad: function (options) {
        wx.showNavigationBarLoading()
        dedecms.api([`newsdetail&id=${options.id}&typeid=${options.typeid}`], (ret) => {
            let detail = this.data.detail
            detail.id = options.id
            detail.typeid = options.typeid
            detail.title = ret[0].detail.title
            detail.click = ret[0].detail.click
            detail.date = dedecms.formatTime(ret[0].detail.pubdate, 'Y-M-D')
            let str = ''
            let html = ret[0].detail.body
            let arr = html.match(/\/uploads\/(\S*)g/g)
            if (arr) {
                let time = 0
                for (let key in arr) {
                    if (time == 0){
                        str = html.replace(arr[key],'https://www.sz-qibang.com' + arr[key])
                    } else {
                        str = str.replace(arr[key],'https://www.sz-qibang.com' + arr[key])
                    }
                    time++
                }
            } else {
                str = html
            }
            WxParse.wxParse('article', 'html', str, this)
            this.setData({
                detail: detail,
                newslist: this.news_array(ret[0].newslist),
                show: false
            })
            wx.hideNavigationBarLoading()
        })
    },

    onShow: function () {
        if (!this.data.show) {
            wx.hideNavigationBarLoading()
        }
    },

    onShareAppMessage: function() {
        return {
            title: '启邦互动——深圳专业网站设计 品牌设计 小程序开发',
            path: '/pages/index/index',
            imageUrl: 'https://www.sz-qibang.com/uploads/111111/share.jpg'
        }
    },
    
    tap_logo: function (event) {
        wx.reLaunch({
            url: '../index/index'
        })
    },

    tap_tel: function (event) {
        wx.makePhoneCall({
            phoneNumber: '13724259054'
        })
    },

    tap_menu: function (event) {
        let nav = this.data.nav
        nav.open = 1
        this.setData({
            nav: nav
        })
    },

    tap_cancel: function (event) {
        let nav = this.data.nav
        nav.open = 0
        this.setData({
            nav: nav
        })
    },

    tap_item: function (event) {
        let item = event.currentTarget.dataset.item
        if (item == this.data.nav.page) {
            return
        }
        let nav = this.data.nav
        nav.open = -1
        this.setData({
            nav: nav
        })
        switch (item) {
            case 0:
                wx.reLaunch({
                    url: '../index/index'
                })
                break
            case 1:
                wx.reLaunch({
                    url: '../index/index?item=1'
                })
                break
            case 2:
                wx.navigateTo({
                    url: '../service/service'
                })
                break
            case 3:
                wx.navigateTo({
                    url: '../news/news'
                })
                break
            case 4:
                wx.navigateTo({
                    url: '../about/about'
                })
                break
            case 5:
                wx.navigateTo({
                    url: '../contact/contact'
                })
                break
        }
    },

    tap_news: function (event) {
        wx.navigateTo({
            url: `../news-detail/news-detail?id=${event.currentTarget.dataset.id}&typeid=${event.currentTarget.dataset.typeid}`
        })
    },

    news_array: function (arr) {
        let news = []
        for (let key in arr) {
            let obj = {}
            obj.id = arr[key].id
            obj.typeid = arr[key].typeid
            obj.title = arr[key].title
            obj.date = dedecms.formatTime(arr[key].pubdate, 'Y-M-D')
            obj.litpic = arr[key].litpic
            obj.info = arr[key].description
            obj.click = arr[key].click
            news.push(obj)
        }
        return news
    }

})