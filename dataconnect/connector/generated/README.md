# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*MeetingsByConsultantId*](#meetingsbyconsultantid)
  - [*AllConsultantProfilePicturesAndIds*](#allconsultantprofilepicturesandids)
  - [*GetMeeting*](#getmeeting)
  - [*GetUser*](#getuser)
  - [*MeetingsForCurrentUser*](#meetingsforcurrentuser)
- [**Mutations**](#mutations)
  - [*UpdateMeetingStatus*](#updatemeetingstatus)
  - [*UpdateMeetingCalendlyScheduleUrl*](#updatemeetingcalendlyscheduleurl)
  - [*UpdateUserProfilePicture*](#updateuserprofilepicture)
  - [*InsertUser*](#insertuser)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@tobyscoaching/data-connect-sdk` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@tobyscoaching/data-connect-sdk';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@tobyscoaching/data-connect-sdk';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## MeetingsByConsultantId
You can execute the `MeetingsByConsultantId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
meetingsByConsultantId(vars: MeetingsByConsultantIdVariables, options?: ExecuteQueryOptions): QueryPromise<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;

interface MeetingsByConsultantIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MeetingsByConsultantIdVariables): QueryRef<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;
}
export const meetingsByConsultantIdRef: MeetingsByConsultantIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
meetingsByConsultantId(dc: DataConnect, vars: MeetingsByConsultantIdVariables, options?: ExecuteQueryOptions): QueryPromise<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;

interface MeetingsByConsultantIdRef {
  ...
  (dc: DataConnect, vars: MeetingsByConsultantIdVariables): QueryRef<MeetingsByConsultantIdData, MeetingsByConsultantIdVariables>;
}
export const meetingsByConsultantIdRef: MeetingsByConsultantIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the meetingsByConsultantIdRef:
```typescript
const name = meetingsByConsultantIdRef.operationName;
console.log(name);
```

### Variables
The `MeetingsByConsultantId` query requires an argument of type `MeetingsByConsultantIdVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MeetingsByConsultantIdVariables {
  consultantId: string;
}
```
### Return Type
Recall that executing the `MeetingsByConsultantId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MeetingsByConsultantIdData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MeetingsByConsultantIdData {
  meetings: ({
    id: UUIDString;
    member: {
      id: string;
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
```
### Using `MeetingsByConsultantId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, meetingsByConsultantId, MeetingsByConsultantIdVariables } from '@tobyscoaching/data-connect-sdk';

// The `MeetingsByConsultantId` query requires an argument of type `MeetingsByConsultantIdVariables`:
const meetingsByConsultantIdVars: MeetingsByConsultantIdVariables = {
  consultantId: ..., 
};

// Call the `meetingsByConsultantId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await meetingsByConsultantId(meetingsByConsultantIdVars);
// Variables can be defined inline as well.
const { data } = await meetingsByConsultantId({ consultantId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await meetingsByConsultantId(dataConnect, meetingsByConsultantIdVars);

console.log(data.meetings);

// Or, you can use the `Promise` API.
meetingsByConsultantId(meetingsByConsultantIdVars).then((response) => {
  const data = response.data;
  console.log(data.meetings);
});
```

### Using `MeetingsByConsultantId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, meetingsByConsultantIdRef, MeetingsByConsultantIdVariables } from '@tobyscoaching/data-connect-sdk';

// The `MeetingsByConsultantId` query requires an argument of type `MeetingsByConsultantIdVariables`:
const meetingsByConsultantIdVars: MeetingsByConsultantIdVariables = {
  consultantId: ..., 
};

// Call the `meetingsByConsultantIdRef()` function to get a reference to the query.
const ref = meetingsByConsultantIdRef(meetingsByConsultantIdVars);
// Variables can be defined inline as well.
const ref = meetingsByConsultantIdRef({ consultantId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = meetingsByConsultantIdRef(dataConnect, meetingsByConsultantIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.meetings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.meetings);
});
```

## AllConsultantProfilePicturesAndIds
You can execute the `AllConsultantProfilePicturesAndIds` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
allConsultantProfilePicturesAndIds(options?: ExecuteQueryOptions): QueryPromise<AllConsultantProfilePicturesAndIdsData, undefined>;

interface AllConsultantProfilePicturesAndIdsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllConsultantProfilePicturesAndIdsData, undefined>;
}
export const allConsultantProfilePicturesAndIdsRef: AllConsultantProfilePicturesAndIdsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
allConsultantProfilePicturesAndIds(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AllConsultantProfilePicturesAndIdsData, undefined>;

interface AllConsultantProfilePicturesAndIdsRef {
  ...
  (dc: DataConnect): QueryRef<AllConsultantProfilePicturesAndIdsData, undefined>;
}
export const allConsultantProfilePicturesAndIdsRef: AllConsultantProfilePicturesAndIdsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the allConsultantProfilePicturesAndIdsRef:
```typescript
const name = allConsultantProfilePicturesAndIdsRef.operationName;
console.log(name);
```

### Variables
The `AllConsultantProfilePicturesAndIds` query has no variables.
### Return Type
Recall that executing the `AllConsultantProfilePicturesAndIds` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AllConsultantProfilePicturesAndIdsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AllConsultantProfilePicturesAndIdsData {
  users: ({
    id: string;
    photoUrl?: string | null;
  } & User_Key)[];
}
```
### Using `AllConsultantProfilePicturesAndIds`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, allConsultantProfilePicturesAndIds } from '@tobyscoaching/data-connect-sdk';


// Call the `allConsultantProfilePicturesAndIds()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await allConsultantProfilePicturesAndIds();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await allConsultantProfilePicturesAndIds(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
allConsultantProfilePicturesAndIds().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `AllConsultantProfilePicturesAndIds`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, allConsultantProfilePicturesAndIdsRef } from '@tobyscoaching/data-connect-sdk';


// Call the `allConsultantProfilePicturesAndIdsRef()` function to get a reference to the query.
const ref = allConsultantProfilePicturesAndIdsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = allConsultantProfilePicturesAndIdsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetMeeting
You can execute the `GetMeeting` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getMeeting(vars: GetMeetingVariables, options?: ExecuteQueryOptions): QueryPromise<GetMeetingData, GetMeetingVariables>;

interface GetMeetingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMeetingVariables): QueryRef<GetMeetingData, GetMeetingVariables>;
}
export const getMeetingRef: GetMeetingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMeeting(dc: DataConnect, vars: GetMeetingVariables, options?: ExecuteQueryOptions): QueryPromise<GetMeetingData, GetMeetingVariables>;

interface GetMeetingRef {
  ...
  (dc: DataConnect, vars: GetMeetingVariables): QueryRef<GetMeetingData, GetMeetingVariables>;
}
export const getMeetingRef: GetMeetingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMeetingRef:
```typescript
const name = getMeetingRef.operationName;
console.log(name);
```

### Variables
The `GetMeeting` query requires an argument of type `GetMeetingVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMeetingVariables {
  meetingId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMeeting` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMeetingData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMeetingData {
  meeting?: {
    id: UUIDString;
    member: {
      id: string;
    } & User_Key;
    consultant: {
      id: string;
    } & User_Key;
  } & Meeting_Key;
}
```
### Using `GetMeeting`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMeeting, GetMeetingVariables } from '@tobyscoaching/data-connect-sdk';

// The `GetMeeting` query requires an argument of type `GetMeetingVariables`:
const getMeetingVars: GetMeetingVariables = {
  meetingId: ..., 
};

// Call the `getMeeting()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMeeting(getMeetingVars);
// Variables can be defined inline as well.
const { data } = await getMeeting({ meetingId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMeeting(dataConnect, getMeetingVars);

console.log(data.meeting);

// Or, you can use the `Promise` API.
getMeeting(getMeetingVars).then((response) => {
  const data = response.data;
  console.log(data.meeting);
});
```

### Using `GetMeeting`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMeetingRef, GetMeetingVariables } from '@tobyscoaching/data-connect-sdk';

// The `GetMeeting` query requires an argument of type `GetMeetingVariables`:
const getMeetingVars: GetMeetingVariables = {
  meetingId: ..., 
};

// Call the `getMeetingRef()` function to get a reference to the query.
const ref = getMeetingRef(getMeetingVars);
// Variables can be defined inline as well.
const ref = getMeetingRef({ meetingId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMeetingRef(dataConnect, getMeetingVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.meeting);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.meeting);
});
```

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@tobyscoaching/data-connect-sdk';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.// This query does not return any data, but you can still wait for it to complete.
await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
await getUser(dataConnect);

console.log('Finished executing GetUser!');
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@tobyscoaching/data-connect-sdk';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.// This query does not return any data, but you can still wait for it to complete.
await executeQuery(ref);
console.log('Finished executing GetUser!');
```

## MeetingsForCurrentUser
You can execute the `MeetingsForCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
meetingsForCurrentUser(options?: ExecuteQueryOptions): QueryPromise<MeetingsForCurrentUserData, undefined>;

interface MeetingsForCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MeetingsForCurrentUserData, undefined>;
}
export const meetingsForCurrentUserRef: MeetingsForCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
meetingsForCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MeetingsForCurrentUserData, undefined>;

interface MeetingsForCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<MeetingsForCurrentUserData, undefined>;
}
export const meetingsForCurrentUserRef: MeetingsForCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the meetingsForCurrentUserRef:
```typescript
const name = meetingsForCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `MeetingsForCurrentUser` query has no variables.
### Return Type
Recall that executing the `MeetingsForCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MeetingsForCurrentUserData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MeetingsForCurrentUserData {
  meetings: ({
    id: UUIDString;
    consultant: {
      id: string;
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
```
### Using `MeetingsForCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, meetingsForCurrentUser } from '@tobyscoaching/data-connect-sdk';


// Call the `meetingsForCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await meetingsForCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await meetingsForCurrentUser(dataConnect);

console.log(data.meetings);

// Or, you can use the `Promise` API.
meetingsForCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.meetings);
});
```

### Using `MeetingsForCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, meetingsForCurrentUserRef } from '@tobyscoaching/data-connect-sdk';


// Call the `meetingsForCurrentUserRef()` function to get a reference to the query.
const ref = meetingsForCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = meetingsForCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.meetings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.meetings);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpdateMeetingStatus
You can execute the `UpdateMeetingStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateMeetingStatus(vars: UpdateMeetingStatusVariables): MutationPromise<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;

interface UpdateMeetingStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMeetingStatusVariables): MutationRef<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;
}
export const updateMeetingStatusRef: UpdateMeetingStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMeetingStatus(dc: DataConnect, vars: UpdateMeetingStatusVariables): MutationPromise<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;

interface UpdateMeetingStatusRef {
  ...
  (dc: DataConnect, vars: UpdateMeetingStatusVariables): MutationRef<UpdateMeetingStatusData, UpdateMeetingStatusVariables>;
}
export const updateMeetingStatusRef: UpdateMeetingStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMeetingStatusRef:
```typescript
const name = updateMeetingStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateMeetingStatus` mutation requires an argument of type `UpdateMeetingStatusVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMeetingStatusVariables {
  meetingId: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateMeetingStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMeetingStatusData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMeetingStatusData {
  query?: {
  };
  meeting_update?: Meeting_Key | null;
}
```
### Using `UpdateMeetingStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMeetingStatus, UpdateMeetingStatusVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateMeetingStatus` mutation requires an argument of type `UpdateMeetingStatusVariables`:
const updateMeetingStatusVars: UpdateMeetingStatusVariables = {
  meetingId: ..., 
  status: ..., 
};

// Call the `updateMeetingStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMeetingStatus(updateMeetingStatusVars);
// Variables can be defined inline as well.
const { data } = await updateMeetingStatus({ meetingId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMeetingStatus(dataConnect, updateMeetingStatusVars);

console.log(data.query);
console.log(data.meeting_update);

// Or, you can use the `Promise` API.
updateMeetingStatus(updateMeetingStatusVars).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.meeting_update);
});
```

### Using `UpdateMeetingStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMeetingStatusRef, UpdateMeetingStatusVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateMeetingStatus` mutation requires an argument of type `UpdateMeetingStatusVariables`:
const updateMeetingStatusVars: UpdateMeetingStatusVariables = {
  meetingId: ..., 
  status: ..., 
};

// Call the `updateMeetingStatusRef()` function to get a reference to the mutation.
const ref = updateMeetingStatusRef(updateMeetingStatusVars);
// Variables can be defined inline as well.
const ref = updateMeetingStatusRef({ meetingId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMeetingStatusRef(dataConnect, updateMeetingStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.query);
console.log(data.meeting_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.query);
  console.log(data.meeting_update);
});
```

## UpdateMeetingCalendlyScheduleUrl
You can execute the `UpdateMeetingCalendlyScheduleUrl` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateMeetingCalendlyScheduleUrl(vars: UpdateMeetingCalendlyScheduleUrlVariables): MutationPromise<UpdateMeetingCalendlyScheduleUrlData, UpdateMeetingCalendlyScheduleUrlVariables>;

interface UpdateMeetingCalendlyScheduleUrlRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMeetingCalendlyScheduleUrlVariables): MutationRef<UpdateMeetingCalendlyScheduleUrlData, UpdateMeetingCalendlyScheduleUrlVariables>;
}
export const updateMeetingCalendlyScheduleUrlRef: UpdateMeetingCalendlyScheduleUrlRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMeetingCalendlyScheduleUrl(dc: DataConnect, vars: UpdateMeetingCalendlyScheduleUrlVariables): MutationPromise<UpdateMeetingCalendlyScheduleUrlData, UpdateMeetingCalendlyScheduleUrlVariables>;

interface UpdateMeetingCalendlyScheduleUrlRef {
  ...
  (dc: DataConnect, vars: UpdateMeetingCalendlyScheduleUrlVariables): MutationRef<UpdateMeetingCalendlyScheduleUrlData, UpdateMeetingCalendlyScheduleUrlVariables>;
}
export const updateMeetingCalendlyScheduleUrlRef: UpdateMeetingCalendlyScheduleUrlRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMeetingCalendlyScheduleUrlRef:
```typescript
const name = updateMeetingCalendlyScheduleUrlRef.operationName;
console.log(name);
```

### Variables
The `UpdateMeetingCalendlyScheduleUrl` mutation requires an argument of type `UpdateMeetingCalendlyScheduleUrlVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMeetingCalendlyScheduleUrlVariables {
  id: UUIDString;
  calendlyScheduleUrl: string;
}
```
### Return Type
Recall that executing the `UpdateMeetingCalendlyScheduleUrl` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMeetingCalendlyScheduleUrlData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMeetingCalendlyScheduleUrlData {
  meeting_update?: Meeting_Key | null;
}
```
### Using `UpdateMeetingCalendlyScheduleUrl`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMeetingCalendlyScheduleUrl, UpdateMeetingCalendlyScheduleUrlVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateMeetingCalendlyScheduleUrl` mutation requires an argument of type `UpdateMeetingCalendlyScheduleUrlVariables`:
const updateMeetingCalendlyScheduleUrlVars: UpdateMeetingCalendlyScheduleUrlVariables = {
  id: ..., 
  calendlyScheduleUrl: ..., 
};

// Call the `updateMeetingCalendlyScheduleUrl()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMeetingCalendlyScheduleUrl(updateMeetingCalendlyScheduleUrlVars);
// Variables can be defined inline as well.
const { data } = await updateMeetingCalendlyScheduleUrl({ id: ..., calendlyScheduleUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMeetingCalendlyScheduleUrl(dataConnect, updateMeetingCalendlyScheduleUrlVars);

console.log(data.meeting_update);

// Or, you can use the `Promise` API.
updateMeetingCalendlyScheduleUrl(updateMeetingCalendlyScheduleUrlVars).then((response) => {
  const data = response.data;
  console.log(data.meeting_update);
});
```

### Using `UpdateMeetingCalendlyScheduleUrl`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMeetingCalendlyScheduleUrlRef, UpdateMeetingCalendlyScheduleUrlVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateMeetingCalendlyScheduleUrl` mutation requires an argument of type `UpdateMeetingCalendlyScheduleUrlVariables`:
const updateMeetingCalendlyScheduleUrlVars: UpdateMeetingCalendlyScheduleUrlVariables = {
  id: ..., 
  calendlyScheduleUrl: ..., 
};

// Call the `updateMeetingCalendlyScheduleUrlRef()` function to get a reference to the mutation.
const ref = updateMeetingCalendlyScheduleUrlRef(updateMeetingCalendlyScheduleUrlVars);
// Variables can be defined inline as well.
const ref = updateMeetingCalendlyScheduleUrlRef({ id: ..., calendlyScheduleUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMeetingCalendlyScheduleUrlRef(dataConnect, updateMeetingCalendlyScheduleUrlVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.meeting_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.meeting_update);
});
```

## UpdateUserProfilePicture
You can execute the `UpdateUserProfilePicture` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateUserProfilePicture(vars: UpdateUserProfilePictureVariables): MutationPromise<UpdateUserProfilePictureData, UpdateUserProfilePictureVariables>;

interface UpdateUserProfilePictureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserProfilePictureVariables): MutationRef<UpdateUserProfilePictureData, UpdateUserProfilePictureVariables>;
}
export const updateUserProfilePictureRef: UpdateUserProfilePictureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserProfilePicture(dc: DataConnect, vars: UpdateUserProfilePictureVariables): MutationPromise<UpdateUserProfilePictureData, UpdateUserProfilePictureVariables>;

interface UpdateUserProfilePictureRef {
  ...
  (dc: DataConnect, vars: UpdateUserProfilePictureVariables): MutationRef<UpdateUserProfilePictureData, UpdateUserProfilePictureVariables>;
}
export const updateUserProfilePictureRef: UpdateUserProfilePictureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserProfilePictureRef:
```typescript
const name = updateUserProfilePictureRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserProfilePicture` mutation requires an argument of type `UpdateUserProfilePictureVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserProfilePictureVariables {
  photoUrl: string;
  id: string;
}
```
### Return Type
Recall that executing the `UpdateUserProfilePicture` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserProfilePictureData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserProfilePictureData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserProfilePicture`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserProfilePicture, UpdateUserProfilePictureVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateUserProfilePicture` mutation requires an argument of type `UpdateUserProfilePictureVariables`:
const updateUserProfilePictureVars: UpdateUserProfilePictureVariables = {
  photoUrl: ..., 
  id: ..., 
};

// Call the `updateUserProfilePicture()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserProfilePicture(updateUserProfilePictureVars);
// Variables can be defined inline as well.
const { data } = await updateUserProfilePicture({ photoUrl: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserProfilePicture(dataConnect, updateUserProfilePictureVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserProfilePicture(updateUserProfilePictureVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserProfilePicture`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserProfilePictureRef, UpdateUserProfilePictureVariables } from '@tobyscoaching/data-connect-sdk';

// The `UpdateUserProfilePicture` mutation requires an argument of type `UpdateUserProfilePictureVariables`:
const updateUserProfilePictureVars: UpdateUserProfilePictureVariables = {
  photoUrl: ..., 
  id: ..., 
};

// Call the `updateUserProfilePictureRef()` function to get a reference to the mutation.
const ref = updateUserProfilePictureRef(updateUserProfilePictureVars);
// Variables can be defined inline as well.
const ref = updateUserProfilePictureRef({ photoUrl: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserProfilePictureRef(dataConnect, updateUserProfilePictureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## InsertUser
You can execute the `InsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
insertUser(vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;

interface InsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
}
export const insertUserRef: InsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertUser(dc: DataConnect, vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;

interface InsertUserRef {
  ...
  (dc: DataConnect, vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
}
export const insertUserRef: InsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertUserRef:
```typescript
const name = insertUserRef.operationName;
console.log(name);
```

### Variables
The `InsertUser` mutation requires an argument of type `InsertUserVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `InsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertUserData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertUserData {
  user_insert: User_Key;
}
```
### Using `InsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertUser, InsertUserVariables } from '@tobyscoaching/data-connect-sdk';

// The `InsertUser` mutation requires an argument of type `InsertUserVariables`:
const insertUserVars: InsertUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `insertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertUser(insertUserVars);
// Variables can be defined inline as well.
const { data } = await insertUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertUser(dataConnect, insertUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
insertUser(insertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `InsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertUserRef, InsertUserVariables } from '@tobyscoaching/data-connect-sdk';

// The `InsertUser` mutation requires an argument of type `InsertUserVariables`:
const insertUserVars: InsertUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `insertUserRef()` function to get a reference to the mutation.
const ref = insertUserRef(insertUserVars);
// Variables can be defined inline as well.
const ref = insertUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertUserRef(dataConnect, insertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

