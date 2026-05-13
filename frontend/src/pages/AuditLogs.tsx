import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialLogs = [
  { id: 'AL-9021', user: 'admin@soc.local', action: 'Modified Firewall Rule', resource: 'FW-Core-01', ip: '10.0.0.5', time: '2023-10-25 14:32:01', status: 'Success' },
  { id: 'AL-9022', user: 'bob.s@soc.local', action: 'Resolved Incident', resource: 'INC-2023-003', ip: '192.168.1.45', time: '2023-10-25 13:15:22', status: 'Success' },
  { id: 'AL-9023', user: 'unknown', action: 'Failed Login Attempt', resource: 'Auth Service', ip: '45.22.19.88', time: '2023-10-25 11:05:10', status: 'Failed' },
  { id: 'AL-9024', user: 'alice.j@soc.local', action: 'Exported Audit Logs', resource: 'Log System', ip: '192.168.1.22', time: '2023-10-25 09:44:55', status: 'Success' },
  { id: 'AL-9025', user: 'system', action: 'Automated DB Backup', resource: 'DB-Primary', ip: 'localhost', time: '2023-10-25 02:00:00', status: 'Success' },
];

export const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = initialLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" /> Audit Logs
          </h2>
          <p className="text-muted-foreground mt-1">Immutable record of system and user activities.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-4">
          <div>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Showing {filteredLogs.length} matching entries.</CardDescription>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">IP Address</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-xs font-mono">{log.time}</td>
                    <td className="px-6 py-4">{log.user}</td>
                    <td className="px-6 py-4 font-medium">{log.action}</td>
                    <td className="px-6 py-4">{log.resource}</td>
                    <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                    <td className="px-6 py-4">
                      {log.status === 'Success' 
                        ? <Badge variant="outline" className="text-green-500 border-green-500/50">Success</Badge>
                        : <Badge variant="destructive">Failed</Badge>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLogs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No audit logs found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
