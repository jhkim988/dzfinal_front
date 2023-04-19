import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import DrugTaking from "./Drug_Taking";
import MedicalInfo from "./MedicalInfo";
import MedicalRecordInquiry from "./MedicalRecordInquiry";
import Patient from "./Patient";
import Underlying from "./Underlying";
import Clinic from "./Clinic";
import DiseaseModel from "./model/DiseaseModel";
import WaitingQueueLayout from "./../waiting/WaitingQueueLayout";
import axiosClient from "./../login/AxiosClient";

const ClinicView = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [reception, setReception] = useState();
  const [patient, setPatient] = useState({});
  const [underlying, onInsert, onDelete, onAppend, onReset] = DiseaseModel();
  const [drug_taking, setDrug_taking] = useState([]);
  const [mri, setMri] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState({});
  const [mode, setMode] = useState(0);
  const [diagnosis, setDiagnosis] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [treatment, setTreatment] = useState(false);
  const [clinic_request, setClinic_request] = useState(false);
  const [searchMode, setSearchMode] = useState(1);
  const [pagination, setPagination] = useState({
    startPage: 1,
    endPage: 1,
    currentPage: 1,
    amount: 10,
    total: 0,
    prev: false,
    next: false,
  });

  useEffect(() => {
    reception &&
      axiosClient
        .get(`/api/clinic/${reception}`)
        .then((response) => {
          setPatient(response.data);
          onReset();
          onAppend(response.data.underlyingList);
          setDrug_taking(response.data.drug_takingList);
        })
        .catch((error) => {
          console.log(error);
        });
    setDiagnosis([]);
    setPrescription([]);
    setSymptom("");
    setTreatment(false);
    setClinic_request(false);
  }, [reception]);

  const clickMedicalRecordInquiry = useCallback(
    (type, formattedDates, keyword, patient_id) => {
      setSearchMode(1);
      setMedicalInfo({});

      if (!type) return alert("분류를 정해주세요");
      axiosClient
        .get(`/api/clinic/mri/${patient_id}/${pagination.currentPage}`)
        .then((response) => {
          setMri(response.data.mri);
          setPagination(response.data.pagination);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [pagination.currentPage]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} style={{ height: "90vh" }}>
        <WaitingQueueLayout
          initPanel="2"
          nextState="진료중"
          clickRowCallback={({ reception_id, patient_name, patient_id }) => {
            setReception(reception_id);
            clickMedicalRecordInquiry(
              "patient_name",
              { start: "2000-01-01", end: "2100-12-31" },
              patient_name,
              patient_id
            );
          }}
          shouldAutoCall={({ data: { state, doctor_id } }) =>
            state === "수납대기" && doctor_id === userInfo.employ_id
          }
          findNextAutoCall={({ state, doctor_id }) =>
            state === "진료대기" && doctor_id === userInfo.employ_id
          }
          shouldDisableCallButton={({ state, doctor_id }) =>
            state !== "진료대기" || doctor_id !== userInfo.employ_id
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", height: "40vh" }} elevation={3}>
              <MedicalRecordInquiry
                mri={mri}
                setMri={setMri}
                patient={patient}
                setMedicalInfo={setMedicalInfo}
                clickMedicalRecordInquiry={clickMedicalRecordInquiry}
                pagination={pagination}
                setPagination={setPagination}
                searchMode={searchMode}
                setSearchMode={setSearchMode}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", height: "40.5vh" }} elevation={3}>
              <MedicalInfo
                medicalInfo={medicalInfo}
                setMode={setMode}
                setDiagnosis={setDiagnosis}
                setPrescription={setPrescription}
                setSymptom={setSymptom}
                setTreatment={setTreatment}
                setClinic_request={setClinic_request}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", height: "40vh" }} elevation={3}>
              <Patient reception={reception} patient={patient} />
              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item xs={6}>
                  <Underlying props={underlying} patient={patient} />
                </Grid>
                <Grid item xs={6}>
                  <DrugTaking props={drug_taking} patient={patient} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", height: "40.5vh" }} elevation={3}>
              <Clinic
                setPatient={setPatient}
                setReception={setReception}
                reception={reception}
                onReset={onReset}
                setDrug_taking={setDrug_taking}
                mode={mode}
                setMode={setMode}
                medicalInfo={medicalInfo}
                diagnosis={diagnosis}
                prescription={prescription}
                setDiagnosis={setDiagnosis}
                setPrescription={setPrescription}
                symptom={symptom}
                setSymptom={setSymptom}
                setMedicalInfo={setMedicalInfo}
                treatment={treatment}
                setTreatment={setTreatment}
                clinic_request={clinic_request}
                setClinic_request={setClinic_request}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClinicView;
