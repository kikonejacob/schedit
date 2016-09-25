/* global expect */
/* global sinon */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as _ from 'lodash';
import * as actions from 'modules/studylevels/lib/actions.js';
import * as types from 'modules/studylevels/lib/actionTypes';
import * as testHelpers from'../helpers';
//import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
let server=null;
//let store=null;
//let rActions=null;
let data={
    put:{
        data:{"message": "ok"},
    },
    delete:{},
    post:{
        data:{"message": "ok"},
    },
    get :{
        data: {
            "id": 2,
            "name": "similique",
            "description": "Incidunt ipsum quod quam quod.",
            "status": 0
        },
    }

};
const expected = {
    get:{   levelId: 2,
            type: types.API_LEVEL_GET,
            status: 'REQUEST',
            data:data.get.data} ,
    save:{  levelId:2,
            type:types.API_LEVEL_SAVE,
            name:'changed level'},
    create:{levelId:-1,
            type:types.API_LEVEL_CREATE,
            name:'new level'},
};
describe('levels actions:', () => {
    beforeEach(function(){
        server=sinon.fakeServer.create();
        server.respondWith('GET', '/api/levels/2',
                    testHelpers.jsonOk(data.get));
        server.respondWith('PUT', '/api/levels/2',
                     testHelpers.jsonOk(data.put));
        server.respondWith('POST', '/api/levels',
                      testHelpers.jsonOk(data.post));
        server.autoRespond = true;

    });
    afterEach(() => {
        server.restore();
    });
    it('Should generetate get level action', (done) => {
        const store = mockStore({ levels: [] });
        store.dispatch(actions.levelGet(2))
            .then(() => {
                let result = store.getActions();
                expect(result).to.have.lengthOf(2);
                expect(result[0]).to.include(_.omit(expected.get,'data'));
                expect(result[1]).to.include(_.omit(expected.get,['status','data']));
                expect(result[1].data).to.deep.equal(expected.get.data);

            })
            .then(done)
            .catch(done);
        //store.clearActions();

    });
    it('Should save level action .', (done) => {
        const store = mockStore({ levels: [] });


        store.dispatch(actions.levelSave(2,{name:'changed level'}))
            .then(() => {
                const result = store.getActions();
                expect(result[0]).to.include(expected.save);
                expect(result[1]).to.include(expected.save);
            })
            .then(done)
            .catch(done);;
        server.respond();

    });


    it('Should create une new level action .', (done) => {
        const store = mockStore({ levels: [] });

        store.dispatch(actions.levelCreate({name:'new level'}))
            .then(() => {
                const rActions = store.getActions();
                expect(rActions[0]).to.include(expected.create);
                expect(rActions[1]).to.include(expected.create);
            })
            .then(done)
            .catch(done);;
        server.respond();

    });

});
