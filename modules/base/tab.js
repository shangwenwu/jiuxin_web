/**
 * @project jiuxin
 * @author tangliang
 * @version 1.0
 */
;(function() {
  
    function tab (attribute, initialize) {
        this.attribute = $.extend({
            bottom:$(''),
            content:$(''),
            index:0,
            event:'mouseenter',
            bClassName:'',
            cClassName:'',
            isKeyDown : false,
            isSetDefault:false
        }, attribute || {})
        return this.init(initialize || function () {
        })
    }

    tab.prototype.set = function () {
        if (arguments.length === 1) {
            $.extend(this.attribute, arguments[0])
        } else {
            if (arguments.length === 2) {
                this.attribute[arguments[0]] = arguments[1]
            }
        }
        return this
    };
    tab.prototype.get = function (key) {
        return(typeof this.attribute[key] === "undefined") ? null : this.attribute[key]
    };
    tab.prototype.onBefore = function () {

    }
    tab.prototype.onAfter = function () {

    }
    tab.prototype.index = function (index) {
        var length = this.get('length') - 1
        var index = (typeof index === 'undefined') ? this.get('index') : index
        return (index > length) ? 0 : (index < 0) ? length : index
    }
    tab.prototype.run = function (index) {
        var index = this.index(index)
        var prevIndex = this.index(this.get('index'))
        var $bottom = this.get('bottom')
        var $content = this.get('content')
        var bClassName = this.get('bClassName')
        var cClassName = this.get('cClassName')
        this.onBefore()
        if (prevIndex != index) {
            $bottom.eq(prevIndex).removeClass(bClassName)
            $bottom.eq(index).addClass(bClassName)
            $content.eq(index).addClass(cClassName).show()
            $content.eq(prevIndex).removeClass(cClassName).hide()
            this.set('index', index)
        }
        this.onAfter()
    }
    tab.prototype.prev = function () {
        this.run(this.get('index') - 1)
    }
    tab.prototype.next = function () {
        this.run(this.get('index') + 1)
    }
    tab.prototype.init = function (initialize) {
        var me = this
        var id = this.get('id')
        var $control = $('#' + id)
        if ($control.length === 0) {
            return
        }
        var $bottom = this.get('bottom')
        var $content = this.get('content')
        var bClassName = this.get('bClassName')
        var cClassName = this.get('cClassName')
        var event = this.get('event')
        var isSetDefault = this.get('isSetDefault')
        var isKeyDown = this.get('isKeyDown')
        var length = Math.max($bottom.length, $content.length)
        var index = this.index()
        this.set({
            control:$control,
            length:length,
            index:index
        })
        if (isSetDefault) {
            $bottom.removeClass(bClassName)
            $bottom.eq(index).addClass(bClassName)
            $content.eq(index).addClass(cClassName).show()
            $content.removeClass(cClassName).hide()
        }
        if (isKeyDown){
            $control.hover(function () {
                $(document).on('keydown.keyControl', function (e) {
                    //37左 38上 39右 40下
                    e.preventDefault()
                    switch (e.which) {
                        case 37:
                            me.prev()
                            break
                        case 38:
                            me.prev()
                            break
                        case 39:
                            me.next()
                            break
                        case 40:
                            me.next()
                            break
                        default:
                    }
                })
            }, function () {
                $(document).off('keydown.keyControl')
            })
        }
        $bottom.on(event, function (e) {
            e.preventDefault()
            me.run($(this).index())
        })
        initialize.call(this)
        return this;
    }
    
    window["tab"] = tab;    
})();