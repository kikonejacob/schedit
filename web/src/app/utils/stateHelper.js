/**
 * this function use closure and will return a function when objectToMerge is null
 * [merge merge the state with an object]
 * @param  {[array]} state              [description]
 * @param  {[type]} objectToMerge=null [description]
 * @return {[type]}                    [description]
 */
export function merge(state,objectToMerge=null){
    if (objectToMerge!=null){
        return Object.assign({}, state,...objectToMerge);

    }
    return (element,value)=>{
        return Object.assign({}, state,{[element]:{
            ...state[element],
            ...value
        }
    });
    };
}
