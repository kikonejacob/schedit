/* global expect */
/* global sinon */


import reducers from 'modules/studylevels/lib/reducers.js';
import * as types from 'modules/studylevels/lib/actionTypes';
import {RESTAPI_REQUEST,RESTAPI_RECEIVE} from 'lib/common/actionTypes';


const reducer=reducers.levels;

describe('level reducers', () => {
    it('should return the initial state', () => {
        let  action={
            type:'undefined'
        };
        expect(reducer([],action)).to.have.lengthOf(0);
    });
    it('should return API_LEVEL_GET  REQUEST', () => {
        let action={
            type:types.API_LEVEL_GET,
            status:RESTAPI_REQUEST,
            levelId:2
        };
        expect(reducer({}, action) ).to.deep.equal({
            2:{isFetching: true,
                  data:{},
                  didInvalidate: false,
              }
          });
    });
    it('should return API_LEVEL_GET RECEIVE ', () => {
        let action={
            type:types.API_LEVEL_GET,
            status:RESTAPI_RECEIVE,
            data:{},
            levelId:2
        };
        expect(
              reducer([], action)
          ).to.deep.equal({
              2:{
                  isFetching: false,
                  data:{},
                  didInvalidate: false,

              }
          });
    });


});
