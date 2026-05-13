import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Incident = {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Investigating' | 'Contained' | 'Resolved' | 'Closed';
  assignee: string;
  time: string;
};

const initialIncidents: Incident[] = [
  { id: 'INC-2023-001', title: 'Ransomware Behavior on DC-01', severity: 'Critical', status: 'Investigating', assignee: 'Alice J.', time: '2h ago' },
  { id: 'INC-2023-002', title: 'Multiple Failed Logins Admin', severity: 'High', status: 'New', assignee: 'Unassigned', time: '5m ago' },
  { id: 'INC-2023-003', title: 'Data Exfiltration via DNS', severity: 'Critical', status: 'Contained', assignee: 'Bob S.', time: '1d ago' },
  { id: 'INC-2023-004', title: 'Suspicious PowerShell Execution', severity: 'Medium', status: 'Resolved', assignee: 'Charlie M.', time: '2d ago' },
];

const severityColors = {
  Critical: 'bg-destructive text-destructive-foreground',
  High: 'bg-orange-500 text-white',
  Medium: 'bg-yellow-500 text-white',
  Low: 'bg-blue-500 text-white',
};

const columns: Incident['status'][] = ['New', 'Investigating', 'Contained', 'Resolved', 'Closed'];

export const Incidents = () => {
  const [incidents] = useState(initialIncidents);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Incident Management</h2>
          <p className="text-muted-foreground mt-1">Triage, investigate, and resolve security incidents.</p>
        </div>
        <Button>Create Incident</Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column} className="min-w-[300px] w-[300px] flex flex-col bg-muted/30 rounded-xl border border-border/50">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/50 rounded-t-xl">
              <h3 className="font-semibold">{column}</h3>
              <Badge variant="secondary" className="rounded-full">
                {incidents.filter(i => i.status === column).length}
              </Badge>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {incidents.filter(i => i.status === column).map(incident => (
                <Card key={incident.id} className="cursor-pointer hover:border-primary/50 transition-colors bg-card/80 backdrop-blur shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{incident.id}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-sm font-semibold leading-tight">{incident.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex gap-2 items-center">
                        <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${severityColors[incident.severity]}`}>
                          {incident.severity}
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-xs text-muted-foreground">
                        <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {incident.time}</span>
                        <span className="mt-1 font-medium text-foreground">{incident.assignee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
