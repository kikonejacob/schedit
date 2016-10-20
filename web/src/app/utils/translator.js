export function translateCreator(lang){
    var TranslatorDic={};
    if (lang!=undefined){
        TranslatorDic=lang.consts ? lang.consts : TranslatorDic;
    }
    /**
     *
     * @param {string} text
     */
    return function(text){
        const result= TranslatorDic[text];
        if  (result){
            return result;
        }
        else{
            return text;
        }
        ;
    };

}