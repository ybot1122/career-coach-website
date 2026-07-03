const {
  queryRef,
  executeQuery,
  getDataConnect,
  mutationRef,
  executeMutation,
  validateArgs,
} = require("firebase/data-connect");

const connectorConfig = {
  connector: "default",
  service: "tobyscoaching-ffcc5-service",
  location: "us-east4",
};
exports.connectorConfig = connectorConfig;

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

const meetingsByConsultantIdRef = (dcOrVars, vars) => {
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
exports.meetingsByConsultantIdRef = meetingsByConsultantIdRef;

exports.meetingsByConsultantId = function meetingsByConsultantId(
  dcOrVars,
  varsOrOptions,
  options,
) {
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
};

const allConsultantProfilePicturesAndIdsRef = (dc) => {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "AllConsultantProfilePicturesAndIds");
};
allConsultantProfilePicturesAndIdsRef.operationName =
  "AllConsultantProfilePicturesAndIds";
exports.allConsultantProfilePicturesAndIdsRef =
  allConsultantProfilePicturesAndIdsRef;

exports.allConsultantProfilePicturesAndIds =
  function allConsultantProfilePicturesAndIds(dcOrOptions, options) {
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
  };

const getMeetingRef = (dcOrVars, vars) => {
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
exports.getMeetingRef = getMeetingRef;

exports.getMeeting = function getMeeting(dcOrVars, varsOrOptions, options) {
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
};

const updateMeetingStatusRef = (dcOrVars, vars) => {
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
exports.updateMeetingStatusRef = updateMeetingStatusRef;

exports.updateMeetingStatus = function updateMeetingStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(updateMeetingStatusRef(dcInstance, inputVars));
};

const updateMeetingCalendlyScheduleUrlRef = (dcOrVars, vars) => {
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
exports.updateMeetingCalendlyScheduleUrlRef =
  updateMeetingCalendlyScheduleUrlRef;

exports.updateMeetingCalendlyScheduleUrl =
  function updateMeetingCalendlyScheduleUrl(dcOrVars, vars) {
    const { dc: dcInstance, vars: inputVars } = validateArgs(
      connectorConfig,
      dcOrVars,
      vars,
      true,
    );
    return executeMutation(
      updateMeetingCalendlyScheduleUrlRef(dcInstance, inputVars),
    );
  };

const updateUserProfilePictureRef = (dcOrVars, vars) => {
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
exports.updateUserProfilePictureRef = updateUserProfilePictureRef;

exports.updateUserProfilePicture = function updateUserProfilePicture(
  dcOrVars,
  vars,
) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(updateUserProfilePictureRef(dcInstance, inputVars));
};

const insertUserRef = (dcOrVars, vars) => {
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
exports.insertUserRef = insertUserRef;

exports.insertUser = function insertUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(
    connectorConfig,
    dcOrVars,
    vars,
    true,
  );
  return executeMutation(insertUserRef(dcInstance, inputVars));
};

const getUserRef = (dcOrVars, vars) => {
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
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, varsOrOptions, options) {
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
};

const meetingsForCurrentUserRef = (dc) => {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "MeetingsForCurrentUser");
};
meetingsForCurrentUserRef.operationName = "MeetingsForCurrentUser";
exports.meetingsForCurrentUserRef = meetingsForCurrentUserRef;

exports.meetingsForCurrentUser = function meetingsForCurrentUser(
  dcOrOptions,
  options,
) {
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
};
