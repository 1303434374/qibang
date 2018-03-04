let apicloud = require('../../utils/apicloud.js')

Page({

    data: {
        nav: {
            page: 2,
            open: -1
        },
        tab: {
            name: ['网站建设', '品牌设计', 'APP设计'],
            state: 0
        }
    },

    onLoad: function (options) {
        if (options.id) {
            let tab = this.data.tab
            tab.state = options.id
            this.setData({
                tab: tab
            })
        }
        wx.showNavigationBarLoading()
        apicloud.api('service').query({}, (ret) => {
            this.setData({
                service: ret 
            })   
            wx.hideNavigationBarLoading()
        })
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

    tap_tab: function (event) {
        let tab = this.data.tab
        tab.state = event.currentTarget.dataset.id
        this.setData({
            tab: tab
        })
    }

})