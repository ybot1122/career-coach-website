import {
  ConnectorConfig,
  DataConnect,
  QueryRef,
  QueryPromise,
  MutationRef,
  MutationPromise,
} from "firebase/data-connect";

export type ExecuteQueryOptions = {
  fetchPolicy?: string;
  [key: string]: unknown;
};

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export interface AllConsultantProfilePicturesAndIdsData {
  users: ({
    id: UUIDString;
    photoUrl?: string | null;
  } & User_Key)[];
}

export interface GetMeetingData {
  meeting?: {
    id: UUIDString;
    member: {
      id: UUIDString;
    } & User_Key;
    consultant: {
      id: UUIDString;
    } & User_Key;
  } & Meeting_Key;
}

export interface GetMeetingVariables {
  meetingId: UUIDString;
}

export interface GetUserData {
  user?: {
    id: UUIDString;
    displayName: string;
    email: string;
    role: string;
    createdAt: TimestampString;
    photoUrl?: string | null;
    bio?: string | null;
    updatedAt?: TimestampString | null;
  } | null;
}

export interface GetUserVariables {
  id: UUIDString;
}

export interface InsertUserData {
  user_insert: User_Key;
}

export interface InsertUserVariables {
  displayName: string;
  email: string;
  createdAt: TimestampString;
}

export interface Meeting_Key {
  id: UUIDString;
  __typename?: "Meeting_Key";
}

export interface MeetingsByConsultantIdData {
  meetings: ({
    id: UUIDString;
    member: {
      id: UUIDString;
      displayName: string;
      email: string;
      photoUrl?: string | null;
    } & User_Key;
    calendlyEventUri?: string | null;
    endTime?: TimestampString | null;
    startTime?: TimestampString | null;
    status: string;
    stripeCheckoutSessionId: string;
    stripeProductId: string;
  } & Meeting_Key)[];
}

export interface MeetingsByConsultantIdVariables {
  consultantId: UUIDString;
}

export interface MeetingsForCurrentUserData {
  meetings: ({
    id: UUIDString;
    consultant: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    endTime?: TimestampString | null;
    startTime?: TimestampString | null;
    status: string;
    stripeCheckoutSessionId: string;
    stripeProductId: string;
    calendlyScheduleUrl?: string | null;
    calendlyEventUri?: string | null;
  } & Meeting_Key)[];
}

export interface UpdateMeetingCalendlyScheduleUrlData {
  meeting_update?: Meeting_Key | null;
}

export interface UpdateMeetingCalendlyScheduleUrlVariables {
  id: UUIDString;
  calendlyScheduleUrl: string;
}

export interface UpdateMeetingStatusData {
  query?: {};
  meeting_update?: Meeting_Key | null;
}

export interface UpdateMeetingStatusVariables {
  meetingId: UUIDString;
  status: string;
}

export interface UpdateUserProfilePictureData {
  user_update?: User_Key | null;
}

export interface UpdateUserProfilePictureVariables {
  photoUrl: string;
  id: UUIDString;
}

export interface User_Key {
  id: UUIDString;
  __typename?: "User_Key";
}

interface MeetingsByConsultantIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (
    vars: MeetingsByConsultantIdVariables,
  ): QueryRef<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: MeetingsByConsultantIdVariables,
  ): QueryRef<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;
  operationName: string;
}
export const meetingsByConsultantIdRef: MeetingsByConsultantIdRef;

export function meetingsByConsultantId(
  vars: MeetingsByConsultantIdVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;
export function meetingsByConsultantId(
  dc: DataConnect,
  vars: MeetingsByConsultantIdVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;

interface AllConsultantProfilePicturesAndIdsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllConsultantProfilePicturesAndIdsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
  ): QueryRef<AllConsultantProfilePicturesAndIdsData, undefined>;
  operationName: string;
}
export const allConsultantProfilePicturesAndIdsRef: AllConsultantProfilePicturesAndIdsRef;

export function allConsultantProfilePicturesAndIds(
  options?: ExecuteQueryOptions,
): QueryPromise<AllConsultantProfilePicturesAndIdsData, undefined>;
export function allConsultantProfilePicturesAndIds(
  dc: DataConnect,
  options?: ExecuteQueryOptions,
): QueryPromise<AllConsultantProfilePicturesAndIdsData, undefined>;

interface GetMeetingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMeetingVariables): QueryRef<GetMeetingData, GetMeetingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: GetMeetingVariables,
  ): QueryRef<GetMeetingData, GetMeetingVariables>;
  operationName: string;
}
export const getMeetingRef: GetMeetingRef;

