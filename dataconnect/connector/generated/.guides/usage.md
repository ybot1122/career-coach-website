# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { meetingsByConsultantId, allConsultantProfilePicturesAndIds, getMeeting, updateMeetingStatus, updateMeetingCalendlyScheduleUrl, updateUserProfilePicture, insertUser, getUser, meetingsForCurrentUser } from '@tobyscoaching/data-connect-sdk';


// Operation MeetingsByConsultantId:  For variables, look at type MeetingsByConsultantIdVars in ../index.d.ts
const { data } = await MeetingsByConsultantId(dataConnect, meetingsByConsultantIdVars);

// Operation AllConsultantProfilePicturesAndIds: 
const { data } = await AllConsultantProfilePicturesAndIds(dataConnect);

// Operation GetMeeting:  For variables, look at type GetMeetingVars in ../index.d.ts
const { data } = await GetMeeting(dataConnect, getMeetingVars);

// Operation UpdateMeetingStatus:  For variables, look at type UpdateMeetingStatusVars in ../index.d.ts
const { data } = await UpdateMeetingStatus(dataConnect, updateMeetingStatusVars);

// Operation UpdateMeetingCalendlyScheduleUrl:  For variables, look at type UpdateMeetingCalendlyScheduleUrlVars in ../index.d.ts
const { data } = await UpdateMeetingCalendlyScheduleUrl(dataConnect, updateMeetingCalendlyScheduleUrlVars);

// Operation UpdateUserProfilePicture:  For variables, look at type UpdateUserProfilePictureVars in ../index.d.ts
const { data } = await UpdateUserProfilePicture(dataConnect, updateUserProfilePictureVars);

// Operation InsertUser:  For variables, look at type InsertUserVars in ../index.d.ts
const { data } = await InsertUser(dataConnect, insertUserVars);

// Operation GetUser:  For variables, look at type GetUserVars in ../index.d.ts
const { data } = await GetUser(dataConnect, getUserVars);

// Operation MeetingsForCurrentUser: 
const { data } = await MeetingsForCurrentUser(dataConnect);


```