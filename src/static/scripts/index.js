/*������tabҳ�л�*/
$('#settingTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

/*��ק*/
var $win = $(window);

var lyt = {
    init:function(ele1,ele2,direction){
        this.$ele1 = ele1;
        this.$ele2 = ele2;
        this.$direction = direction;

        //��ʼ���¼�
        this.initEvts();
    },
    initEvts:function(){
        //���巢���仯ʱ���¼���߶Ȼ��߿��
        var me = this;
        $win.on('resize.lyt',function(e){
            if(me.$direction === 'horizontal'){
                me.$ele1Width = me.$ele1.outerWidth(true);
                me.$ele2Width = me.$ele2.outerWidth(true);
            }else if(me.$direction === 'vertical'){
                me.$ele1Height = me.$ele1.outerHeight(true);
            }
        });
    },
    //�����߶Ȼ��߿��
    adjust:function(px){
        if(this.$direction === 'horizontal'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('width',this.$ele1Width+px);
            this.$ele2.addClass('no-flex');
            this.$ele2.css('width',this.$ele2Width-px);
        }else if(this.$direction === 'vertical'){
            this.$ele1.addClass('no-flex');
            this.$ele1.css('height',this.$ele1Height+px);
        }
    }
};
lyt.init($('#lytCell1'),$('#lytCell2'),'horizontal');
lyt.init($('#lytCell2'),$('#lytCell3'),'horizontal');
lyt.init($('#lytRow1'),$('#lytRow2'),'vertical');

var splitter = {
    init:function(ele){
        var me = this,
            eleSplitter = ele;
        this.$vl = eleSplitter.draggable({
            containment: 'parent',
            scroll: false,
            axis: me.$direction === 'horizontal'?'x' : (me.$direction === 'vertical'?'y':''),
            drag: function(evt,ui){
                //���㱾���϶����λ������һ��λ�õĲ�ֵ
                ui.pos = me.$direction === 'horizontal'?ui.position.left : (me.$direction === 'vertical'?ui.position.top:'');
                var dis = ui.pos - me.pos0;
                me.onDrag(dis);
            }
        });
        if(this.$direction === 'horizontal') {
            this.width = this.$vl.width();
        }else if(this.$direction === 'vertical') {
            this.height = this.$vl.height();
        };
        this.initPos();
        this.initEvts();
    },
    initEvts: function(){
        var me = this;
        $win.on('resize.splitter',function(){
            me.initPos();
        });
    },
    initPos:function(){
        if(this.$direction === 'horizontal'){
            this.pos0 = lyt.$ele1Width - this.width/2;
            this.$vl.css('left',this.pos0);
        }else if(this.$direction === 'vertical'){
            this.pos0 = lyt.$ele1Height - this.height/2;
            this.$vl.css('top',this.pos0);
        }
    },
    onDrag: function(dis){
        lyt.adjust(dis);
    }
};
splitter.init($('#splitterV1'));
splitter.init($('#splitterV2'));
splitter.init($('#splitterH'));

/*��Ӷ����ļ���ɾ������*/
function close(id,ele){
    id.on('click',ele,function(){
        var $row = $(this).closest('ul');
        var len = $row.find('li').length;
        if(len>2){
            $(this).closest('li').remove();
        }
    })
};
close($('#sortableCss'),'.btn-close-item');
close($('#sortableJs'),'.btn-close-item');

/*��Ӷ����ļ������ӹ���*/
function addList(id,pid,ele){
    id.on('click',function(){
        $(this).closest('form').siblings('ul').append('<li class="list-item-file">' +
            '<div class="input-group lyt-margin">' + '<span class="input-group-addon mouse-pointer">' +
            '<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> </span>' +
            '<input type="text" class="form-control"/><span class="input-group-addon mouse-pointer btn-close-item">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span></div>');
        close(pid,ele);
    });
};
addList($('#addStyle'),$('#sortableCss'),'.btn-close-item');
addList($('#addScript'),$('#sortableJs'),'.btn-close-item');





//��ʼ��jsѡ�����
new extraAssets('Javascript');

//��ʼ��cssѡ�����
new extraAssets('CSS');


/*�������ļ�����*/
function addFlie(id,uid){
    var $selection = id.on('change',function(){
        var $val = $selection.val();
        var $list = id.closest('form').siblings(uid).find('input');
        var $len = $list.length;
        for(var i=0;i<$len;i++){
            var $value = $list[i].value;
            var $input = $list[i];
            if($value == ''){
                $input.attr('value',$val);
                return false;
            }
        }
        /*$list.each(function(){
            var $valInput = $(this).val();
            console.log($valInput);
            if($valInput == ''){
                $valInput.innerText = $val;
            }
            else{
                var $newItem = '<li class="list-item-file">' +
                    '<div class="input-group lyt-margin">' + '<span class="input-group-addon mouse-pointer">' +
                    '<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> </span>' +
                    '<input type="text" class="form-control"/><span class="input-group-addon mouse-pointer btn-close-item">' +
                    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span></div>'
                var $newInput = $newItem.find('input');
                $newInput.attr('value',$val);
            }
        });*/
    });
};
//addFlie($('#anotherStyle'),'#sortableCss');
//addFlie($('#anotherScript'),'#sortableJs');

