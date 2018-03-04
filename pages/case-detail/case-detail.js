let dedecms = require('../../utils/dedecms.js')
let WxParse = require('../../wxParse/wxParse.js');

Page({

    data: {
        show: true,
        nav: {
            page: 1,
            open: -1
        },
        detail: {}
    },

    onLoad: function (options) {
        wx.showNavigationBarLoading()
        dedecms.api([`casedetail&id=${options.id}&typeid=${options.typeid}`], (ret) => {
            let detail = this.data.detail
            detail.id = options.id
            detail.typeid = options.typeid
            detail.title = ret[0].detail.title
            detail.click = ret[0].detail.click
            if (options.typeid == 50) {
                WxParse.wxParse('article', 'html', '暂无简介', this)
                let images = []
                let str = ret[0].detail.body
                let arr = str.match(/\/uploads\/(\S*)g/g)
                for (let key in arr) {
                    images.push('https://www.sz-qibang.com' + arr[key])
                }
                detail.images = images
            } else {
                let str = ret[0].detail.bigimg
                if (ret[0].detail.body.length > 20) {
                    WxParse.wxParse('article', 'html', ret[0].detail.body, this)
                } else {
                    WxParse.wxParse('article', 'html', '暂无简介', this)
                }
                detail.image = 'https://www.sz-qibang.com' + str.substring(str.indexOf('}', 2) + 2, str.indexOf('{', 2) - 1)
            }
            this.setData({
                detail: detail,
                caselist: ret[0].caselist,
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

    tap_image: function (event) {
        wx.previewImage({
            urls: [this.data.detail.image]
        })
    },

    tap_case: function (event) {
        wx.navigateTo({
            url: `../case-detail/case-detail?id=${event.currentTarget.dataset.id}&typeid=${event.currentTarget.dataset.typeid}`
        })
    }

})