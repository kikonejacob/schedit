import RestData from 'utils/restdata';


export function listLevels(){

    var data={};
    let model= new  RestData({
        channel:'student.info',
        url:'../api/levels'

    });


    data=model.get();

    return data;
}

export function listBranches(){

    var data={};
    let model= new  RestData({
        channel:'student.info',
        url:'../api/branches'

    });


    data=model.get();

    return data;
}