export function getMeeting(
  vars: GetMeetingVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMeetingData, GetMeetingVariables>;
export function getMeeting(
  dc: DataConnect,
  vars: GetMeetingVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetMeetingData, GetMeetingVariables>;

interface UpdateMeetingStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (
    vars: UpdateMeetingStatusVariables,
  ): MutationRef<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: UpdateMeetingStatusVariables,
  ): MutationRef<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;
  operationName: string;
}
export const updateMeetingStatusRef: UpdateMeetingStatusRef;

export function updateMeetingStatus(
  vars: UpdateMeetingStatusVariables,
): MutationPromise<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;
export function updateMeetingStatus(
  dc: DataConnect,
  vars: UpdateMeetingStatusVariables,
): MutationPromise<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;

interface UpdateMeetingCalendlyScheduleUrlRef {
  /* Allow users to create refs without passing in DataConnect */
  (
    vars: UpdateMeetingCalendlyScheduleUrlVariables,
  ): MutationRef<
    UpdateMeetingCalendlyScheduleUrlData,
    UpdateMeetingCalendlyScheduleUrlVariables
  >;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: UpdateMeetingCalendlyScheduleUrlVariables,
  ): MutationRef<
    UpdateMeetingCalendlyScheduleUrlData,
    UpdateMeetingCalendlyScheduleUrlVariables
  >;
  operationName: string;
}
export const updateMeetingCalendlyScheduleUrlRef: UpdateMeetingCalendlyScheduleUrlRef;

export function updateMeetingCalendlyScheduleUrl(
  vars: UpdateMeetingCalendlyScheduleUrlVariables,
): MutationPromise<
  UpdateMeetingCalendlyScheduleUrlData,
  UpdateMeetingCalendlyScheduleUrlVariables
>;
export function updateMeetingCalendlyScheduleUrl(
  dc: DataConnect,
  vars: UpdateMeetingCalendlyScheduleUrlVariables,
): MutationPromise<
  UpdateMeetingCalendlyScheduleUrlData,
  UpdateMeetingCalendlyScheduleUrlVariables
>;

interface UpdateUserProfilePictureRef {
  /* Allow users to create refs without passing in DataConnect */
  (
    vars: UpdateUserProfilePictureVariables,
  ): MutationRef<
    UpdateUserProfilePictureData,
    UpdateUserProfilePictureVariables
  >;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: UpdateUserProfilePictureVariables,
  ): MutationRef<
    UpdateUserProfilePictureData,
    UpdateUserProfilePictureVariables
  >;
  operationName: string;
}
export const updateUserProfilePictureRef: UpdateUserProfilePictureRef;

export function updateUserProfilePicture(
  vars: UpdateUserProfilePictureVariables,
): MutationPromise<
  UpdateUserProfilePictureData,
  UpdateUserProfilePictureVariables
>;
export function updateUserProfilePicture(
  dc: DataConnect,
  vars: UpdateUserProfilePictureVariables,
): MutationPromise<
  UpdateUserProfilePictureData,
  UpdateUserProfilePictureVariables
>;

interface InsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: InsertUserVariables,
  ): MutationRef<InsertUserData, InsertUserVariables>;
  operationName: string;
}
export const insertUserRef: InsertUserRef;

export function insertUser(
  vars: InsertUserVariables,
): MutationPromise<InsertUserData, InsertUserVariables>;
export function insertUser(
  dc: DataConnect,
  vars: InsertUserVariables,
): MutationPromise<InsertUserData, InsertUserVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (
    dc: DataConnect,
    vars: GetUserVariables,
  ): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(
  vars: GetUserVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(
  dc: DataConnect,
  vars: GetUserVariables,
  options?: ExecuteQueryOptions,
): QueryPromise<GetUserData, GetUserVariables>;

interface MeetingsForCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MeetingsForCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MeetingsForCurrentUserData, undefined>;
  operationName: string;
}
export const meetingsForCurrentUserRef: MeetingsForCurrentUserRef;

export function meetingsForCurrentUser(
  options?: ExecuteQueryOptions,
): QueryPromise<MeetingsForCurrentUserData, undefined>;
export function meetingsForCurrentUser(
  dc: DataConnect,
  options?: ExecuteQueryOptions,
): QueryPromise<MeetingsForCurrentUserData, undefined>;
