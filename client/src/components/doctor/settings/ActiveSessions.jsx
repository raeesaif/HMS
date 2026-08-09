import { LogOut, MapPin, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ActiveSessions({ sessions, onSignOut, onSignOutAll }) {
  const hasOtherSessions = sessions.some((session) => !session.isCurrent);

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-sm font-semibold">Active Sessions</CardTitle>
          <p className="mt-0.5 text-xs text-slate-500">Review and manage where you&apos;re signed in</p>
        </div>
        <Button variant="outline" size="sm" disabled={!hasOtherSessions} onClick={onSignOutAll}>
          <LogOut /> Sign Out All Other Sessions
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 pt-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                <Monitor className="size-4" />
              </div>
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-900">
                  {session.device}
                  {session.isCurrent && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-600">
                      Current Session
                    </Badge>
                  )}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="size-3" />
                  {session.location} · {session.ip} · {session.lastActive}
                </p>
              </div>
            </div>
            {!session.isCurrent && (
              <Button variant="outline" size="sm" onClick={() => onSignOut(session)}>
                Sign Out
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
