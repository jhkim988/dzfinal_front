import React, { useReducer } from 'react';

const Disease_ACTION = {
    INSERT: 1,
    REMOVE: 2,
    APPEND: 3,
    RESET: 4,
  };
  Object.freeze(Disease_ACTION);

function diseaseReducer(diseases, action){
    switch(action.type){
      case Disease_ACTION.INSERT:
          return diseases.concat(action.disease);
      case Disease_ACTION.REMOVE:
          return diseases.filter(disease => disease.id !== action.id);
      case Disease_ACTION.APPEND:
          return diseases.concat(action.diseases);
    case Disease_ACTION.RESET:
          return [];
      default:
        return diseases;
    }
  }

export default function DiseaseModel() {
    const [diseases, dispatch] = useReducer(diseaseReducer, []);

    const onInsert = disease => {
        dispatch({type : Disease_ACTION.INSERT, disease : disease});
    }

    const onDelete = id => {
        dispatch({type : Disease_ACTION.REMOVE, id});
    }

    const onAppend = diseaseList => {
        dispatch({type : Disease_ACTION.APPEND, diseases : diseaseList});
    }

    const onReset = () => {
        dispatch({type : Disease_ACTION.RESET});
    }

    return [diseases, onInsert, onDelete, onAppend, onReset];
};