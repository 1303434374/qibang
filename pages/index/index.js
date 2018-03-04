let apicloud = require('../../utils/apicloud.js')
let dedecms = require('../../utils/dedecms.js')

Page({

    data: {
        show: true,
        nav: {
            page: 0,
            open: -1
        },
        tab: {
            name: ['网站建设', '品牌设计', 'APP设计'],
            state: 0
        },
        bar_state: 0,
        bar_hide: false,
        case_website: {
            content: [],
            skip: 0,
            max: false
        },
        case_logo: {
            content: [],
            skip: 0,
            max: false
        },
        case_app: {
            content: [],
            skip: 0,
            max: false
        }
    },

    onLoad: function (options) {
        if (options.item) {
            this.change_page(1)
        }
        wx.showNavigationBarLoading()
        apicloud.api('swiper').query({}, (ret) => {
            this.setData({
                swiper: ret 
            })   
        })
        dedecms.api([
            'indexlist',
            'case&typeid=30&skip=0',
            'case&typeid=50&skip=0',
            'case&typeid=48&skip=0'
        ], (ret) => {
            let news = []
            let arr = ret[0].news
            for (let key in arr) {
                let obj = {}
                obj.id = arr[key].id
                obj.typeid = arr[key].typeid
                obj.title = arr[key].title
                obj.date = dedecms.formatTime(arr[key].pubdate, 'M-D')
                obj.info = arr[key].description
                news.push(obj)
            }
            this.setData({
                website: ret[0].website,
                logo: ret[0].logo,
                app: ret[0].app,
                news: news,
                case_website: {
                    content: ret[1],
                    skip: 9,
                    max: false
                },
                case_logo: {
                    content: ret[2],
                    skip: 9,
                    max: false
                },
                case_app: {
                    content: ret[3],
                    skip: 9,
                    max: true
                },
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
        if (this.data.bar_state == 1) {
            this.change_page(0)
        }
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
            nav: nav,
            bar_hide: true
        })
    },

    tap_cancel: function (event) {
        let nav = this.data.nav
        nav.open = 0
        this.setData({
            nav: nav,
            bar_hide: false
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
            nav: nav,
            bar_hide: false
        })
        switch (item) {
            case 0:
                this.change_page(0)
                break
            case 1:
                this.change_page(1)
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

    tap_bar: function (event) {
        let id = event.currentTarget.dataset.id
        if (id <= 1) {
            let nav = this.data.nav
            nav.open = -1
            this.setData({
                nav: nav,
                bar_hide: false
            })
            this.change_page(id)
        } else if (id == 3) {
            this.tap_tel()
        }
    },

    change_page: function (id) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
        let nav = this.data.nav
        let tab = this.data.tab
        nav.page = id
        tab.state = 0
        this.setData({
            nav: nav,
            tab: tab,
            bar_state: id
        })
    },

    tap_tab: function (event) {
        let tab = this.data.tab
        tab.state = event.currentTarget.dataset.id
        this.setData({
            tab: tab
        })
    },

    tap_service: function (event) {
        wx.navigateTo({
            url: `../service/service?id=${event.currentTarget.dataset.id}`
        })
    },

    tap_case: function (event) {
        wx.navigateTo({
            url: `../case-detail/case-detail?id=${event.currentTarget.dataset.id}&typeid=${event.currentTarget.dataset.typeid}`
        })
    },

    tap_news: function (event) {
        wx.navigateTo({
            url: `../news-detail/news-detail?id=${event.currentTarget.dataset.id}&typeid=${event.currentTarget.dataset.typeid}`
        })
    },

    tap_button: function (event) {
        if (event.currentTarget.dataset.type == 'case') {
            this.change_page(1)
        } else {
            wx.navigateTo({
                url: '../news/news'
            })
        }
    },

    tap_more: function (event) {
        wx.showNavigationBarLoading()
        let name = ''
        let type = ''
        let typeid = event.currentTarget.dataset.id
        if (typeid == 30) {
            name = 'case_website'
            type = this.data.case_website
        } else if (typeid == 50) {
            name = 'case_logo'
            type = this.data.case_logo
        } else if (typeid == 48) {
            name = 'case_app'
            type = this.data.case_app
        }
        dedecms.api([`case&typeid=${typeid}&skip=${type.skip}`], (ret) => {
            let max = false
            if (ret[0].length < 9) {
                max = true
            }
            type.content = type.content.concat(ret[0])
            type.skip += ret[0].length
            type.max = max
            this.setData({
                [name]: type
            })
            wx.hideNavigationBarLoading()
        })
    }

})
