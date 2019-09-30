$('.selectall input').click(function(){
    if($(this).is(':checked')){
        $('.stuCheckBox input').each(function(){
            //此处如果用attr，会出现第三次失效的情况
            $(this).prop("checked",true);
        });
    }else{
        $('.stuCheckBox input').each(function(){
            $(this).removeAttr("checked",false);
        });
    }
});