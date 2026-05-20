import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { AuditLog } from "../../../types/entities";

type AuditLogTableProps = {
  entries: AuditLog[];
};

const levelPillClass: Record<AuditLog["level"], string> = {
  info: "pill pill--info",
  warning: "pill pill--pending",
  error: "pill pill--declined",
};

const formatTimestamp = (value: string) => new Date(value).toLocaleString();

export const AuditLogTable = ({ entries }: AuditLogTableProps) => {
  return (
    <SectionCard title="AuditLogTable">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
              <th>Actor</th>
              <th>Level</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5}>No audit events found for the selected filter.</td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatTimestamp(entry.timestamp)}</td>
                  <td>{entry.event}</td>
                  <td>{entry.actor}</td>
                  <td>
                    <span className={levelPillClass[entry.level]}>{entry.level}</span>
                  </td>
                  <td>{entry.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};
