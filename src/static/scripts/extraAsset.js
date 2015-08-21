/**
 * 额外资源添加组件（css和js）
 * @param rootId 组件外层容器id
 * @param opts 组件的配置项
 */
var extraAssets = function(rootId, opts){
    //配置项默认值处理
    this.opts = opts = $.extend({},{
        cssSelect:'.add-spe-file',
        cssList:'.extra-filelist',
        cssTplFileItem:'#tplExtraFileItem'
    },opts||{});

    this.$root = $('#'+rootId);
    this.$select = this.$root.find(opts.cssSelect);
    this.$ul = this.$root.find(opts.cssList);
    this.tpl = $(opts.cssTplFileItem).html();

    this.init();
};

extraAssets.prototype = {

    init:function(){

        this.initEvents();

    },

    initEvents:function(){
        var me = this;
        this.$root.on('change', this.opts.cssSelect,function(e){

            //获取选中option的值
            var val = $(this).val();
            me.add(val);

        }).on('click','.btn-close-item',function(e){

            var $li = $(this).parents('li');
            me.remove($li);

        });

        this.$ul.sortable().disableSelection();

    },
    /**
     * 删除一行
     */
    remove:function($li){

        var len = this.$ul.find('li').length;
        if(len>2){
            $li.remove();
            return;
        }
        $li.find('input').val('');
    },
    /**
     * 新增一行
     */
    add:function(url){
        //是否存在
        if(this.exists(url)) return;
        //是否加到空行
        if(this.addToEmptyRow(url)) return;

        //增加一行
        var $row = $(this.tpl);
        $row.find('input').val(url);
        this.$ul.append($row);
    },
    /**
     * 检查是否有空的行，如果有将url设置为该空行input的值
     * @param url
     */
    addToEmptyRow:function(url){
        var $input = null;
        this.$ul.find('input').each(function(i,o){
            if(o.value === ''){
                $input = $(o);
                return false;
            }
        });

        //有空行
        if($input!==null){
            $input.val(url);
            return true;
        }

        //没有空行
        return false;

    },
    /**
     * 是否已存在记录
     */
    exists:function(url){
        //检查UL里面所有的input，判断value值是否有等于url，如果有说明存在
        var exist = false;
        this.$ul.find('input').each(function(i,o){
            if(o.value === url){
                exist = true;
                return false;
            }
        });
        return exist;
    }

};