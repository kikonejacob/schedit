

//helper to find an element option for griddle
export function getIndexOfOption(arr, value){
    for(let i=0; i<arr.length; i++){
        if (arr[i].value==value){
            return i;

        }
    }
};

export function getLabelOfOption(arr, value){
    for(let i=0; i<arr.length; i++){
        if (arr[i].value==value){
            return arr[i].label;

        }

    }
};

function getIndexOfK(arr, k){
    for(let i=0; i<arr.length; i++){
        let index = arr[i].indexOf(k);
        if (index > -1){
            return [i, index];
        }
    }
}