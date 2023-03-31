import React, { useReducer } from "react";

const PatientInfo_ACTION = {
  CREATE: 1,
  RESET: 2,
};
Object.freeze(PatientInfo_ACTION);

function patientInfoReducer(patientInfo, action) {
  switch (action.type) {
    case PatientInfo_ACTION.CREATE:
      return action.patientInfo;
    case PatientInfo_ACTION.RESET:
      return patientInfo.concat(action.patientInfo);
    default:
      return patientInfo;
  }
}

const Disease_ACTION = {
  INSERT: 1,
  REMOVE: 2,
  APPEND: 3,
  RESET: 4,
};
Object.freeze(Disease_ACTION);

function diseaseReducer(diseases, action) {
  switch (action.type) {
    case Disease_ACTION.INSERT:
      return diseases.concat(action.disease);
    case Disease_ACTION.REMOVE:
      return diseases.filter((disease) => disease.id !== action.id);
    case Disease_ACTION.APPEND:
      return diseases.concat(action.diseases);
    case Disease_ACTION.RESET:
      return [];
    default:
      return diseases;
  }
}

export default function PatientInfo() {
  const [patientInfo, dispatch] = useReducer(patientInfoReducer, {});

  const onCreate = (patientInfo) => {
    dispatch({ type: PatientInfo_ACTION.CREATE, patientInfo: patientInfo });
  };

  const [diseases, diseasesdispatch] = useReducer(diseaseReducer, []);

  const onInsert = (disease) => {
    diseasesdispatch({ type: Disease_ACTION.INSERT, disease: disease });
  };

  const onDelete = (id) => {
    diseasesdispatch({ type: Disease_ACTION.REMOVE, id });
  };

  const onAppend = (diseaseList) => {
    diseasesdispatch({ type: Disease_ACTION.APPEND, diseases: diseaseList });
  };

  const onReset = () => {
    diseasesdispatch({ type: Disease_ACTION.RESET });
  };

  return [
    diseases,
    onInsert,
    onDelete,
    onAppend,
    onReset,
    patientInfo,
    onCreate,
  ];
}
