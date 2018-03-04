let apicloud = require('../../utils/apicloud.js')

Page({

    data: {
        show: true,
        nav: {
            page: 4,
            open: -1
        },
        tab: {
            name: ['公司简介', '团队介绍', '合作伙伴'],
            state: 0
        },
        info: [
            {
                title: '关于启邦',
                content: '启邦互动是一家专业的网站建设公司，致力于为刚创业的公司及对网页视觉设计需要提升的企业提供网站设计与建设，网站推广、品牌形象设计、网站搜索引擎优化(SEO)服务，启邦在网页设计和网站优化方面积累了丰富的经验，我们的宗旨就是为客户创造有价值的网站，启邦是很多注重网站视觉设计和SEO的企业客户的首选 。'
            },
            {
                title: '启邦观点',
                content: '创意，是我们最基本的标准 我们以创意作为泛咨的创作理念与核心。创意，是密室中时刻更改变换风景的一扇窗。同时，泛咨的创意并不只是为创意而创意的纸上谈兵——泛咨的创意是讲求前瞻的创意，也强调实效创意。 沟通，是智慧引擎的关键词 作为策划者与执行者，泛咨重视与客户之间的沟通，能有效的洞察不同客户的需求，从而输出您满意且超出期望的策略与设计作品。效率，是度量价值的标尺 泛咨力求服务的每一环节都达到更专业、更规范的程度；力求用最简单、最直接、最有效、最本质的方式，快速提升企业品牌形象，助推企业发展。'
            },
            {
                title: '启邦优势',
                content: '启邦科学系统性的帮助客户打造规范的品牌形象，而我们也将以此为契机，我们是真正意义上从甲方的利益出发，为甲方的品牌形象设计在时代中完成蜕变，做到整体的质量提升，同时迎合搜索引擎的索引规则而设计，为潜在客户而设计，为用户体验而设计。让互联网为甲方创造更大的商业价值，真正做到，轻设计，重体验等服务。'
            }
        ],
        skip: 0,
        max: false
    },

    onLoad: function (options) {
        wx.showNavigationBarLoading()
        let requests = [
            {
                method: 'GET',
                path: 'member'
            },
            {
                method: 'GET',
                path: 'partner',
                body: {
                    filter: {
                        limit: 15
                    }
                }
            }
        ]
        apicloud.api(requests, (ret) => {
            this.setData({
                member: ret[0],
                partner: ret[1],
                skip: 15,
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

    tap_tab: function (event) {
        let tab = this.data.tab
        tab.state = event.currentTarget.dataset.id
        this.setData({
            tab: tab
        })
    },

    tap_more: function (event) {
        apicloud.api('partner').query({
            filter: {
                skip: this.data.skip,
                limit: 15
            }
        }, (ret) => {
            let max = false
            if (ret.length < 15) {
                max = true
            } 
            this.setData({
                partner: this.data.partner.concat(ret),
                skip: this.data.skip + ret.length,
                max: max
            })
        })
    }

})