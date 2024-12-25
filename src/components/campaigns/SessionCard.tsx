import { Session } from "@/types/session";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

interface SessionCardProps {
  session: Session;
  onConfirmAttendance: (sessionId: string) => void;
  onCancelAttendance: (sessionId: string) => void;
}

export const SessionCard = ({ session, onConfirmAttendance, onCancelAttendance }: SessionCardProps) => {
  const [confirmingSession, setConfirmingSession] = useState(false);
  const [cancelingSession, setCancelingSession] = useState(false);

  const hasConfirmedAttendance = session.player_session && session.player_session.length > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {!hasConfirmedAttendance ? (
            <>
              <Button
                onClick={() => setConfirmingSession(true)}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Confirm
              </Button>
              <Dialog open={confirmingSession} onOpenChange={setConfirmingSession}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Attendance</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to confirm your attendance for Session {session.session_number}?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConfirmingSession(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      onConfirmAttendance(session.id);
                      setConfirmingSession(false);
                    }}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button
                onClick={() => setCancelingSession(true)}
                variant="outline"
                className="bg-black text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Dialog open={cancelingSession} onOpenChange={setCancelingSession}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Attendance</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel your attendance for Session {session.session_number}?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCancelingSession(false)}>
                      No
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        onCancelAttendance(session.id);
                        setCancelingSession(false);
                      }}
                    >
                      Yes, Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          <div>
            <h3 className="font-medium">Session {session.session_number}</h3>
            <p className="text-sm text-gray-500">{session.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${session.price}</p>
          <p className="text-sm text-gray-500">
            {new Date(session.start_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};