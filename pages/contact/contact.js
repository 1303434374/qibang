
Page({

    data: {
        nav: {
            page: 5,
            open: -1
        },
        name: '',
        tel: '',
        mail: '',
        need: '',
        submit: ''
    },

    onLoad: function (options) {

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

    input_value: function (event) {
        let name = ''
        switch (event.currentTarget.dataset.id) {
            case '0':
                name = 'name'
                break
            case '1':
                name = 'tel'
                break
            case '2':
                name = 'mail'
                break
            case '3':
                name = 'need'
                break
        }
        this.setData({
            [name]: event.detail.value
        })
    },

    tap_button: function (event) {
        let name = this.data.name
        let tel = this.data.tel
        let mail = this.data.mail
        let need = this.data.need
        if (name == '' || tel == '' || mail == '' || need == '') {
            wx.showToast({
                title: '请把信息填写完整',
                icon: 'none',
                duration: 1000
            })
        } else if (name + tel + mail + need == this.data.submit) {
            wx.showToast({
                title: '请不要重复提交',
                icon: 'none',
                duration: 1000
            })
        } else {
            wx.request({
                url: `https://www.sz-qibang.com/api/index.php?m=jk&c=needlist`,
                data: {
                    name: name,
                    tel: tel,
                    mail: mail,
                    need: need
                },
                success: (ret) => {
                    this.setData({
                        submit: name + tel + mail + need
                    })
                    wx.showToast({
                        title: '提交成功，我们会尽快与您联系',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    }

})