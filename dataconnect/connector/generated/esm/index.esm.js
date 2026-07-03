import {
  queryRef,
  executeQuery,
  getDataConnect,
  mutationRef,
  executeMutation,
  validateArgs,
} from "firebase/data-connect";

export const connectorConfig = {
  connector: "default",
  service: "tobyscoaching-ffcc5-service",
  location: "us-east4",
};

function validateArgsWithOptions(
  connectorConfig,
  dcOrVars,
  varsOrOptions,
  options,
  validateVars,
  expectVars,
) {
  const isDataConnect = dcOrVars && "enableEmulator" in dcOrVars;
  if (expectVars) {
    if (isDataConnect) {
      const { dc: dcInstance, vars: inputVars } = validateArgs(
        connectorConfig,
        dcOrVars,
        varsOrOptions,
        validateVars,
      );
      return { dc: dcInstance, vars: inputVars, options };
    }
    const { dc: dcInstance, vars: inputVars } = validateArgs(
      connectorConfig,
      dcOrVars,
      undefined,
      false,
    );
    return { dc: dcInstance, vars: inputVars, options: varsOrOptions };
  }
  if (isDataConnect) {
    const { dc: dcInstance, vars: inputVars } = validateArgs(
      connectorConfig,
      dcOrVars,
      undefined,
      false,
    );
    return { dc: dcInstance, vars: inputVars, options: varsOrOptions };
  }
  return {
    dc: getDataConnect(connectorConfig),
    vars: undefined,
    options: dcOrVars,
  };
}

export const meetingsByConsultantIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "MeetingsByConsultantId", inputVars);
};
meetingsByConsultantIdRef.operationName = "MeetingsByConsultantId";

export function meetingsByConsultantId(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrVars,
    varsOrOptions,
    options,
    true,
    true,
  );
  return executeQuery(
    meetingsByConsultantIdRef(dcInstance, inputVars),
    inputOpts && { fetchPolicy: inputOpts.fetchPolicy },
  );
}

export const allConsultantProfilePicturesAndIdsRef = (dc) => {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "AllConsultantProfilePicturesAndIds");
};
allConsultantProfilePicturesAndIdsRef.operationName =
  "AllConsultantProfilePicturesAndIds";

export function allConsultantProfilePicturesAndIds(dcOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrOptions,
    options,
    undefined,
    false,
    false,
  );
  return executeQuery(
    allConsultantProfilePicturesAndIdsRef(dcInstance, inputVars),
    inputOpts && { fetchPolicy: inputOpts.fetchPolicy },
  );
}

export const getMeetingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "GetMeeting", inputVars);
};
getMeetingRef.operationName = "GetMeeting";

export function getMeeting(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrVars,
    varsOrOptions,
    options,
    true,
    true,
  );
  return executeQuery(
    getMeetingRef(dcInstance, inputVars),
    inputOpts && { fetchPolicy: inputOpts.fetchPolicy },
  );
}

export const updateMeetingStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "UpdateMeetingStatus", inputVars);
};
updateMeetingStatusRef.operationName = "UpdateMeetingStatus";

export function updateMeetingStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(updateMeetingStatusRef(dcInstance, inputVars));
}

export const updateMeetingCalendlyScheduleUrlRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "UpdateMeetingCalendlyScheduleUrl", inputVars);
};
updateMeetingCalendlyScheduleUrlRef.operationName =
  "UpdateMeetingCalendlyScheduleUrl";

export function updateMeetingCalendlyScheduleUrl(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(
    updateMeetingCalendlyScheduleUrlRef(dcInstance, inputVars),
  );
}

export const updateUserProfilePictureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "UpdateUserProfilePicture", inputVars);
};
updateUserProfilePictureRef.operationName = "UpdateUserProfilePicture";

export function updateUserProfilePicture(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(updateUserProfilePictureRef(dcInstance, inputVars));
}

export const insertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "InsertUser", inputVars);
};
insertUserRef.operationName = "InsertUser";

export function insertUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(insertUserRef(dcInstance, inputVars));
}

export const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "GetUser", inputVars);
};
getUserRef.operationName = "GetUser";

export function getUser(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrVars,
    varsOrOptions,
    options,
    true,
    true,
  );
  return executeQuery(
    getUserRef(dcInstance, inputVars),
    inputOpts && { fetchPolicy: inputOpts.fetchPolicy },
  );
}

export const meetingsForCurrentUserRef = (dc) => {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "MeetingsForCurrentUser");
};
meetingsForCurrentUserRef.operationName = "MeetingsForCurrentUser";

export function meetingsForCurrentUser(dcOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(
    connectorConfig,
    dcOrOptions,
    options,
    undefined,
    false,
    false,
  );
  return executeQuery(
    meetingsForCurrentUserRef(dcInstance, inputVars),
    inputOpts && { fetchPolicy: inputOpts.fetchPolicy },
  );
}
