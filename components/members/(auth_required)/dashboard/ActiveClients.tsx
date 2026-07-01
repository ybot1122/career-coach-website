import { MeetingsByConsultantIdData } from "@/dataconnect/connector/generated";
import { PurchaseInfo } from "@/app/members/(auth_required)/dashboard/sa_get_purchase";

import { MeetingStatus } from "@/types/MeetingStatus";
import ProfileCircle from "@/components/common/ProfileCircle";

interface ActiveClientsInterface {
  meetings: {
    [key: string]: MeetingsByConsultantIdData["meetings"];
  };
  purchaseInfo: {
    [key: string]: PurchaseInfo;
  };
}

type Client = MeetingsByConsultantIdData["meetings"][0]["member"] & {
  unscheduledMeetings: number;
};
export default function ActiveClients({
  meetings,
  purchaseInfo,
}: ActiveClientsInterface) {
  // Build the clients array from meetings and purchaseInfo
  // We'll collect unique clients by their id
  const clientMap: {
    [id: string]: Client;
  } = {};

  Object.values(meetings).forEach(
    (meetingArr: MeetingsByConsultantIdData["meetings"]) => {
      meetingArr.forEach((meeting) => {
        const clientId: string = meeting.member.id;
        const displayName: string = meeting.member.displayName;
        const email: string = meeting.member.email;

        const pi = purchaseInfo[meeting.stripeCheckoutSessionId];

        if (!clientMap[clientId]) {
          clientMap[clientId] = {
            id: clientId,
            displayName,
            email,
            unscheduledMeetings: 0,
            photoUrl: meeting.member.photoUrl ?? null,
          };
        }

        if (meeting.status === MeetingStatus.Unscheduled) {
          clientMap[clientId].unscheduledMeetings += 1;
        }
      });
    }
  );

  const clients: Client[] = Object.values(clientMap);

  return (
    <div className="mx-auto m-4 lg:m-16 bg-white rounded-lg shadow-lg p-8 border border-coaching-gray">
      <h2 className="text-coaching-blue mb-4">Active Clients</h2>
      {clients.length === 0 ? (
        <div className="text-center text-coaching-light-blue">
          No active clients found.
        </div>
      ) : (
        <ul className="flex flex-wrap gap-6">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex flex-col items-center bg-coaching-gray/10 rounded-lg p-4 min-w-[220px] max-w-xs flex-shrink-0"
            >
              <ProfileCircle
                displayName={client.displayName}
                photoUrl={client.photoUrl ?? null}
              />
              <span className="font-semibold text-coaching-blue mt-2">
                {client.displayName || "Unnamed Client"}
              </span>
              {client.email && (
                <span className="block text-coaching-light-blue">
                  {client.email}
                </span>
              )}
              <span className="block mt-1">
                Unscheduled meetings: {client.unscheduledMeetings}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
