import React, { useReducer } from 'react';

const PatientInfo_ACTION = {
    CREATE: 1,
    RESET: 2,
  };
  Object.freeze(PatientInfo_ACTION);

function patientInfoReducer(patientInfo, action){
    switch(action.type){
      case PatientInfo_ACTION.CREATE:
          return action.patientInfo;
      case PatientInfo_ACTION.RESET:
          return patientInfo.concat(action.patientInfo);
      default:
        return patientInfo;
    }
  }

export default function PatientInfo() {
    const [patientInfo, dispatch] = useReducer(patientInfoReducer, {});

    const onCreate = patientInfo => {
        dispatch({type : PatientInfo_ACTION.CREATE, patientInfo: patientInfo});
    }

    return [patientInfo, onCreate];
};