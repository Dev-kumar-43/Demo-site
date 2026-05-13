
import { 
  ShieldAlert, 
  Activity, 
  Server, 
  Lock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { FileUpload } from '@/components/ui/FileUpload';

const threatData = [
  { time: '00:00', threats: 12 },
  { time: '04:00', threats: 19 },
  { time: '08:00', threats: 43 },
  { time: '12:00', threats: 85 },
  { time: '16:00', threats: 54 },
  { time: '20:00', threats: 23 },
  { time: '24:00', threats: 15 },
];

const severityData = [
  { name: 'Critical', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'High', value: 25, color: '#f97316' },
  { name: 'Medium', value: 45, color: '#eab308' },
  { name: 'Low', value: 120, color: '#3b82f6' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Summary</h2>
          <p className="text-muted-foreground mt-1">Real-time overview of security posture and active threats.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm border-primary/50 text-primary bg-primary/10">
            Last updated: Just now
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Threats Blocked (24h)</CardTitle>
            <ShieldAlert className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +14% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Incidents</CardTitle>
            <Activity className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">12</div>
            <p className="text-xs text-destructive flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              3 critical, 9 high
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health Score</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">98.2%</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              All systems nominal
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed Logins (1h)</CardTitle>
            <Lock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-400">45</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -5% from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Chart */}
        <Card className="md:col-span-4 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Threat Trends (24h)</CardTitle>
            <CardDescription>Volume of detected anomalies and blocked threats.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="threats" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Chart */}
        <Card className="md:col-span-3 bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Alerts by Severity</CardTitle>
            <CardDescription>Distribution of active alerts across severity levels.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts Table */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle>Recent Critical Alerts</CardTitle>
          <CardDescription>Latest high-priority security events requiring attention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-md">
                <tr>
                  <th className="px-4 py-3 rounded-l-md">Time</th>
                  <th className="px-4 py-3">Source IP</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3 text-right rounded-r-md">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">10:42:05</td>
                  <td className="px-4 py-3 font-mono text-xs">192.168.1.105</td>
                  <td className="px-4 py-3">Ransomware Behavior Detected</td>
                  <td className="px-4 py-3"><Badge variant="destructive">Critical</Badge></td>
                  <td className="px-4 py-3 text-right"><a href="#" className="text-primary hover:underline">Investigate</a></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">10:15:22</td>
                  <td className="px-4 py-3 font-mono text-xs">45.22.19.88</td>
                  <td className="px-4 py-3">Multiple Failed Root Logins</td>
                  <td className="px-4 py-3"><Badge style={{backgroundColor: '#f97316', color: 'white'}}>High</Badge></td>
                  <td className="px-4 py-3 text-right"><a href="#" className="text-primary hover:underline">Investigate</a></td>
                </tr>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">09:55:10</td>
                  <td className="px-4 py-3 font-mono text-xs">10.0.0.52</td>
                  <td className="px-4 py-3">Unusual Data Exfiltration</td>
                  <td className="px-4 py-3"><Badge variant="destructive">Critical</Badge></td>
                  <td className="px-4 py-3 text-right"><a href="#" className="text-primary hover:underline">Investigate</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <div className="grid gap-6">
        <FileUpload />
      </div>
    </div>
  );
};
