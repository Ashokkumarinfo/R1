'use client';

import React from 'react';
import { 
  Users, 
  Scan, 
  Link as LinkIcon, 
  Smartphone, 
  Monitor, 
  Tablet, 
  ShieldAlert, 
  Activity,
  Globe,
  Clock
} from 'lucide-react';
import { AnalyticsEvent, Vault } from '@/types';
import { formatTimeAgo } from '@/lib/formatters';

interface AnalyticsChartsProps {
  analytics: AnalyticsEvent[];
  vaults: Vault[];
  selectedVaultId?: string;
}

export function AnalyticsCharts({ analytics, vaults, selectedVaultId }: AnalyticsChartsProps) {
  const filteredEvents = selectedVaultId
    ? analytics.filter((a) => a.vault_id === selectedVaultId)
    : analytics;

  // Metric Computations
  const totalEvents = filteredEvents.length;
  const qrScans = filteredEvents.filter((e) => e.event_type === 'scan').length;
  const linkOpens = filteredEvents.filter((e) => e.event_type === 'link_open').length;
  const pinSuccess = filteredEvents.filter((e) => e.event_type === 'pin_success').length;
  const pinFails = filteredEvents.filter((e) => e.event_type === 'pin_failed' || e.event_type === 'lockout').length;

  const mobileCount = filteredEvents.filter((e) => e.device_type === 'mobile').length;
  const desktopCount = filteredEvents.filter((e) => e.device_type === 'desktop').length;
  const tabletCount = filteredEvents.filter((e) => e.device_type === 'tablet').length;

  const totalDevices = mobileCount + desktopCount + tabletCount || 1;
  const mobilePct = Math.round((mobileCount / totalDevices) * 100);
  const desktopPct = Math.round((desktopCount / totalDevices) * 100);
  const tabletPct = Math.round((tabletCount / totalDevices) * 100);

  return (
    <div className="w-full space-y-6">
      
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Scans & Visits */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Inbound Visits</span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {totalEvents.toLocaleString()}
            </div>
            <div className="text-[10px] text-cyan-400 mt-0.5">Live Telemetry Tracked</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Google Lens & QR Scans */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Google Lens / QR Scans</span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {qrScans.toLocaleString()}
            </div>
            <div className="text-[10px] text-blue-400 mt-0.5">
              {totalEvents > 0 ? `${Math.round((qrScans / totalEvents) * 100)}% of traffic` : '0%'}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
            <Scan className="w-6 h-6" />
          </div>
        </div>

        {/* Direct Link Opens */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Direct Link Opens</span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {linkOpens.toLocaleString()}
            </div>
            <div className="text-[10px] text-purple-400 mt-0.5">
              {totalEvents > 0 ? `${Math.round((linkOpens / totalEvents) * 100)}% of traffic` : '0%'}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <LinkIcon className="w-6 h-6" />
          </div>
        </div>

        {/* PIN Authentication Rate */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">PIN Unlocks Passed</span>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {pinSuccess.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              {pinFails} failed attempts blocked
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Device Breakdown & Realtime Access Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Distribution Card */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Device Breakdown</h4>
            <p className="text-xs text-slate-400 mb-6">User agent hardware distribution</p>

            <div className="space-y-4">
              {/* Mobile */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Smartphone className="w-4 h-4 text-cyan-400" /> Mobile Phones
                  </span>
                  <span className="font-mono text-cyan-300">{mobilePct}% ({mobileCount})</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${mobilePct}%` }} className="h-full bg-cyan-400" />
                </div>
              </div>

              {/* Desktop */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Monitor className="w-4 h-4 text-blue-400" /> Desktop / Mac
                  </span>
                  <span className="font-mono text-blue-300">{desktopPct}% ({desktopCount})</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${desktopPct}%` }} className="h-full bg-blue-500" />
                </div>
              </div>

              {/* Tablets */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Tablet className="w-4 h-4 text-purple-400" /> Tablets & iPads
                  </span>
                  <span className="font-mono text-purple-300">{tabletPct}% ({tabletCount})</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${tabletPct}%` }} className="h-full bg-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Encrypted visitor logs</span>
            <span className="text-emerald-400">Zero Cookie Tracking</span>
          </div>
        </div>

        {/* Realtime Event Stream */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white">Live Access Logs</h4>
              <p className="text-xs text-slate-400">Real-time incoming connection stream</p>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              STREAMING
            </span>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="pb-2 font-semibold">Event</th>
                  <th className="pb-2 font-semibold">Device / OS</th>
                  <th className="pb-2 font-semibold">Location</th>
                  <th className="pb-2 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.slice(0, 8).map((event) => {
                  const vault = vaults.find((v) => v.id === event.vault_id);
                  return (
                    <tr key={event.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                            event.event_type === 'scan'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : event.event_type === 'pin_success'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : event.event_type === 'pin_failed' || event.event_type === 'lockout'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {event.event_type.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-2.5 text-slate-300">
                        <span className="capitalize">{event.device_type}</span>
                        {event.os && <span className="text-slate-500 text-[10px]"> &bull; {event.os}</span>}
                      </td>

                      <td className="py-2.5 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 text-cyan-400" />
                          {event.country || 'Global'}
                        </span>
                      </td>

                      <td className="py-2.5 text-right font-mono text-slate-400 text-[11px]">
                        {formatTimeAgo(event.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
