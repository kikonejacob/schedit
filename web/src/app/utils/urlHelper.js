/**
 * Format url using this tis format url="url/:id/"
 * @param  {[type]} url  raw url
 * @param  {[type]} args [object
 * @return {[type]}      [description]
 */
export function urlFormat(url,args) {
    //var args = arguments;
    return url.replace(/:(\w+)/g, function(match) {
        let id=match.replace(':','');
        return typeof args[id] != 'undefined'
            ? args[id]
            : match
      ;
    });
};
