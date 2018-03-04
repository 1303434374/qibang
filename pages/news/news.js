let dedecms = require('../../utils/dedecms.js')

Page({

    data: {
        show: true,
        nav: {
            page: 3,
            open: -1
        },
        tab: {
            name: ['公司动态', '行业资讯', '设计欣赏'],
            state: 0
        },
        news_page: {
            content: [],
            skip: 0,
            max: false
        },
        news_website: {
            content: [],
            skip: 0,
            max: false
        },
        news_look: {
            content: [],
            skip: 0,
            max: false
        }
    },

    onLoad: function (options) {
        wx.showNavigationBarLoading()
        dedecms.api([
            'news&typeid=31&skip=0',
            'news&typeid=21&skip=0',
            'news&typeid=47&skip=0'
        ], (ret) => {
            for (let i = 0; i < 3; i++) {
                let name = ''
                i == 0 ? name = 'news_page' : i == 1 ? name = 'news_website' : name = 'news_look'
                this.setData({
                    [name]: {
                        content: this.news_array(ret[i]),
                        skip: 8,
                        max: false
                    },
                    show: false
                })
            }
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

    tap_tab: function (event) {
        let tab = this.data.tab
        tab.state = event.currentTarget.dataset.id
        this.setData({
            tab: tab
        })
    },

    tap_news: function (event) {
        wx.navigateTo({
            url: `../news-detail/news-detail?id=${event.currentTarget.dataset.id}&typeid=${event.currentTarget.dataset.typeid}`
        })
    },

    tap_more: function (event) {
        wx.showNavigationBarLoading()
        let name = ''
        let type = ''
        let typeid = event.currentTarget.dataset.id
        if (typeid == 31) {
            name = 'news_page'
            type = this.data.news_page
        } else if (typeid == 21) {
            name = 'news_website'
            type = this.data.news_website
        } else if (typeid == 47) {
            name = 'news_look'
            type = this.data.news_look
        }
        dedecms.api([`news&typeid=${typeid}&skip=${type.skip}`], (ret) => {
            let max = false
            if (ret[0].length < 8) {
                max = true
            }
            type.content = type.content.concat(this.news_array(ret[0]))
            type.skip += ret[0].length
            type.max = max
            this.setData({
                [name]: type
            })
            wx.hideNavigationBarLoading()
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