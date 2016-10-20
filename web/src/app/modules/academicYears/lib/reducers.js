
import { ACTION_TYPES } from './consts';
import { generateApiReducer } from 'lib/factories/APIreducers';

export const reducers= {academicyears: generateApiReducer(ACTION_TYPES) };