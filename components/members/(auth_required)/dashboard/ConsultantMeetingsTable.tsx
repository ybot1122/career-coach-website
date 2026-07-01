import { useState } from "react";
import { MeetingsByConsultantIdData } from "@/dataconnect/connector/generated";
import { PurchaseInfo } from "@/app/members/(auth_required)/dashboard/sa_get_purchase";
import { formatDateTime } from "@/lib/formatDateTime";
import ProfileCircle from "@/components/common/ProfileCircle";

interface MeetingsTableProps {
  meetings: {
    [key: string]: MeetingsByConsultantIdData["meetings"];
  };
  purchaseInfo: {
    [key: string]: PurchaseInfo;
  };
  fetchMeetings: () => Promise<void>;
}

export default function ConsultantMeetingsTable({
  meetings,
  purchaseInfo,
  fetchMeetings,
}: MeetingsTableProps) {
  // Sorting state
  const [sortColumn, setSortColumn] = useState<string>("startTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Helper to flatten and sort meetings for the table
  const getSortedMeetings = () => {
    if (!meetings || !purchaseInfo) return [];

    // Flatten meetings and enrich with productName and clientName
    let allMeetings = Object.entries(meetings)
      .flatMap(([checkoutSessionId, sessionMeetings]) =>
        sessionMeetings.map((meeting: any) => ({
          ...meeting,
          productName: purchaseInfo[checkoutSessionId]?.productName,
          clientName: meeting.member.displayName,
          clientEmail: meeting.member.email,
          checkoutSessionId,
        }))
      )
      .filter((meeting) => meeting.status === "scheduled");

    // Sorting logic
    allMeetings.sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // For startTime/endTime, sort by date
      if (sortColumn === "startTime" || sortColumn === "endTime") {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return allMeetings;
  };

  // Handler for sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Table columns config
  const columns = [
    { key: "clientName", label: "Client" },
    { key: "productName", label: "Product" },
    { key: "actions", label: "Actions" },
  ];

  // TODO: use calendly URI to get the start time

  return (
    <div>
      <h2 className="text-coaching-blue mb-4">Scheduled Meetings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg">
          <thead>
            <tr className="bg-coaching-blue text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-2 px-4 text-left cursor-pointer select-none"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {sortColumn === col.key && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getSortedMeetings().length > 0 ? (
              getSortedMeetings().map((meeting, idx) => (
                <tr
                  key={meeting.id || idx}
                  className="border-b-2 border-coaching-light-blue"
                >
                  <td className="py-2 px-4 flex flex-col items-center justify-center">
                    <ProfileCircle
                      displayName={meeting.clientName}
                      photoUrl={meeting.member.photoUrl ?? null}
                    />
                    <span className="text-coaching-blue font-semibold">
                      {meeting.clientName}
                    </span>
                    <span>{meeting.clientEmail}</span>
                  </td>
                  <td className="py-2 px-4">{meeting.productName || "-"}</td>
                  <td className="py-2 px-4">
                    {meeting.calendlyEventUri && (
                      <>
                        {`Meeting was scheduled.`}
                        <br /> {`Check your Calendly to manage it.`}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center">
                  No scheduled meetings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
