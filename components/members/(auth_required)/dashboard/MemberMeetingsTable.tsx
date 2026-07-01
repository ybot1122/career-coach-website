import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { MeetingsForCurrentUserData } from "@/dataconnect/connector/generated";
import { PurchaseInfo } from "@/app/members/(auth_required)/dashboard/sa_get_purchase";
import { formatDateTime } from "@/lib/formatDateTime";
import ScheduleMeetingButton from "./ScheduleMeetingButton";
import { useFirebase } from "@/context/FirebaseApp";
import { MeetingStatus } from "@/types/MeetingStatus";

interface MeetingsListProps {
  meetings: {
    [key: string]: MeetingsForCurrentUserData["meetings"];
  };
  purchaseInfo: {
    [key: string]: PurchaseInfo;
  };
  setMeetingInfo: (
    info:
      | {
          calendlyUrl: string;
          meetingId: string;
          stripeProductId: string;
        }
      | undefined
  ) => void;
  fetchMeetings: () => Promise<void>;
}

const columns: { key: string; label: string }[] = [
  /*
TODO: in the future put sortable columns here
  { key: "startTime", label: "Start Time" },
  { key: "endTime", label: "End Time" },
   */
  { key: "status", label: "Status" },
];

const MemberMeetingsTable: React.FC<MeetingsListProps> = ({
  meetings,
  purchaseInfo,
  setMeetingInfo,
  fetchMeetings,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [profilePics, setProfilePics] = useState<Record<string, string>>({});
  const { dataConnect } = useFirebase();

  useEffect(() => {
    const f = async () => {
      const { data } = await dataConnect.allConsultantProfilePicturesAndIds();
      const s: Record<string, string> = {};
      data.users.map((d) => {
        s[d.id] = d.photoUrl!;
      });

      setProfilePics(s);
    };

    f();
  }, []);

  // Helper to sort meetings for a session
  const sortMeetings = (rows: any[]) => {
    const sorted = [...rows];
    sorted.sort((a, b) => {
      const aVal = a[sortColumn] ?? "";
      const bVal = b[sortColumn] ?? "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <h2 className="text-coaching-blue mb-4">Your Meetings</h2>
      {Object.keys(meetings).length === 0 && (
        <div className="py-4 text-center">No meetings found.</div>
      )}
      {Object.entries(meetings).map(([checkoutSessionId, sessionMeetings]) => {
        const pi = purchaseInfo[checkoutSessionId];
        const sortedRows = sortMeetings(
          sessionMeetings.map((m) => ({
            id: m.id,
            productName: pi?.productName,
            purchaseDate: pi?.purchaseDate,
            consultantUid: pi?.consultantUid,
            stripeProductId: m.stripeProductId,
            checkoutSessionId,
            status: m.status,
            calendlyScheduleUrl: m.calendlyScheduleUrl,
          }))
        );
        return (
          <div key={checkoutSessionId} className="mb-8">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-coaching-light-blue/10 rounded-lg p-4 border border-coaching-light-blue shadow-sm">
              <div className="flex flex-col sm:flex-row w-full">
                <div className="flex-1 mb-2 sm:mb-0">
                  <div className="flex items-center mb-1">
                    <span className="text-coaching-blue font-semibold">
                      {pi?.productName || "-"}
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-coaching-black">
                      Purchased on {pi?.purchaseDate || "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center sm:items-start items-start sm:ml-8 mt-2 sm:mt-0">
                  <div className="flex items-center">
                    <img
                      src={profilePics[pi?.consultantUid]}
                      height={100}
                      width={100}
                      alt={pi?.productName}
                      className="rounded-full border border-coaching-blue shadow-sm"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-coaching-gray rounded-lg">
                <thead>
                  <tr className="bg-coaching-light-blue text-white">
                    {columns.map((col) => (
                      <th key={col.key} className="py-2 px-4 text-left">
                        <Button
                          variant="white"
                          onClick={() => handleSort(col.key)}
                          type="button"
                        >
                          {col.label}
                          {sortColumn === col.key
                            ? sortDirection === "asc"
                              ? " ▲"
                              : " ▼"
                            : null}
                        </Button>
                      </th>
                    ))}
                    <th className="py-2 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="py-4 text-center"
                      >
                        No meetings found for this purchase.
                      </td>
                    </tr>
                  )}
                  {sortedRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-coaching-dark-gray"
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="py-2 px-4 capitalize">
                          {col.key === "startTime" || col.key === "endTime"
                            ? formatDateTime(row[col.key])
                            : row[col.key]}{" "}
                        </td>
                      ))}
                      <td className="py-2 px-4">
                        {row.status === MeetingStatus.Scheduled ? (
                          <>
                            Check your email for your Calendly confirmation.
                            <br />
                            That email contains links to reschedule or cancel.
                          </>
                        ) : (
                          <ScheduleMeetingButton
                            stripeProductId={row.stripeProductId}
                            meetingId={row.id}
                            calendlyScheduleUrl={
                              row.calendlyScheduleUrl ?? null
                            }
                            setMeetingInfo={setMeetingInfo}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MemberMeetingsTable;
