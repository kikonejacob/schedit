
/**
 * Apply replace string base on json object
 * @param  {string} source         [description]
 * @param  {object} replaceOptions Object representing value which should be replaced
 * @return {[type]}                [description]
 */
export function replaceStrFromJson(source,replaceOptions){
    var regex = [];
    for (let prop in replaceOptions) {
        regex.push(prop);
    }
    regex = new RegExp( regex.join('|'), "g" );
    return source.replace(regex, function(match) {
        return replaceOptions[match];
    });
}
