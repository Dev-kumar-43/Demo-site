import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Square, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Alert = {
  id: number;
  source_ip: string;
  dest_ip: string;
  attack_type: string;
  severity: string;
  timestamp: string;
};

export const ThreatMonitor = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLive, setIsLive] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/alerts');
      const data = await res.json();
      if (data.success) {
        setAlerts(data.data.sort((a: Alert, b: Alert) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      }
    } catch (e) {
      console.error('Failed to fetch alerts', e);
    }
  };

  useEffect(() => {
    fetchAlerts();
    let interval: ReturnType<typeof setInterval>;
    if (isLive) {
      interval = setInterval(fetchAlerts, 5000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const simulateAttack = async () => {
    try {
      await fetch('http://localhost:5000/api/simulate-attack', { method: 'POST' });
      fetchAlerts();
    } catch (e) {
      console.error('Simulation failed', e);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'Critical': return <Badge variant="destructive" className="animate-pulse">Critical</Badge>;
      case 'High': return <Badge style={{backgroundColor: '#f97316', color: 'white'}}>High</Badge>;
      case 'Medium': return <Badge style={{backgroundColor: '#eab308', color: 'white'}}>Medium</Badge>;
      default: return <Badge style={{backgroundColor: '#3b82f6', color: 'white'}}>Low</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" /> Threat Monitor
          </h2>
          <p className="text-muted-foreground mt-1">Live feed of security events across the network.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsLive(!isLive)} className={isLive ? 'border-green-500/50 text-green-500' : ''}>
            {isLive ? <><Square className="h-4 w-4 mr-2" /> Pause Feed</> : <><Play className="h-4 w-4 mr-2" /> Resume Feed</>}
          </Button>
          <Button onClick={simulateAttack} variant="destructive">
            Simulate Attack
          </Button>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Real-Time Alerts</CardTitle>
            <CardDescription>Streaming data from IDS/IPS and endpoints.</CardDescription>
          </div>
          <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">No alerts detected.</div>
            ) : (
              alerts.map((alert, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-24 shrink-0">
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{alert.attack_type}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 w-full md:w-auto text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider">Source IP</span>
                      <span className="font-mono">{alert.source_ip}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider">Target IP</span>
                      <span className="font-mono">{alert.dest_ip}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0 justify-end">
                    <Button variant="outline" size="sm">Triage</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
